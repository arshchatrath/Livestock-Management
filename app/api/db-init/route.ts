import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/db-init"

// This will be executed when the route is accessed
export async function GET() {
  try {
    const success = await setupDatabase()

    if (success) {
      return NextResponse.json({
        status: "success",
        message: "Database initialized successfully",
      })
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "Database initialization failed",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in database initialization route:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Database initialization failed with an exception",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
