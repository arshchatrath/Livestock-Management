import { cookies } from "next/headers"
import { executeQuery } from "./db"

export type UserRole = "farmer" | "admin"

export type User = {
  id: number
  name: string
  role: UserRole
}

// Simple authentication functions
export async function login(phoneNumber: string, role: UserRole): Promise<User | null> {
  try {
    if (role === "farmer") {
      const query = "SELECT owner_id, name FROM owners WHERE phone_number = ?"
      const results = await executeQuery<any[]>({ query, values: [phoneNumber] })

      if (results && results.length > 0) {
        const user: User = {
          id: results[0].owner_id,
          name: results[0].name,
          role: "farmer",
        }

        // Set a cookie to maintain the session
        const cookieStore =await cookies()
        cookieStore.set("user", JSON.stringify(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })

        return user
      }
    } else if (role === "admin") {
      // For demo purposes, we'll use a hardcoded admin
      // In a real app, you would check against an admins table
      if (phoneNumber === "9999999999") {
        const user: User = {
          id: 1,
          name: "Admin User",
          role: "admin",
        }

        // Set a cookie to maintain the session
        const cookieStore = await cookies()
        cookieStore.set("user", JSON.stringify(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })

        return user
      }
    }

    return null
  } catch (error) {
    console.error("Login error:", error)
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value) as User
  } catch {
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser()
  return user !== null
}

export async function hasRole(role: UserRole): Promise<boolean> {
  const user = await getUser()
  return user !== null && user.role === role
}
