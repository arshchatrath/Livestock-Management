import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import { addHealthCamp } from "@/lib/actions"

export default function AddHealthCampPage() {
  return (
    <AdminLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Add Health Camp</h1>

        <Card>
          <CardHeader>
            <CardTitle>Add Health Camp</CardTitle>
            <CardDescription>Record a new health camp event</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addHealthCamp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Enter camp location" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizedBy">Organized By</Label>
                <Input id="organizedBy" name="organizedBy" placeholder="Enter organizer name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="animalsChecked">Number of Animals Checked</Label>
                <Input
                  id="animalsChecked"
                  name="animalsChecked"
                  type="number"
                  min="1"
                  placeholder="Enter number of animals"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Add Health Camp
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
