import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import FarmerLayout from "@/components/farmer-layout"
import { getFarmerLivestock, submitHealthIssue } from "@/lib/actions"

async function HealthIssueForm({ selectedId }: { selectedId?: string }) {
  const livestock = await getFarmerLivestock()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Health Issue</CardTitle>
        <CardDescription>Report a health problem with your animal for veterinary attention</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={submitHealthIssue} className="space-y-4">
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
                  {animal.type} - {animal.tag_number} ({animal.breed})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">Describe the Health Issue</Label>
            <Textarea
              id="issue"
              name="issue"
              placeholder="Describe the symptoms or health problem you've observed..."
              className="min-h-[120px]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function HealthIssuePage() {
  return (
    <FarmerLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Report Health Issue</h1>

        <Suspense fallback={<div>Loading form...</div>}>
          <HealthIssueForm />
        </Suspense>
      </div>
    </FarmerLayout>
  )
}
