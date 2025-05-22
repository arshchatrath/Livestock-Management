import mysql from "mysql2/promise"

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "livestock_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function executeQuery<T>({ query, values }: { query: string; values?: any[] }): Promise<T> {
  try {
    const [rows] = await pool.execute(query, values)
    return rows as T
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Failed to execute database query")
  }
}

// Initialize database tables if they don't exist
export async function initializeDatabase() {
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

  try {
    await executeQuery({ query: createOwnersTable })
    await executeQuery({ query: createLivestockTable })
    await executeQuery({ query: createVaccinationRecordsTable })
    await executeQuery({ query: createHealthRecordsTable })
    await executeQuery({ query: createVeterinariansTable })
    await executeQuery({ query: createHealthCampLogsTable })
    console.log("Database tables initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database tables:", error)
  }
}
