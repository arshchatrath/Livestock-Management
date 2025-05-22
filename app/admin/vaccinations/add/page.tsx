'use client'

import { useEffect, useState, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import { getAllLivestock, addVaccinationRecord } from "@/lib/actions"
import { useSearchParams } from "next/navigation"

import { Suspense } from "react"

function AddVaccinationForm({ selectedId }: { selectedId?: string }) {
  const [livestock, setLivestock] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const data = await getAllLivestock()
        setLivestock(data)
      } catch (error) {
        console.error("Failed to fetch livestock data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLivestock()
  }, [])

  if (loading) {
    return <div>Loading livestock data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Vaccination Record</CardTitle>
        <CardDescription>Record a new vaccination for an animal</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={addVaccinationRecord} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="livestockId">Select Animal</Label>
            <select
              id="livestockId"
              name="livestockId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={selectedId || ""}
              required
            >
              <option value="">Select an animal</option>
              {livestock.map((animal) => (
                <option key={animal.livestock_id} value={animal.livestock_id}>
                  {animal.tag_number} - {animal.type} ({animal.owner_name})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vaccineName">Vaccine Name</Label>
            <Input id="vaccineName" name="vaccineName" placeholder="Enter vaccine name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateGiven">Date Given</Label>
            <Input
              id="dateGiven"
              name="dateGiven"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextDueDate">Next Due Date</Label>
            <Input id="nextDueDate" name="nextDueDate" type="date" required />
          </div>

          <Button type="submit" className="w-full">
            Add Vaccination Record
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// export default function AddVaccinationPage() {
//   // Use the useSearchParams hook to get the ID from the URL
//   const searchParams = useSearchParams();
//   const selectedId = searchParams.get('id') || undefined;

//   return (
//     <AdminLayout>
//       <div className="max-w-md mx-auto">
//         <h1 className="text-2xl font-bold text-green-800 mb-6">Add Vaccination Record</h1>
//         <Suspense fallback={<div>Loading...</div>}>
//         <AddVaccinationForm selectedId={selectedId} />
//     </Suspense>
//       </div>
//     </AdminLayout>
//   )
// }
export default function AddVaccinationPage() {
  return (
    <AdminLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Add Vaccination Record</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <VaccinationFormWithParams />
        </Suspense>
      </div>
    </AdminLayout>
  );
}

// This component uses useSearchParams inside a Suspense boundary
function VaccinationFormWithParams() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id') || undefined;
  
  return <AddVaccinationForm selectedId={selectedId} />;
}
