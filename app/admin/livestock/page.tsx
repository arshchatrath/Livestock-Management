import { Suspense } from "react"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/admin-layout"
import { getAllLivestock } from "@/lib/actions"

async function LivestockList() {
  const livestock = await getAllLivestock()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search by tag number, type, or owner..." className="pl-8" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Tag Number</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Breed</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Gender</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Birth Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Owner</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Next Vaccination</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {livestock.map((animal) => (
                <tr key={animal.livestock_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{animal.tag_number}</td>
                  <td className="px-4 py-3">{animal.type}</td>
                  <td className="px-4 py-3">{animal.breed}</td>
                  <td className="px-4 py-3">{animal.gender}</td>
                  <td className="px-4 py-3">{new Date(animal.birth_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div>{animal.owner_name}</div>
                    <div className="text-xs text-gray-500">{animal.village}</div>
                  </td>
                  <td className="px-4 py-3">
                    {animal.next_vaccination_date ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {new Date(animal.next_vaccination_date).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      {/* <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/livestock/${animal.livestock_id}`}>View</Link>
                      </Button> */}
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/vaccinations/add?id=${animal.livestock_id}`}>Vaccinate</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function LivestockPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">All Livestock</h1>
            <p className="text-gray-600">View and manage all registered animals</p>
          </div>
        </div>

        <Suspense fallback={<div>Loading livestock data...</div>}>
          <LivestockList />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
