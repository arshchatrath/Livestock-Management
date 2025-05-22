import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { setupDatabase } from "@/lib/db-init"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Community Livestock Health Management System",
  description: "Track livestock health, vaccinations, and veterinary care",
  generator: 'v0.dev'
}

// Initialize database when the server starts
// This should be moved to a separate file that's imported in your API route or middleware
// Not in layout.tsx which may be rendered multiple times
setupDatabase()
  .then((success) => {
    if (success) {
      console.log("Database setup completed successfully")
    } else {
      console.error("Database setup failed")
    }
  })
  .catch((error) => {
    console.error("Error during database setup:", error)
  })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}