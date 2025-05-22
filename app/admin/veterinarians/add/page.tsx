import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import AdminLayout from "@/components/admin-layout"
import { addVeterinarian } from "@/lib/actions"

export default function AddVeterinarianPage() {
  return (
    <AdminLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Add Veterinarian</h1>

        <Card>
          <CardHeader>
            <CardTitle>Add Veterinarian</CardTitle>
            <CardDescription>Add a new veterinarian to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addVeterinarian} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter veterinarian name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" type="tel" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Enter location" required />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="availability" name="availability" defaultChecked />
                <Label htmlFor="availability">Available for service</Label>
                <input type="hidden" name="availability" value="true" />
              </div>

              <Button type="submit" className="w-full">
                Add Veterinarian
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
