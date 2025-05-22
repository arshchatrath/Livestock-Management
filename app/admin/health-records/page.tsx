import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AdminLayout from "@/components/admin-layout"
import { getHealthRecords } from "@/lib/actions"

async function HealthRecordsList() {
  const records = await getHealthRecords()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Animal</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Diagnosis</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Treatment</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Veterinarian</th>
                {/* <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.record_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{new Date(record.visit_date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{record.tag_number}</div>
                    <div className="text-xs text-gray-500">
                      {record.type} ({record.breed})
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate">{record.diagnosis}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs truncate">{record.treatment_given}</div>
                  </td>
                  <td className="px-4 py-3">
                    {record.vet_name === "Farmer Reported" ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Farmer Reported
                      </Badge>
                    ) : (
                      record.vet_name
                    )}
                  </td>
                  {/* <td className="px-4 py-3">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/health-records/${record.record_id}`}>View Details</Link>
                    </Button>
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

export default function HealthRecordsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Health Records</h1>
            <p className="text-gray-600">View and manage all health records</p>
          </div>
          <Button asChild>
            <Link href="/admin/health-records/add">
              <Plus className="h-4 w-4 mr-1" />
              Add Health Record
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading health records...</div>}>
          <HealthRecordsList />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
