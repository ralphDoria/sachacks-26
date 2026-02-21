import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { restaurantSlug, cart, customerInfo, fees } = await req.json()

    // Resolve the real UUID for the restaurant from Supabase
    const { data: restaurant, error: restaurantError } = await supabaseAdmin
      .from('restaurants')
      .select('id')
      .eq('slug', restaurantSlug)
      .single()

    if (restaurantError || !restaurant) {
      console.error('Restaurant lookup error:', restaurantError)
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 400 })
    }

    // Insert order into Supabase
    const { data: order, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert({
        restaurant_id: restaurant.id,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        items: cart,
        subtotal: fees.subtotal,
        delivery_fee: fees.deliveryFee,
        service_fee: fees.serviceFee,
        total: fees.total,
        status: 'pending',
      })
      .select()
      .single()

    if (insertError || !order) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Food Subtotal' },
            unit_amount: Math.round(fees.subtotal * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Delivery Fee' },
            unit_amount: Math.round(fees.deliveryFee * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Service Fee' },
            unit_amount: Math.round(fees.serviceFee * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmed?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${restaurantSlug}`,
    })

    // Update order with Stripe session ID
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
