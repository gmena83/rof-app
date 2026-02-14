import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { to, subject, text } = body;

        // Stub: Send email via SendGrid
        console.log("Sending email:", { to, subject });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }
}
