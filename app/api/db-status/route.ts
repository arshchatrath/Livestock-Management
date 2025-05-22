import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/db-init"

export async function GET() {
  try {
    const isConnected = await checkDatabaseConnection()

    if (isConnected) {
      return NextResponse.json({
        status: "online",
        message: "Database is connected",
      })
    } else {
      return NextResponse.json(
        {
          status: "offline",
          message: "Database is not connected",
        },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("Error checking database status:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check database status",
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}
