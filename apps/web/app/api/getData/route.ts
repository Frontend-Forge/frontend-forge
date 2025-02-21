import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb"; // Ensure this path is correct
import Question from "@/models/Question"; // Import your Mongoose model

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB using Mongoose

    const questions = await Question.find({}); // Fetch all questions

    return NextResponse.json({ success: true, data: questions }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
