import { NextResponse } from "next/server";
import { getSupabaseClient, isCrestKey } from "./supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { result?: unknown } | null;

  if (!isCrestKey(body?.result)) {
    return NextResponse.json({ error: "Invalid crest result" }, { status: 400 });
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const id = crypto.randomUUID();
  const { error } = await supabase.from("crest_shares").insert({
    id,
    result: body.result,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id, result: body.result });
}
