import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const postAuthRedirect: Record<string, string> = {
  customer: "/customer-dashboard",
  driver: "/rider",
  restaurant: "/dashboard",
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const from = searchParams.get("from") ?? ""

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const destination = postAuthRedirect[from] ?? "/customer-dashboard"
  return NextResponse.redirect(`${origin}${destination}`)
}
