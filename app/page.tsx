import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MilkIcon as Cow, Users, Shield, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cow className="h-8 w-8 text-green-600" />
            <h1 className="text-xl font-bold text-green-800">Livestock Health</h1>
          </div>
          <nav className="flex space-x-4">
            <Link href="/farmer/login" className="text-green-800 hover:text-green-600">
              Farmer Login
            </Link>
            <Link href="/admin/login" className="text-green-800 hover:text-green-600">
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-green-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
                Community Livestock Health Management
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                A simple way for rural farmers to register livestock and track their health, vaccinations, and
                veterinary care.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href="/farmer/register">
                    Register as Farmer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cow className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Register Livestock</h3>
                <p className="text-gray-700">
                  Easily register your animals with basic information and get a unique tag number.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Track Health</h3>
                <p className="text-gray-700">
                  Keep track of vaccinations, health issues, and treatments for each animal.
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-6 text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-800 mb-2">Connect with Vets</h3>
                <p className="text-gray-700">
                  Find available veterinarians and get professional care for your livestock.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">Ready to get started?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join our community of farmers and veterinarians to ensure the health and wellbeing of your livestock.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/farmer/register">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          
          <div className="mt-4 text-center text-green-100">
            <p>© 2025 Community Livestock Health Management System
            </p>
            <p>Made by Arsh &amp; Rhea</p>
          </div>
        </div>
      </footer>
    </div>
  )
}