import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Stub: Trigger Perplexity/Brave search
        console.log("Triggering weekly search...");

        // Simulate finding opportunities
        const mockFound = [
            { name: "New Grant A", source: "grants.gov" },
            { name: "VC Fund B", source: "crunchbase.com" },
        ];

        return NextResponse.json({
            success: true,
            found: mockFound.length,
            opportunities: mockFound
        });
    } catch {
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
