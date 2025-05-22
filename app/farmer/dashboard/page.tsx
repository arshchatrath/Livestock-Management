import { Suspense } from "react"
import Link from "next/link"
import { MilkIcon as Cow, PlusCircle, AlertCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FarmerLayout from "@/components/farmer-layout"
import { getUser, getFarmerLivestock, getUpcomingVaccinations } from "@/lib/actions"

async function DashboardContent() {
  const user = await getUser()
  const livestock = await getFarmerLivestock()
  const upcomingVaccinations = await getUpcomingVaccinations()

  // Filter vaccinations for the current farmer's livestock
  const farmerVaccinations = upcomingVaccinations.filter((vaccination) =>
    livestock.some((animal) => animal.livestock_id === vaccination.livestock_id),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-800">Welcome, {user?.name || "Farmer"}</h1>
        <p className="text-gray-600">Manage your livestock health and records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Livestock</CardTitle>
            <CardDescription>You have {livestock.length} registered animals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <Cow className="h-16 w-16 text-green-600" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/farmer/livestock">View My Animals</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Register New Animal</CardTitle>
            <CardDescription>Add a new animal to your records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <PlusCircle className="h-16 w-16 text-green-600" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/farmer/register-livestock">Register Animal</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Report Health Issue</CardTitle>
            <CardDescription>Report a health problem with your animal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <AlertCircle className="h-16 w-16 text-amber-600" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/farmer/health-issues">Report Issue</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Vaccinations</CardTitle>
            <CardDescription>You have {farmerVaccinations.length} upcoming vaccinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <Calendar className="h-16 w-16 text-blue-600" />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/farmer/livestock">View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <FarmerLayout>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </FarmerLayout>
  )
}
