"use server"
import { executeQuery } from "./db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { login, logout, type User } from "./auth"

async function getUser(): Promise<User | null> {
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

// Owner/Farmer actions
export async function registerFarmer(formData: FormData) {
let redirectPath: string | null = null

  const name = formData.get("name") as string
  const village = formData.get("village") as string
  const phoneNumber = formData.get("phoneNumber") as string

  if (!name || !village || !phoneNumber) {
    return { error: "All fields are required" }
  }

  try {
    // Check if phone number already exists
    const checkQuery = "SELECT owner_id FROM owners WHERE phone_number = ?"
    const existingOwners = await executeQuery<any[]>({
      query: checkQuery,
      values: [phoneNumber],
    })

    if (existingOwners && existingOwners.length > 0) {
      return { error: "Phone number already registered" }
    }

    // Insert new farmer
    const insertQuery = "INSERT INTO owners (name, village, phone_number) VALUES (?, ?, ?)"
    await executeQuery({
      query: insertQuery,
      values: [name, village, phoneNumber],
    })
    redirectPath="/farmer/dashboard"
    // Log in the newly registered farmer
    await login(phoneNumber, "farmer")

    
  } catch (error) {
    console.error("Error registering farmer:", error)
    redirectPath="/"
    return { error: "Failed to register. Please try again." }
  }
  finally{
    revalidatePath(`${redirectPath || "/farmer/register"}`)
    redirect(`${redirectPath || "/farmer/register"}`)
  }
}

export async function loginFarmer(formData: FormData) {
let redirectPath: string | null = null

  const phoneNumber = formData.get("phoneNumber") as string

  if (!phoneNumber) {
    return { error: "Phone number is required" }
  }

  try {
    const user = await login(phoneNumber, "farmer")

    if (!user) {
      return { error: "Phone number not found" }
    }
    redirectPath="/farmer/dashboard"

    // revalidatePath("/farmer/dashboard")
    
  } catch (error) {
    redirectPath="/farmer/login"
    console.error("Error logging in farmer:", error)
    return { error: "Failed to log in. Please try again." }
  }
  finally{
    // revalidatePath(`${redirectPath}`)
    redirect(`${redirectPath || "/farmer/login"}`)
  }
}

export async function loginAdmin(formData: FormData) {
  let redirectPath: string | null = null

  const phoneNumber = formData.get("phoneNumber") as string
  const password = formData.get("password") as string

  if (!phoneNumber || !password) {
    return { error: "All fields are required" }
  }

  // For demo purposes, we'll use a hardcoded admin
  // In a real app, we would check against an admins table and verify password
  if (phoneNumber === "9999999999" && password === "admin123") {
    try {
      const user = await login(phoneNumber, "admin")
      redirectPath="/admin/dashboard"
      if (!user) {
        return { error: "Invalid credentials" }
      }

    } catch (error) {
      console.error("Error logging in admin:", error)
      redirectPath="/"
      return { error: "Failed to log in. Please try again." }
    }
    finally{
      
      revalidatePath(`${redirectPath || "/admin/login"}`)
      redirect(`${redirectPath || "/admin/login"}`)
    }
  } else {
    return { error: "Invalid credentials" }
  }
}

export async function logoutUser() {
  await logout()
  redirect("/")
}

// Livestock actions
export async function registerLivestock(formData: FormData) {
  const user = await getUser()
  if (!user) {
    return { error: "You must be logged in to register livestock" }
  }

  const type = formData.get("type") as string
  const breed = formData.get("breed") as string
  const gender = formData.get("gender") as string
  const birthDate = formData.get("birthDate") as string

  if (!type || !breed || !gender || !birthDate) {
    return { error: "All fields are required" }
  }

  try {
    // Generate a unique tag number
    const tagPrefix = type.substring(0, 2).toUpperCase()
    const timestamp = Date.now().toString().slice(-6)
    const tagNumber = `${tagPrefix}${timestamp}${user.id}`

    const query = `
      INSERT INTO livestock (owner_id, type, breed, gender, birth_date, tag_number) 
      VALUES (?, ?, ?, ?, ?, ?)
    `

    await executeQuery({
      query,
      values: [user.id, type, breed, gender, birthDate, tagNumber],
    })

    
  } catch (error) {
    console.error("Error registering livestock:", error)
    return { error: "Failed to register livestock. Please try again." }
  }
  finally{
    revalidatePath("/farmer/livestock")
    redirect("/farmer/livestock")
  }
}

export async function getFarmerLivestock() {
  const user = await getUser()
  if (!user) {
    return []
  }

  try {
    const query = `
      SELECT l.*, 
             (SELECT next_due_date FROM vaccinationrecords 
              WHERE livestock_id = l.livestock_id 
              ORDER BY next_due_date ASC LIMIT 1) as next_vaccination_date
      FROM livestock l
      WHERE l.owner_id = ?
      ORDER BY l.created_at DESC
    `

    const livestock = await executeQuery<any[]>({
      query,
      values: [user.id],
    })

    return livestock || []
  } catch (error) {
    console.error("Error fetching livestock:", error)
    return []
  }
}

export async function getAllLivestock() {
  try {
    const query = `
      SELECT l.*, o.name as owner_name, o.village, o.phone_number,
             (SELECT next_due_date FROM vaccinationrecords 
              WHERE livestock_id = l.livestock_id 
              ORDER BY next_due_date ASC LIMIT 1) as next_vaccination_date
      FROM livestock l
      JOIN owners o ON l.owner_id = o.owner_id
      ORDER BY l.created_at DESC
    `

    const livestock = await executeQuery<any[]>({ query })
    return livestock || []
  } catch (error) {
    console.error("Error fetching all livestock:", error)
    return []
  }
}

// Vaccination records actions
export async function addVaccinationRecord(formData: FormData) {
  const livestockId = formData.get("livestockId") as string
  const vaccineName = formData.get("vaccineName") as string
  const dateGiven = formData.get("dateGiven") as string
  const nextDueDate = formData.get("nextDueDate") as string

  if (!livestockId || !vaccineName || !dateGiven || !nextDueDate) {
    return { error: "All fields are required" }
  }

  try {
    const query = `
      INSERT INTO vaccinationrecords (livestock_id, vaccine_name, date_given, next_due_date)
      VALUES (?, ?, ?, ?)
    `

    await executeQuery({
      query,
      values: [livestockId, vaccineName, dateGiven, nextDueDate],
    })

    
  } catch (error) {
    console.error("Error adding vaccination record:", error)
    return { error: "Failed to add vaccination record. Please try again." }
  }
  finally{
    revalidatePath("/admin/vaccinations")
    redirect("/admin/vaccinations")
  }
}

export async function getUpcomingVaccinations() {
  try {
    const query = `
      SELECT v.*, l.tag_number, l.type, l.breed, o.name as owner_name, o.phone_number
      FROM vaccinationrecords v
      JOIN livestock l ON v.livestock_id = l.livestock_id
      JOIN owners o ON l.owner_id = o.owner_id
      WHERE v.next_due_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
      ORDER BY v.next_due_date ASC
    `

    const vaccinations = await executeQuery<any[]>({ query })
    return vaccinations || []
  } catch (error) {
    console.error("Error fetching upcoming vaccinations:", error)
    return []
  }
}

// Health records actions
export async function addHealthRecord(formData: FormData) {
  const livestockId = formData.get("livestockId") as string
  const diagnosis = formData.get("diagnosis") as string
  const treatment = formData.get("treatment") as string
  const vetName = formData.get("vetName") as string
  const visitDate = formData.get("visitDate") as string

  if (!livestockId || !diagnosis || !treatment || !vetName || !visitDate) {
    return { error: "All fields are required" }
  }

  try {
    const query = `
      INSERT INTO healthrecords (livestock_id, diagnosis, treatment_given, vet_name, visit_date)
      VALUES (?, ?, ?, ?, ?)
    `

    await executeQuery({
      query,
      values: [livestockId, diagnosis, treatment, vetName, visitDate],
    })

   
  } catch (error) {
    console.error("Error adding health record:", error)
    return { error: "Failed to add health record. Please try again." }
  }
  finally{
    revalidatePath("/admin/health-records")
    redirect("/admin/health-records")
  }
}

export async function getHealthRecords(livestockId?: string) {
  try {
    let query = `
      SELECT h.*, l.tag_number, l.type, l.breed
      FROM healthrecords h
      JOIN livestock l ON h.livestock_id = l.livestock_id
    `

    const values: any[] = []

    if (livestockId) {
      query += " WHERE h.livestock_id = ?"
      values.push(livestockId)
    }

    query += " ORDER BY h.visit_date DESC"

    const records = await executeQuery<any[]>({ query, values })
    return records || []
  } catch (error) {
    console.error("Error fetching health records:", error)
    return []
  }
}

// Veterinarian actions
export async function addVeterinarian(formData: FormData) {
  const name = formData.get("name") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const location = formData.get("location") as string
  const availability = formData.get("availability") !== "true"
  console.log(formData)
  if (!name || !phoneNumber || !location) {
    return { error: "All fields are required" }
  }

  try {
    const query = `
      INSERT INTO veterinarians (name, phone_number, location, availability)
      VALUES (?, ?, ?, ?)
    `

    await executeQuery({
      query,
      values: [name, phoneNumber, location, availability],
    })

    
  } catch (error) {
    console.error("Error adding veterinarian:", error)
    return { error: "Failed to add veterinarian. Please try again." }
  }
  finally{
    revalidatePath(`/admin/veterinarians`)
    redirect(`/admin/veterinarians`)
  }
}

export async function getVeterinarians(available?: boolean) {
  try {
    let query = "SELECT * FROM veterinarians"
    const values: any[] = []

    // if (available) {
    //   query += " WHERE available= ?"
    //   values.push(available)
    // }

    query += " ORDER BY name ASC"

    const vets = await executeQuery<any[]>({ query, values })
    console.log(vets)
    return vets || []
  } catch (error) {
    console.error("Error fetching veterinarians:", error)
    return []
  }
}

// Health camp logs actions
export async function addHealthCamp(formData: FormData) {
  const date = formData.get("date") as string
  const location = formData.get("location") as string
  const organizedBy = formData.get("organizedBy") as string
  const animalsChecked = Number.parseInt(formData.get("animalsChecked") as string)

  if (!date || !location || !organizedBy || isNaN(animalsChecked)) {
    return { error: "All fields are required" }
  }

  try {
    const query = `
      INSERT INTO healthcamplogs (date, location, organized_by, animals_checked)
      VALUES (?, ?, ?, ?)
    `

    await executeQuery({
      query,
      values: [date, location, organizedBy, animalsChecked],
    })

    
  } catch (error) {
    console.error("Error adding health camp:", error)
    return { error: "Failed to add health camp. Please try again." }
  }
  finally{
    revalidatePath("/admin/health-camps")
    redirect("/admin/health-camps")
  }
}

export async function getHealthCamps() {
  try {
    const query = "SELECT * FROM healthcamplogs ORDER BY date DESC"
    const camps = await executeQuery<any[]>({ query })
    return camps || []
  } catch (error) {
    console.error("Error fetching health camps:", error)
    return []
  }
}

// Health issue submission (for farmers)
export async function submitHealthIssue(formData: FormData) {
  const user = await getUser()
  if (!user) {
    return { error: "You must be logged in to submit a health issue" }
  }

  const livestockId = formData.get("livestockId") as string
  const issue = formData.get("issue") as string
  const currentDate = new Date().toISOString().split("T")[0]

  if (!livestockId || !issue) {
    return { error: "All fields are required" }
  }

  try {
    // For simplicity, we'll add this as a health record with a special vet name
    const query = `
      INSERT INTO healthrecords (livestock_id, diagnosis, treatment_given, vet_name, visit_date)
      VALUES (?, ?, ?, ?, ?)
    `

    await executeQuery({
      query,
      values: [livestockId, issue, "Pending", "Farmer Reported", currentDate],
    })

    
  } catch (error) {
    console.error("Error submitting health issue:", error)
    return { error: "Failed to submit health issue. Please try again." }
  }
  finally{
    revalidatePath("/farmer/health-issues")
    redirect("/farmer/health-issues")
  }
}

export { getUser }
