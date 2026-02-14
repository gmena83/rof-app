import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name } = body;

        // Stub: Create Drive folder
        console.log("Creating Drive folder:", name);

        return NextResponse.json({
            success: true,
            folderId: "mock-folder-id",
            webViewLink: "https://drive.google.com/drive/u/0/folders/mock"
        });
    } catch {
        return NextResponse.json({ error: "Drive folder creation failed" }, { status: 500 });
    }
}
