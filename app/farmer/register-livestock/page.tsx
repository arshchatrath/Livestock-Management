import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FarmerLayout from "@/components/farmer-layout"
import { registerLivestock } from "@/lib/actions"

function RegisterLivestockForm() {
  const animalTypes = [
    { value: "cow", label: "Cow" },
    { value: "buffalo", label: "Buffalo" },
    { value: "goat", label: "Goat" },
    { value: "sheep", label: "Sheep" },
    { value: "poultry", label: "Poultry" },
    { value: "other", label: "Other" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Animal</CardTitle>
        <CardDescription>Enter the details of your animal to register it in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerLivestock} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Animal Type</Label>
            <select
              id="type"
              name="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select animal type</option>
              {animalTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" name="breed" placeholder="Enter breed" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input id="birthDate" name="birthDate" type="date" max={new Date().toISOString().split("T")[0]} required />
          </div>

          <Button type="submit" className="w-full">
            Register Animal
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function RegisterLivestockPage() {
  return (
    <FarmerLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-green-800 mb-6">Register New Animal</h1>

        <Suspense fallback={<div>Loading form...</div>}>
          <RegisterLivestockForm />
        </Suspense>
      </div>
    </FarmerLayout>
  )
}
