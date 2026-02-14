import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    // Stub: Fetch single opportunity
    return NextResponse.json({
        id,
        name: "Mock Opportunity",
        description: "Fetched from API stub",
    });
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const body = await request.json();

    // Stub: Update opportunity
    console.log(`Updating opp ${id}:`, body);
    return NextResponse.json({ success: true });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    // Stub: Delete opportunity
    console.log(`Deleting opp ${id}`);
    return NextResponse.json({ success: true });
}
