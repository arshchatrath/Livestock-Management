import { Suspense } from "react"
import Link from "next/link"
import { MilkIcon as Cow, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FarmerLayout from "@/components/farmer-layout"
import { getFarmerLivestock } from "@/lib/actions"

async function LivestockList() {
  const livestock = await getFarmerLivestock()

  if (livestock.length === 0) {
    return (
      <div className="text-center py-12">
        <Cow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No livestock registered</h3>
        <p className="mt-1 text-gray-500">Get started by registering your first animal.</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/farmer/register-livestock">Register Animal</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {livestock.map((animal) => {
        const hasUpcomingVaccination =
          animal.next_vaccination_date && new Date(animal.next_vaccination_date) > new Date()

        return (
          <Card key={animal.livestock_id} className="overflow-hidden">
            <CardHeader className="bg-green-50 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center">
                  <Cow className="h-5 w-5 mr-2 text-green-600" />
                  {animal.type} - {animal.tag_number}
                </CardTitle>
                {hasUpcomingVaccination && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Vaccination Due
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <dt className="font-medium text-gray-500">Breed</dt>
                  <dd className="mt-1">{animal.breed}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1">{animal.gender}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Birth Date</dt>
                  <dd className="mt-1">{new Date(animal.birth_date).toLocaleDateString()}</dd>
                </div>
                {animal.next_vaccination_date && (
                  <div>
                    <dt className="font-medium text-gray-500">Next Vaccination</dt>
                    <dd className="mt-1">{new Date(animal.next_vaccination_date).toLocaleDateString()}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 flex space-x-2">
                {/* <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/farmer/livestock/${animal.livestock_id}`}>View Details</Link>
                </Button> */}
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex-1 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                >
                  <Link href={`/farmer/health-issues?id=${animal.livestock_id}`}>
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Report Issue
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default function LivestockPage() {
  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">My Animals</h1>
            <p className="text-gray-600">View and manage your registered livestock</p>
          </div>
          <Button asChild>
            <Link href="/farmer/register-livestock">Register New</Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading livestock...</div>}>
          <LivestockList />
        </Suspense>
      </div>
    </FarmerLayout>
  )
}
