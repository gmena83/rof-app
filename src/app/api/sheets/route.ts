import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Stub: Update Google Sheet
        console.log("Updating Google Sheet row:", body);

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Sheet update failed" }, { status: 500 });
    }
}
