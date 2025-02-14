import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // 🔥 Embedded MongoDB URL
const dbName = "frontend-forge"; // 🔥 Your database name

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("questions"); // Change this to your actual collection

    const data = await collection.find({}).toArray();
    await client.close(); // Close connection after fetching data

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
