import { NextResponse } from "next/server";
import { getSupabaseClient } from "../supabase";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("crest_shares")
    .select("id,result,created_at")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Share not found" }, { status: 404 });
  }

  await supabase
    .from("crest_shares")
    .update({ last_viewed_at: new Date().toISOString() })
    .eq("id", params.id);

  return NextResponse.json(data);
}
