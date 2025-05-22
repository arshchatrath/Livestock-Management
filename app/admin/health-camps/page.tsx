import { Suspense } from "react"
import Link from "next/link"
import { Tent, Plus, Calendar, MapPin, Users, MilkIcon as Cow } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminLayout from "@/components/admin-layout"
import { getHealthCamps } from "@/lib/actions"

async function HealthCampsList() {
  const camps = await getHealthCamps()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {camps.map((camp) => (
          <div key={camp.camp_id} className="bg-white rounded-md shadow overflow-hidden">
            <div className="bg-amber-50 px-4 py-3 border-b border-amber-100">
              <div className="flex items-center">
                <Tent className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="font-medium text-amber-800">Health Camp #{camp.camp_id}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div className="text-sm text-gray-600">{new Date(camp.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-gray-600">{camp.location}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium">Organized By</div>
                    <div className="text-sm text-gray-600">{camp.organized_by}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Cow className="h-4 w-4 text-gray-500 mt-0.5 mr-2" />
                  <div>
                    <div className="font-medium">Animals Checked</div>
                    <div className="text-sm text-gray-600">{camp.animals_checked}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                {/* <Button asChild variant="outline" className="w-full">
                  <Link href={`/admin/health-camps/${camp.camp_id}`}>View Details</Link>
                </Button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HealthCampsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Health Camps</h1>
            <p className="text-gray-600">Manage health camp records and events</p>
          </div>
          <Button asChild>
            <Link href="/admin/health-camps/add">
              <Plus className="h-4 w-4 mr-1" />
              Add Health Camp
            </Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading health camps...</div>}>
          <HealthCampsList />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
