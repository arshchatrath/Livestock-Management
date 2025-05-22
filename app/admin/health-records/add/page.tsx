import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import { getAllLivestock, addHealthRecord } from "@/lib/actions"

async function AddHealthRecordForm({ selectedId }: { selectedId?: string }) {
  const livestock = await getAllLivestock()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Health Record</CardTitle>
        <CardDescription>Record a diagnosis and treatment for an animal</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={addHealthRecord} className="space-y-4">
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
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <Textarea
              id="diagnosis"
              name="diagnosis"
              placeholder="Enter diagnosis"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment Given</Label>
            <Textarea
              id="treatment"
              name="treatment"
              placeholder="Enter treatment details"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vetName">Veterinarian Name</Label>
            <Input id="vetName" name="vetName" placeholder="Enter veterinarian name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitDate">Visit Date</Label>
            <Input
              id="visitDate"
              name="visitDate"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Health Record
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function AddHealthRecordPage({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <AdminLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Add Health Record</h1>

        <Suspense fallback={<div>Loading form...</div>}>
          <AddHealthRecordForm selectedId={searchParams.id} />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
