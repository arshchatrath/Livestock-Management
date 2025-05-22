import { Suspense } from "react"
import Link from "next/link"
import { MilkIcon as Cow, Syringe, Stethoscope, Users, Tent, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import {
  getAllLivestock,
  getUpcomingVaccinations,
  getHealthRecords,
  getVeterinarians,
  getHealthCamps,
} from "@/lib/actions"

async function DashboardContent() {
  const [livestock, upcomingVaccinations, healthRecords, vets, camps] = await Promise.all([
    getAllLivestock(),
    getUpcomingVaccinations(),
    getHealthRecords(),
    getVeterinarians(),
    getHealthCamps(),
  ])

  const dashboardCards = [
    {
      title: "Total Livestock",
      value: livestock.length,
      icon: Cow,
      color: "text-green-600",
      bgColor: "bg-green-50",
      link: "/admin/livestock",
    },
    {
      title: "Upcoming Vaccinations",
      value: upcomingVaccinations.length,
      icon: Syringe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      link: "/admin/upcoming-vaccinations",
    },
    {
      title: "Health Records",
      value: healthRecords.length,
      icon: Stethoscope,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      link: "/admin/health-records",
    },
    {
      title: "Veterinarians",
      value: vets.length,
      icon: Users,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      link: "/admin/veterinarians",
    },
    {
      title: "Health Camps",
      value: camps.length,
      icon: Tent,
      color: "text-red-600",
      bgColor: "bg-red-50",
      link: "/admin/health-camps",
    },
    {
      title: "This Week's Vaccinations",
      value: upcomingVaccinations.filter((v) => {
        const dueDate = new Date(v.next_due_date)
        const today = new Date()
        const nextWeek = new Date()
        nextWeek.setDate(today.getDate() + 7)
        return dueDate >= today && dueDate <= nextWeek
      }).length,
      icon: Calendar,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      link: "/admin/upcoming-vaccinations",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of the livestock health management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className={`pb-2 ${card.bgColor}`}>
              <CardTitle className="text-lg flex items-center">
                <card.icon className={`h-5 w-5 mr-2 ${card.color}`} />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-bold">{card.value}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={card.link}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Health Issues</CardTitle>
            <CardDescription>Latest reported health problems</CardDescription>
          </CardHeader>
          <CardContent>
            {healthRecords.slice(0, 5).map((record, index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-0">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {record.tag_number} ({record.type})
                  </div>
                  <div className="text-sm text-gray-500">{new Date(record.visit_date).toLocaleDateString()}</div>
                </div>
                <p className="text-sm mt-1 text-gray-700">{record.diagnosis}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/health-records">View All Records</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Vaccinations</CardTitle>
            <CardDescription>Vaccinations due in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingVaccinations.slice(0, 5).map((vaccination, index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-0">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {vaccination.tag_number} ({vaccination.type})
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(vaccination.next_due_date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm mt-1 text-gray-700">{vaccination.vaccine_name}</p>
                <p className="text-xs mt-1 text-gray-500">Owner: {vaccination.owner_name}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/upcoming-vaccinations">View All Vaccinations</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <AdminLayout>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </AdminLayout>
  )
}
