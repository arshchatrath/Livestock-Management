'use client'

import Link from "next/link"
import { MilkIcon as Cow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerFarmer } from "@/lib/actions"

export default function FarmerRegister() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <Cow className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">Livestock Health</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Farmer Registration</CardTitle>
            <CardDescription className="text-center">Register to manage your livestock health</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={registerFarmer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">Village</Label>
                <Input id="village" name="village" placeholder="Enter your village name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" type="tel" required />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <Link href="/farmer/login" className="text-green-600 hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
