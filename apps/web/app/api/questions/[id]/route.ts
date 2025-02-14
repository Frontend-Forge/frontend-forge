// app/api/questions/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import QuestionModel from "@/models/Question";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect("mongodb://localhost:27017/frontend-forge");
};

export async function GET(request: NextRequest) {
  // Extract ID from URL pattern
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const id = pathParts[pathParts.length - 1]; // Get the last segment of the path

  if (!id) {
    return NextResponse.json(
      { error: "Question ID is required" },
      { status: 400 }
    );
  }

  // Validate MongoDB ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid question ID format" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const question = await QuestionModel.findById(id).lean();

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
