import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Test verify route is working!",
        receivedData: body 
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error in /api/test-verify:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Test error",
      },
      { status: 500 }
    );
  }
} 