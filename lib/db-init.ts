import mysql from "mysql2/promise"
import { executeQuery } from "./db"

// Database connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "livestock_management",
}

// Check if the database is connected
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Create a temporary connection to check connectivity
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    })

    // Check if the database exists, create it if it doesn't
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`)

    // Use the database
    await connection.query(`USE ${dbConfig.database}`)

    // Close the temporary connection
    await connection.end()

    console.log("✅ Database connection successful")
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return false
  }
}

// Initialize database tables
export async function initializeDatabaseTables(): Promise<boolean> {
  try {
    const createOwnersTable = `
      CREATE TABLE IF NOT EXISTS owners (
        owner_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        village VARCHAR(100),
        phone_number VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const createLivestockTable = `
      CREATE TABLE IF NOT EXISTS livestock (
        livestock_id INT AUTO_INCREMENT PRIMARY KEY,
        owner_id INT,
        type VARCHAR(50),
        breed VARCHAR(50),
        gender VARCHAR(10),
        birth_date DATE,
        tag_number VARCHAR(30),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
      )
    `

    const createVaccinationRecordsTable = `
      CREATE TABLE IF NOT EXISTS vaccinationrecords (
        record_id INT AUTO_INCREMENT PRIMARY KEY,
        livestock_id INT,
        vaccine_name VARCHAR(100),
        date_given DATE,
        next_due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (livestock_id) REFERENCES livestock(livestock_id)
      )
    `

    const createHealthRecordsTable = `
      CREATE TABLE IF NOT EXISTS healthrecords (
        record_id INT AUTO_INCREMENT PRIMARY KEY,
        livestock_id INT,
        diagnosis TEXT,
        treatment_given TEXT,
        vet_name VARCHAR(100),
        visit_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (livestock_id) REFERENCES livestock(livestock_id)
      )
    `

    const createVeterinariansTable = `
      CREATE TABLE IF NOT EXISTS veterinarians (
        vet_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        phone_number VARCHAR(15),
        location VARCHAR(100),
        availability BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const createHealthCampLogsTable = `
      CREATE TABLE IF NOT EXISTS healthcamplogs (
        camp_id INT AUTO_INCREMENT PRIMARY KEY,
        date DATE,
        location VARCHAR(100),
        organized_by VARCHAR(100),
        animals_checked INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Execute all table creation queries
    await executeQuery({ query: createOwnersTable })
    await executeQuery({ query: createLivestockTable })
    await executeQuery({ query: createVaccinationRecordsTable })
    await executeQuery({ query: createHealthRecordsTable })
    await executeQuery({ query: createVeterinariansTable })
    await executeQuery({ query: createHealthCampLogsTable })

    console.log("✅ Database tables initialized successfully")
    return true
  } catch (error) {
    console.error("❌ Failed to initialize database tables:", error)
    return false
  }
}

// Global initialization state
let isInitialized = false

// Main initialization function
export async function setupDatabase(): Promise<boolean> {
  // Only run once
  if (isInitialized) {
    return true
  }

  try {
    // Step 1: Check database connection
    const isConnected = await checkDatabaseConnection()
    if (!isConnected) {
      console.error("❌ Database connection failed. Please check your environment variables.")
      return false
    }

    // Step 2: Initialize database tables
    const tablesInitialized = await initializeDatabaseTables()
    if (!tablesInitialized) {
      console.error("❌ Failed to initialize database tables.")
      return false
    }

    // Mark as initialized
    isInitialized = true
    console.log("✅ Database setup completed successfully")
    return true
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    return false
  }
}
