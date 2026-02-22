import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { orderId, riderName } = await req.json()

    if (!orderId || !riderName) {
      return NextResponse.json({ error: "Missing orderId or riderName" }, { status: 400 })
    }

    // Fetch order details for the notification payload
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, customer_name, customer_address, status")
      .eq("id", orderId)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Log the notification event — extend this with SMS/email/push as needed
    console.log(
      `[notify-order] Rider "${riderName}" claimed order ${orderId} ` +
        `for customer "${order.customer_name}" → ${order.customer_address}`
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[notify-order] error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
