"use client"

import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Code, Award, MessageSquare, LogOut, Cpu, Shield, Database, Settings, Eye } from "lucide-react"

interface DashboardStats {
  services: number
  certificates: number
  teamMembers: number
  messages: number
  unreadMessages: number
  projects: number
  clients: number
}

export default function AdminDashboard() {
  const { user, isAuthenticated, logout, loading } = useAdmin()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    certificates: 0,
    teamMembers: 0,
    messages: 0,
    unreadMessages: 0,
    projects: 0,
    clients: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          console.error('Failed to load dashboard stats')
        }
      } catch (error) {
        console.error('Error loading dashboard stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }

    if (isAuthenticated) {
      loadStats()
    }
  }, [isAuthenticated])

  if (loading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           <div className="flex items-center space-x-4 text-center">
  <img src="/logo.png" alt="BLACK SEA STAR" className="h-12 w-12" />
  <div className="text-left">
    <h2 className="text-2xl font-extrabold text-gray-900">BLACK SEA STAR</h2>
    <p className="text-sm text-gray-600">Login to manage website content</p>
  </div>
</div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {user?.username}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Technology Dashboard</h2>
            <p className="text-gray-600 text-lg">Manage your technology company website content and digital presence</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border border-blue-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Technology Services</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-900 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.services}</div>
                <p className="text-xs text-gray-600">Active technology services</p>
              </CardContent>
            </Card>

            <Card className="border border-purple-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Certifications</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-900 to-purple-900 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.certificates}</div>
                <p className="text-xs text-gray-600">Technology certifications</p>
              </CardContent>
            </Card>

            <Card className="border border-green-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Team Experts</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-green-900 to-green-900 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.teamMembers}</div>
                <p className="text-xs text-gray-600">Technology experts</p>
              </CardContent>
            </Card>

            <Card className="border border-orange-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Client Inquiries</CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-900 to-orange-900 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</div>
                <p className="text-xs text-gray-600">Unread inquiries</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-blue-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Code className="h-5 w-5 text-blue-600" />
                  <span>Technology Services</span>
                </CardTitle>
                <CardDescription>Manage software development, cloud, AI, and cybersecurity services</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-100 to-blue-100 hover:from-blue-100 hover:to-blue-100 transition-all duration-300 group-hover:scale-105"
                  onClick={() => router.push("/admin/services")}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Manage Services
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-purple-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Certifications</span>
                </CardTitle>
                <CardDescription>Update technology certifications and security standards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-100 to-purple-100 hover:from-purple-100 hover:to-purple-100 transition-all duration-300 group-hover:scale-105"
                  onClick={() => router.push("/admin/certificates")}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Manage Certificates
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-green-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Team Experts</span>
                </CardTitle>
                <CardDescription>Manage technology experts and development team profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-green-100 to-green-100 hover:from-green-100 hover:to-green-100 transition-all duration-300 group-hover:scale-105"
                  onClick={() => router.push("/admin/team")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </CardContent>
            </Card>


            <Card className="border border-gray-200/30 bg-white/80 backdrop-blur-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Eye className="h-5 w-5 text-gray-600" />
                  <span>Website Preview</span>
                </CardTitle>
                <CardDescription>Preview your technology website with current changes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group-hover:scale-105"
                  onClick={() => window.open("/", "_blank")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Website
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-12">
            <Card className="border border-blue-200/30 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes to your technology website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">New AI service added</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Team member profile updated</p>
                      <p className="text-xs text-gray-600">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50/50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Security certification renewed</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}