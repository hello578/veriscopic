
// app/api/evidence/request/route.ts
import { NextResponse } from "next/server"
import { supabaseServerWrite } from "@/lib/supabase/server-write"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      email,
      organisation,
      role,
      intendedUse,
      message,
    } = body

    if (!email || !organisation || !role || !intendedUse) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // ✅ IMPORTANT: await the client
    const supabase = await supabaseServerWrite()

    const { error } = await supabase
      .from("evidence_requests")
      .insert({
        email,
        organisation,
        role,
        intended_use: intendedUse,
        message,
        source: "website",
      })

    if (error) {
      console.error("Evidence request insert failed", error)
      return NextResponse.json(
        { error: "Failed to submit request" },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Evidence request error", err)
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}
