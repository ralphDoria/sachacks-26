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
    const { orderId, riderName } = await req.json()

    if (!orderId || !riderName) {
      return NextResponse.json({ error: "Missing orderId or riderName" }, { status: 400 })
    }

    // Fetch full order with restaurant details
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*, restaurants(name, address, phone)")
      .eq("id", orderId)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const restaurant = order.restaurants

    await resend.emails.send({
      from: "Davis Direct <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `Davis Direct: Rider picked up order #${orderId}`,
      text:
        `Hi! ${riderName} has picked up the order for ${order.customer_name} from ${restaurant.name}.\n` +
        `They are delivering to: ${order.customer_address}.\n` +
        `Order total: $${order.total}`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[notify-order] error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
