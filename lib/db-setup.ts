import { setupDatabase } from './db-init'

// This will run once during server startup
let isDbInitialized = false

export async function initDatabase() {
  if (isDbInitialized) {
    return true
  }
  
  try {
    const success = await setupDatabase()
    if (success) {
      console.log("Database setup completed successfully")
      isDbInitialized = true
      return true
    } else {
      console.error("Database setup failed")
      return false
    }
  } catch (error) {
    console.error("Error during database setup:", error)
    return false
  }
}

// Initialize DB right away
if (process.env.NODE_ENV !== 'test') {
  initDatabase()
}