import { NextResponse } from "next/server";
import { supabaseNext } from "@/integrations/supabase/next-client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  // If a CRON_SECRET is configured, enforce authorization header verification.
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Perform a lightweight query on the "leads" table to register activity on Supabase.
    const { data, error } = await supabaseNext
      .from("leads")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Keep-alive database query failed:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Database active check completed successfully.",
      timestamp: new Date().toISOString(),
      count: data?.length || 0,
    });
  } catch (err: any) {
    console.error("Keep-alive handler error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
