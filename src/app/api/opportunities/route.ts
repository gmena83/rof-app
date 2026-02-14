import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Stub: In real app, query Supabase
    // const supabase = getServiceSupabase();
    // let query = supabase.from("opportunities").select("*");
    // if (status) query = query.eq("status", status);
    // const { data, error } = await query;

    // Returning mock data for now
    return NextResponse.json({
        data: [
            { id: "1", name: "DOE Grant", status: "new" },
            { id: "2", name: "CleanTech Open", status: "applied" },
        ],
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Stub: Insert into Supabase
        console.log("Creating opportunity:", body);

        return NextResponse.json({ success: true, id: "mock-new-id" });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
