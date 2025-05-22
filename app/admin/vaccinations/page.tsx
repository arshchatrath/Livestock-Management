// 'use client'

import { Suspense } from "react"
import Link from "next/link"
import { Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import { getAllLivestock } from "@/lib/actions"

async function VaccinationContent() {
  const livestock = await getAllLivestock()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Tag Number</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Breed</th>
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
                  <td className="px-4 py-3">
                    <div>{animal.owner_name}</div>
                    <div className="text-xs text-gray-500">{animal.village}</div>
                  </td>
                  <td className="px-4 py-3">
                    {animal.next_vaccination_date ? (
                      <span>{new Date(animal.next_vaccination_date).toLocaleDateString()}</span>
                    ) : (
                      <span className="text-gray-500">No vaccination scheduled</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button asChild size="sm">
                      <Link href={`/admin/vaccinations/add?id=${animal.livestock_id}`}>
                        <Syringe className="h-4 w-4 mr-1" />
                        Add Vaccination
                      </Link>
                    </Button>
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

export default function VaccinationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Vaccinations</h1>
            <p className="text-gray-600">Manage vaccination records for all livestock</p>
          </div>
        </div>

        <Suspense fallback={<div>Loading vaccination data...</div>}>
          <VaccinationContent />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
