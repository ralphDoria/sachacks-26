# Final Priorities – Implementation Plan

## Overview of Current State

- **Stack**: Next.js (App Router), Supabase (auth + DB), Stripe, Resend, Google Places API
- **Auth**: Supabase email/password + Google OAuth, with separate `/login` and `/sign-up` pages
- **Dashboards**: Restaurant owner dashboard exists at `/dashboard`; driver board exists at `/driver`; customer dashboard does not exist
- **Notifications**: Resend only emails admin on rider claim; no customer-facing emails
- **Maps**: Google Places API used for ratings only; no routing/map UI
- **Menu Management**: No UI — all menu data entered directly in Supabase

---

## Priority 1: Accounts / Auth

### Goal
Consolidate auth into a unified landing page with role-based tab routing, verification gates for drivers and restaurant owners, and dashboard routing based on the login context.

---

### Step 1.1 — Unified Auth Page at `/auth`

**File**: `app/auth/page.tsx` (currently just a callback handler; move callback to `app/auth/callback/`)

Create a single page with three tabs using Radix `Tabs` (already installed):

- **Customer** tab — standard email/password login or Google OAuth; on success → `/customer-dashboard`
- **Driver** tab — email/password login; on success → `/driver` (with verification gate)
- **Restaurant Owner** tab — email/password login; on success → `/dashboard` (with verification gate)

Each tab should:
1. Render a login form (email + password fields)
2. Include a "Sign up" toggle that switches the form to registration mode in-place (no separate page needed)
3. Pass a `role` context (`customer | driver | restaurant`) in the Supabase user metadata on signup

**Redirect logic** (in `app/auth/callback/route.ts`):
- Read `user.user_metadata.role`
- `customer` → `/customer-dashboard`
- `driver` → `/driver`
- `restaurant` → `/dashboard`

**Remove** `/app/login` and `/app/sign-up` directories after migrating; update all `href="/login"` and `href="/sign-up"` links site-wide.

---

### Step 1.2 — Home Path with Role Tabs on Landing Page

**File**: `app/page.tsx` and `components/site-header.tsx`

Add a prominent "Get Started" or "Login / Sign Up" section near the hero CTA that presents three buttons/cards:

- **I'm a Customer** → navigates to `/auth?tab=customer`
- **I'm a Driver** → navigates to `/auth?tab=driver`
- **I'm a Restaurant Owner** → navigates to `/auth?tab=restaurant`

The `/auth` page reads the `tab` query param on load and activates the correct tab via `defaultValue`.

Update `site-header.tsx` to show a single "Sign In" button (→ `/auth`) instead of separate login/signup links.

---

### Step 1.3 — Verification Gate for Driver & Restaurant Owner

**Database**: Add a `user_profiles` table in Supabase:

```sql
create table user_profiles (
  id uuid primary key references auth.users(id),
  role text not null, -- 'customer' | 'driver' | 'restaurant'
  verified boolean default false,
  verification_image_url text,
  restaurant_id uuid references restaurants(id),
  points integer default 0,
  created_at timestamptz default now()
);
```

**Middleware** (`middleware.ts`):
- On request to `/driver` or `/dashboard`, fetch the user's profile from Supabase
- If `verified = false`, redirect to `/verify?role=driver` or `/verify?role=restaurant`
- Customers bypass this check

**Verification page** (`app/verify/page.tsx`):
- For drivers: photo upload flow (see Priority 4, Step 4.1)
- For restaurant owners: restaurant selection or name entry, then mark `verified = true` immediately for demo

---

## Priority 2: Customer Dashboard

### Goal
Give customers a dedicated dashboard with a points display, a shared restaurant browser component, and order history.

---

### Step 2.1 — Shared `<RestaurantGrid>` Component

**New file**: `components/restaurants/restaurant-grid.tsx`

Extract the restaurant listing logic currently in `app/restaurants/page.tsx` (Supabase fetch + grid render) into a self-contained component that accepts optional props:

```tsx
interface RestaurantGridProps {
  limit?: number;       // e.g. 6 for landing page featured section
  showFilters?: boolean; // full filter bar on dedicated page
}
```

**Update**:
- `app/restaurants/page.tsx` — render `<RestaurantGrid showFilters />` (full view)
- `components/landing/featured-restaurants-section.tsx` — render `<RestaurantGrid limit={6} />` (preview)
- `app/customer-dashboard/page.tsx` — render `<RestaurantGrid showFilters />` in a "Order Food" tab

---

### Step 2.2 — Customer Dashboard Page

**New file**: `app/customer-dashboard/page.tsx`

Use Radix `Tabs` with three tabs:

1. **Order Food** — renders `<RestaurantGrid />` component
2. **My Orders** — list of past orders fetched from `orders` table where `customer_email` matches the logged-in user's email; each row shows order date, restaurant, total, status, and a "Track Order" link to `/order-tracking/[orderId]`
3. **Rewards** — points balance display (see Step 2.3)

Add a greeting header: "Welcome back, [name]" using `supabase.auth.getUser()`.

---

### Step 2.3 — Points System

**Database**: `user_profiles.points` column (already in schema above)

**Logic** (in `app/api/checkout/route.ts`):
After the Stripe checkout session is created and the order is inserted, award points:
- 1 point per $1 spent (floor of `total`)
- Upsert into `user_profiles` incrementing `points`

**Display** in `app/customer-dashboard/page.tsx` Rewards tab:
- Fetch `user_profiles.points` for the logged-in user
- Show a card: "You have **X points**" with a progress bar toward next reward tier
- Simple tier labels: Bronze (0–99), Silver (100–499), Gold (500+)

---

### Step 2.4 — Resend Email Notifications to Customer

**File**: `app/api/notify-order/route.ts`

Currently sends one email to admin when rider claims. Extend to send to the customer's email.

**Trigger 1 — Order Accepted** (when restaurant changes status `pending → confirmed`):
- Add a new API route: `app/api/notify-customer/route.ts`
- Called from the restaurant dashboard when clicking "Confirm Order"
- Email body: "Your order from [Restaurant] has been confirmed and is being prepared."
- Include order summary and a link to `/order-tracking/[orderId]`

**Trigger 2 — Order Delivered** (when driver marks status `claimed → delivered`):
- Called from the driver dashboard confirm-delivery flow
- Email body: "Your order from [Restaurant] has been delivered. Enjoy!"
- Include order total and a "Leave a Review" CTA (placeholder link for now)

**Implementation**:
```ts
// app/api/notify-customer/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { customerEmail, customerName, restaurant, orderId, event } = await req.json();
  // event: 'accepted' | 'delivered'
  const subject = event === 'accepted'
    ? `Your order from ${restaurant} is confirmed!`
    : `Your order from ${restaurant} has been delivered!`;
  await resend.emails.send({
    from: 'DDBA <notifications@yourverifieddomain.com>',
    to: customerEmail,
    subject,
    html: `<p>Hi ${customerName}, ...</p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/order-tracking/${orderId}">Track your order</a>`,
  });
}
```

Wire this call in:
- `app/dashboard/page.tsx` when "Confirm" button is clicked (accepted event)
- `app/driver/page.tsx` when "Confirm Delivery" is clicked (delivered event)

---

### Step 2.5 — Order Tracking Page

**New file**: `app/order-tracking/[orderId]/page.tsx`

This is a public page (no auth required — accessible via link in email).

**Data fetching**: Fetch order by `orderId` from Supabase. Subscribe to real-time changes on that order row.

**UI layout**:
- Progress stepper showing: `Order Placed → Confirmed → Ready → Picked Up → Delivered`
- Highlight current step based on `orders.status`
- Order summary card (items, total, restaurant)
- Estimated delivery time (static "20–35 min" for demo, or computed from rider ETA in Phase 4)
- Restaurant name and address (pickup)
- Delivery address (dropoff)

**Link from order-confirmed page** (`app/order-confirmed/page.tsx`):
Add a button: "Track Your Order →" that links to `/order-tracking/[orderId]`

---

## Priority 3: Restaurant Owner Dashboard — Menu Initialization

### Goal
Allow restaurant owners to seed their menu from three sources: (1) website HTML parsed by OpenAI, (2) image of menu via OpenAI vision, (3) manual entry form.

---

### Step 3.1 — Menu Initialization UI

**File**: `app/dashboard/page.tsx` (new "Menu" tab inside existing Tabs component)

Add a fourth tab "Menu" alongside Orders, Analytics, Settings. The Menu tab has:
- A list of existing menu items fetched from `menu_items` where `restaurant_id` matches
- An "Initialize Menu" section with three option cards:
  - "Import from Website"
  - "Upload Menu Image"
  - "Add Items Manually"

---

### Step 3.2 — Website URL → OpenAI Parse

**New API route**: `app/api/parse-menu-url/route.ts`

Flow:
1. Restaurant owner pastes their menu page URL into an input field
2. Frontend POSTs the URL to the API route
3. API fetches the HTML with `fetch(url)` and strips it to text (strip tags, keep structure)
4. Send text to OpenAI Chat Completions (`gpt-4o-mini` for cost):
   ```
   System: You are a menu parser. Extract all menu items from the following HTML text.
   Return a JSON array of objects: { name, description, price, category }.
   User: [stripped HTML text]
   ```
5. Parse the JSON response
6. Batch-insert into `menu_items` table with the restaurant's `restaurant_id`
7. Return the count of items inserted

**Frontend**: Show a loading state while processing, then display the parsed items for review before confirming insert.

**Dependency**: Add `openai` npm package if not already installed:
```bash
npm install openai
```

**Env var needed**: `OPENAI_API_KEY`

---

### Step 3.3 — Menu Image → OpenAI Vision

**New API route**: `app/api/parse-menu-image/route.ts`

Flow:
1. Restaurant owner uploads an image file (JPEG/PNG) of their physical menu
2. Frontend converts to base64 and POSTs to the API route
3. API sends to OpenAI with vision:
   ```ts
   const response = await openai.chat.completions.create({
     model: 'gpt-4o',
     messages: [{
       role: 'user',
       content: [
         { type: 'text', text: 'Extract all menu items. Return JSON: [{name, description, price, category}]' },
         { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64}` } }
       ]
     }]
   });
   ```
4. Parse the JSON, batch-insert into `menu_items`
5. Return inserted items for review

**Frontend**: Use a file input (`accept="image/*"`), upload preview, loading state, then review table before confirming.

---

### Step 3.4 — Manual Entry Form

Render a form directly in the Menu tab:
- Fields: Name (required), Category, Description, Price (required), Dietary tags (checkboxes)
- On submit: POST to a simple `app/api/menu-items/route.ts` that inserts one row
- After insert: refresh the menu item list in real-time

For existing items: add Edit and Delete buttons per row that open an inline edit form or call DELETE on the API.

---

## Priority 4: Driver Dashboard

### Goal
Add photo verification, a single-delivery-at-a-time gig board, a Google Maps routing UI, and photo-confirmation of dropoff.

---

### Step 4.1 — Driver Verification (Photo Upload)

**New page**: `app/verify/page.tsx`

Only shown to drivers whose `user_profiles.verified = false` (enforced by middleware from Step 1.3).

UI:
- Heading: "Verify Your Identity"
- Camera/file input to capture a selfie or upload a photo ID
- "Submit for Verification" button

Flow:
1. Upload photo to Supabase Storage bucket `driver-verification`
2. Store the public URL in `user_profiles.verification_image_url`
3. For the demo: immediately set `user_profiles.verified = true` after upload (no manual review)
4. Redirect to `/driver`

**Supabase Storage**: Create a `driver-verification` bucket (set to private; use service role for upload from API route).

**API route**: `app/api/verify-driver/route.ts`
- Accepts `FormData` with `file` and `userId`
- Uploads to Supabase Storage
- Updates `user_profiles` set `verified = true, verification_image_url = [url]`

---

### Step 4.2 — Gig Board: One Delivery at a Time

**File**: `app/driver/page.tsx`

**Logic change**:
- Check if the current driver has any order where `rider_id = [current rider] AND status IN ('claimed')`
- If yes: hide the "Available Deliveries" section and show only the active delivery with the map
- If no active delivery: show the gig board (list of `status = 'ready'` orders)

**Database query**:
```ts
const { data: activeDelivery } = await supabase
  .from('orders')
  .select('*')
  .eq('rider_id', riderId)
  .eq('status', 'claimed')
  .single();
```

If `activeDelivery` exists, show the map UI (Step 4.3). Otherwise show available gigs.

---

### Step 4.3 — Google Maps Driver UI

**Dependency**: Install `@react-google-maps/api`:
```bash
npm install @react-google-maps/api
```

**Env var needed**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (enable Directions API + Maps JavaScript API in Google Cloud Console — the current `GOOGLE_PLACES_API_KEY` may need additional APIs enabled)

**New component**: `components/driver/delivery-map.tsx`

Props:
```tsx
interface DeliveryMapProps {
  driverLocation: { lat: number; lng: number };
  pickupAddress: string;  // restaurant address
  dropoffAddress: string; // customer address
}
```

Implementation:
1. Use browser `navigator.geolocation.watchPosition` to get live driver location
2. Geocode `pickupAddress` and `dropoffAddress` using Google Geocoding API (or pass lat/lng from DB if available)
3. Use `@react-google-maps/api` `DirectionsService` to request a route:
   - Origin: driver's current location
   - Waypoint: restaurant (pickup)
   - Destination: customer address (dropoff)
   - TravelMode: DRIVING
4. Render `DirectionsRenderer` on a `GoogleMap` component
5. Display ETA from `DirectionsResult.routes[0].legs[0].duration.text`

**UI layout** in `app/driver/page.tsx` when active delivery exists:
- Full-width map (400px height on mobile)
- Overlay card showing:
  - Current step: "HEAD TO PICKUP" or "HEAD TO DROPOFF" (based on status)
  - Restaurant name + address
  - Customer name + address
  - ETA badge
  - "Confirm Pickup" / "Confirm Delivery" button

**Status progression**:
- Driver clicks "Confirm Pickup" → update order status to `picked_up` (add this status if not present), send accepted email to customer
- Driver clicks "Confirm Delivery" → opens photo capture flow (Step 4.4)

---

### Step 4.4 — Photo to Confirm Dropoff

**Flow**:
1. When driver clicks "Confirm Delivery", open a `Dialog` (Radix, already installed)
2. Inside the dialog: a camera input (`<input type="file" accept="image/*" capture="environment">`) for mobile camera, or file upload for desktop
3. Preview the captured photo
4. "Submit & Complete Delivery" button

**On submit**:
1. Upload photo to Supabase Storage bucket `delivery-confirmations`
2. Store URL in a new `delivery_photo_url` column on the `orders` table:
   ```sql
   alter table orders add column delivery_photo_url text;
   ```
3. Update order status to `delivered`
4. Call `app/api/notify-customer/route.ts` with event `delivered`
5. Close dialog, show success toast, clear the active delivery state

---

## Implementation Order (Suggested Sprint)

| # | Task | Effort | Dependencies |
|---|------|--------|-------------|
| 1 | Supabase: Create `user_profiles` table + `delivery_photo_url` column | Low | — |
| 2 | Shared `<RestaurantGrid>` component | Low | — |
| 3 | Unified `/auth` page with role tabs | Medium | — |
| 4 | Middleware verification gate | Low | Step 1, 3 |
| 5 | Customer dashboard page (tabs + orders) | Medium | Step 2 |
| 6 | Points system (award on checkout, display in dashboard) | Low | Step 5 |
| 7 | Order tracking page `/order-tracking/[orderId]` | Medium | — |
| 8 | Resend customer email notifications (accepted + delivered) | Low | Step 7 |
| 9 | Driver verification page + Supabase Storage upload | Medium | Step 4 |
| 10 | Gig board: one-at-a-time enforcement | Low | — |
| 11 | Google Maps delivery map component + ETA | High | Step 10 |
| 12 | Photo dropoff confirmation dialog | Medium | Step 11 |
| 13 | Menu tab in restaurant dashboard | Medium | — |
| 14 | OpenAI menu parsing: URL → HTML → JSON | Medium | Step 13 |
| 15 | OpenAI menu parsing: Image → Vision → JSON | Medium | Step 13 |
| 16 | Manual menu entry form | Low | Step 13 |

---

## Environment Variables Needed (New)

```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...   # same key or new; must have Maps JS + Directions + Geocoding enabled
```

## New Supabase Storage Buckets

- `driver-verification` (private)
- `delivery-confirmations` (private)

## New Database Changes

```sql
-- User profiles (role, verification, points)
create table user_profiles (
  id uuid primary key references auth.users(id),
  role text not null,
  verified boolean default false,
  verification_image_url text,
  restaurant_id uuid references restaurants(id),
  points integer default 0,
  created_at timestamptz default now()
);

-- Delivery photo on orders
alter table orders add column delivery_photo_url text;

-- Optional: new status value for picked_up
-- If status is an enum, alter it:
-- alter type order_status add value 'picked_up';
```
