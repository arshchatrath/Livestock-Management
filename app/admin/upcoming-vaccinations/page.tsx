import { Suspense } from "react"
import Link from "next/link"
import { Calendar, Syringe, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import { getUpcomingVaccinations } from "@/lib/actions"

async function UpcomingVaccinationsList() {
  const vaccinations = await getUpcomingVaccinations()

  if (vaccinations.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-md shadow">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No upcoming vaccinations</h3>
        <p className="mt-1 text-gray-500">There are no vaccinations due in the next 7 days.</p>
      </div>
    )
  }

  // Group vaccinations by due date
  const groupedByDate = vaccinations.reduce(
    (acc, vaccination) => {
      const date = new Date(vaccination.next_due_date).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(vaccination)
      return acc
    },
    {} as Record<string, typeof vaccinations>,
  )

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDate).map(([date, vaccinations]) => (
        <div key={date} className="bg-white rounded-md shadow overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">
                Due on {date} ({vaccinations.length} vaccinations)
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Tag Number</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Animal</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Vaccine</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Owner</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Contact</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vaccinations.map((vaccination) => (
                  <tr key={vaccination.record_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{vaccination.tag_number}</td>
                    <td className="px-4 py-3">{vaccination.type} ({vaccination.breed})</td>
                    <td className="px-4 py-3">{vaccination.vaccine_name}</td>
                    <td className="px-4 py-3">{vaccination.owner_name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${vaccination.phone_number}`} className="flex items-center text-blue-600 hover:text-blue-800">
                        <Phone className="h-3 w-3 mr-1" />
                        {vaccination.phone_number}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        {/* <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/livestock/${vaccination.livestock_id}`}>View Animal</Link>
                        </Button> */}
                        <Button asChild size="sm">
                          <Link href={`/admin/vaccinations/add?id=${vaccination.livestock_id}`}>
                            <Syringe className="h-4 w-4 mr-1" />
                            Vaccinate
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function UpcomingVaccinationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800">Upcoming Vaccinations</h1>
          <p className="text-gray-600">Vaccinations due in the next 7 days</p>
        </div>

        <Suspense fallback={<div>Loading vaccination data...</div>}>
          <UpcomingVaccinationsList />
        </Suspense>
      </div>
    </AdminLayout>
  )
}