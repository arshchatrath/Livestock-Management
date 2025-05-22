import { Suspense } from "react"
import Link from "next/link"
import { Plus, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/admin-layout"
import { getVeterinarians } from "@/lib/actions"

async function VeterinariansList() {
  const vets = await getVeterinarians()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Location</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Availability</th>
                {/* <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vets.map((vet) => (
                <tr key={vet.vet_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{vet.name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${vet.phone_number}`} className="flex items-center text-blue-600 hover:text-blue-800">
                      <Phone className="h-3 w-3 mr-1" />
                      {vet.phone_number}
                    </a>
                  </td>
                  <td className="px-4 py-3">{vet.location}</td>
                  <td className="px-4 py-3">
                    {vet.availability ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Unavailable
                      </Badge>
                    )}
                  </td>
                  {/* <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/veterinarians/${vet.vet_id}`}>Edit</Link>
                      </Button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function VeterinariansPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Veterinarians</h1>
            <p className="text-gray-600">Manage veterinarians and their availability</p>
          </div>
          <Button asChild>
            <Link href="/admin/veterinarians/add">
              <Plus className="h-4 w-4 mr-1" />
              Add Veterinarian
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading veterinarians...</div>}>
          <VeterinariansList />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
