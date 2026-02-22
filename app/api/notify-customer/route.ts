import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { orderId, event } = await req.json()

    if (!orderId || !event) {
      return NextResponse.json({ error: "Missing orderId or event" }, { status: 400 })
    }

    // Fetch order with restaurant info
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*, restaurants(name)")
      .eq("id", orderId)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (!order.customer_email) {
      return NextResponse.json({ error: "No customer email on order" }, { status: 400 })
    }

    const restaurantName = order.restaurants?.name ?? "the restaurant"
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ""
    const trackingUrl = `${baseUrl}/order-tracking/${orderId}`
    const shortId = orderId.slice(0, 8).toUpperCase()

    if (event === "accepted") {
      await resend.emails.send({
        from: "DartDavis <onboarding@resend.dev>",
        to: order.customer_email,
        subject: `Your order from ${restaurantName} is confirmed! 🎉`,
        html: `
          <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #111;">Order Confirmed</h2>
            <p>Hi ${order.customer_name},</p>
            <p>Great news — <strong>${restaurantName}</strong> has confirmed your order <strong>#${shortId}</strong> and is now preparing it.</p>
            <p style="margin: 24px 0;">
              <a href="${trackingUrl}" style="background: #111; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Track Your Order
              </a>
            </p>
            <p style="color: #666; font-size: 14px;">Order total: $${order.total.toFixed(2)}</p>
            <p style="color: #666; font-size: 14px;">Delivering to: ${order.customer_address}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px;">DDBA Local Delivery — keeping downtown Davis thriving.</p>
          </div>
        `,
      })
    } else if (event === "delivered") {
      await resend.emails.send({
        from: "DartDavis <onboarding@resend.dev>",
        to: order.customer_email,
        subject: `Your order from ${restaurantName} has been delivered!`,
        html: `
          <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #111;">Order Delivered</h2>
            <p>Hi ${order.customer_name},</p>
            <p>Your order <strong>#${shortId}</strong> from <strong>${restaurantName}</strong> has been delivered. Enjoy your meal!</p>
            <p style="color: #666; font-size: 14px;">Order total: $${order.total.toFixed(2)}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px;">DDBA Local Delivery — keeping downtown Davis thriving.</p>
          </div>
        `,
      })
    } else {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[notify-customer] error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
