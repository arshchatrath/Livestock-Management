
import Link from "next/link"
import { MilkIcon as Cow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { loginFarmer } from "@/lib/actions"

export default function FarmerLogin() {
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
            <CardTitle className="text-xl text-center">Farmer Login</CardTitle>
            <CardDescription className="text-center">Enter your phone number to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={loginFarmer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" type="tel" required />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/farmer/register" className="text-green-600 hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
