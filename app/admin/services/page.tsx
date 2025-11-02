"use client"
import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Edit, Trash2, Code, Cloud, Shield, Brain, Database, Smartphone, Server, Cpu, Zap, Lock, Users, Globe, Eye, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ImageUpload } from "@/components/ui/image-upload"
import Image from "next/image"

interface Service {
  id: string
  name_en: string
  name_ar: string
  name_ro: string
  description_en: string
  description_ar: string
  description_ro: string
  icon: string
  image_url?: string
  created_at: string
  updated_at: string
}

export default function AdminServicesPage() {
  const { isAuthenticated, loading } = useAdmin()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          console.log('Loaded services from database:', data)
          setServices(data)
        } else {
          console.error('Failed to load services from database')
          setServices([])
        }
      } catch (error) {
        console.error('Error loading services:', error)
        setServices([])
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-900">Loading services...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleBack = () => {
    router.push("/admin/dashboard")
  }

  const handleAddService = () => {
    setShowAddForm(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
  }

  const handleDeleteService = async (serviceId: string) => {
    console.log('Attempting to delete service with ID:', serviceId)
    
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch('/api/delete-service/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: serviceId })
        })
        
        console.log('Delete response status:', response.status)
        
        if (response.ok) {
          const result = await response.json()
          console.log('Delete successful:', result)
          
          const reloadResponse = await fetch('/api/services')
          if (reloadResponse.ok) {
            const updatedServices = await reloadResponse.json()
            setServices(updatedServices)
          } else {
            setServices(services.filter(s => s.id !== serviceId))
          }
          
          alert("Service deleted successfully!")
        } else {
          const errorData = await response.json()
          console.error('Failed to delete service:', errorData)
          alert(`Failed to delete service: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting service:', error)
        alert("Error deleting service. Please try again.")
      }
    }
  }

  const handleSubmitService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const serviceData = {
      name_en: formData.get('name_en') as string,
      name_ar: formData.get('name_ar') as string,
      name_ro: formData.get('name_ro') as string,
      description_en: formData.get('description_en') as string,
      description_ar: formData.get('description_ar') as string,
      description_ro: formData.get('description_ro') as string,
      icon: formData.get('icon') as string,
      image_url: formData.get('image_url') as string
    }

    try {
      let response;
      
      if (editingService) {
        response = await fetch(`/api/services/${editingService.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...serviceData, id: editingService.id }),
        })
      } else {
        response = await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceData),
        })
      }

      if (response.ok) {
        const updatedService = await response.json()
        
        if (editingService) {
          setServices(services.map(service => 
            service.id === editingService.id ? updatedService : service
          ))
          alert('Service updated successfully!')
        } else {
          setServices([...services, updatedService])
          alert('Service added successfully!')
        }
        
        setShowAddForm(false)
        setEditingService(null)
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to save service. Please try again.')
      }
    } catch (error) {
      console.error('Error saving service:', error)
      alert('Error saving service. Please try again.')
    }
  }

  // Function to get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Code: Code,
      Cloud: Cloud,
      Shield: Shield,
      Brain: Brain,
      Database: Database,
      Smartphone: Smartphone,
      Server: Server,
      Cpu: Cpu,
      Zap: Zap,
      Lock: Lock,
      Users: Users,
      Globe: Globe
    }
    
    const IconComponent = iconMap[iconName] || Code
    return <IconComponent className="h-5 w-5 text-blue-900" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-blue-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleBack} className="border-blue-200 hover:bg-blue-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <Button 
              onClick={handleAddService}
              className="bg-gradient-to-r"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="hover:shadow-xl transition-all duration-900 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden hover:-translate-y-2 group"
              >
                <CardContent className="p-0">
                  {/* Service Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    {service.image_url ? (
                      <Image
                        src={service.image_url}
                        alt={service.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl flex items-center justify-center">
                          {getIconComponent(service.icon)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {service.name_en}
                      </h3>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditService(service)}
                          className="h-6 w-6 p-0 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                          className="h-6 w-6 p-0 border-red-200 hover:bg-red-50 text-red-900 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* View More Button */}
                    <Button
                      onClick={() => setSelectedService(service)}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-200 text-blue-900 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Details Modal */}
          {selectedService && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-blue-200/30 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br  flex items-center justify-center">
                          {getIconComponent(selectedService.icon)}
                        </div>
                        <span>{selectedService.name_en}</span>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedService(null)}
                        className="h-8 w-8 p-0 text-gray-900 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Service Image */}
                    {selectedService.image_url && (
                      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/30">
                        <Image
                          src={selectedService.image_url}
                          alt={selectedService.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Service Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* English */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Name</Label>
                          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-200">
                            <p className="text-sm font-medium text-gray-900">{selectedService.name_en}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Description</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedService.description_en}</p>
                          </div>
                        </div>
                      </div>

                      {/* Arabic */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Name</Label>
                          <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                            <p className="text-sm font-medium text-gray-900 text-right" dir="rtl">{selectedService.name_ar}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Description</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed text-right" dir="rtl">{selectedService.description_ar}</p>
                          </div>
                        </div>
                      </div>

                      {/* Romanian */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Name</Label>
                          <div className="bg-purple-50/50 rounded-lg p-3 border border-purple-200">
                            <p className="text-sm font-medium text-gray-900">{selectedService.name_ro}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Description</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedService.description_ro}</p>
                          </div>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-900">Icon</Label>
                          <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 flex items-center justify-center">
                                {getIconComponent(selectedService.icon)}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{selectedService.icon}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedService(null)}
                        className="border-gray-300 hover:border-gray-400"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingService(selectedService)
                          setSelectedService(null)
                        }}
                        className=""
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Add/Edit Service Form */}
          {(showAddForm || editingService) && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-blue-200/30 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {editingService ? "Edit Technology Service" : "Add New Technology Service"}
                    </CardTitle>
                    <CardDescription className="text-gray-900">
                      {editingService ? "Update service information and technology details" : "Add a new technology service to your offerings"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white p-8">
                    <form className="space-y-8" onSubmit={handleSubmitService}>
                      {/* Service Names */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name_en" className="text-sm font-semibold text-gray-700">Name (English) *</Label>
                          <Input
                            id="name_en"
                            name="name_en"
                            defaultValue={editingService?.name_en || ""}
                            placeholder="Software Development"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="name_ar" className="text-sm font-semibold text-gray-700">Name (Arabic) *</Label>
                          <Input
                            id="name_ar"
                            name="name_ar"
                            defaultValue={editingService?.name_ar || ""}
                            placeholder="تطوير البرمجيات"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 text-right"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="name_ro" className="text-sm font-semibold text-gray-700">Name (Romanian) *</Label>
                          <Input
                            id="name_ro"
                            name="name_ro"
                            defaultValue={editingService?.name_ro || ""}
                            placeholder="Dezvoltare Software"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Service Descriptions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="description_en" className="text-sm font-semibold text-gray-700">Description (English)</Label>
                          <Textarea
                            id="description_en"
                            name="description_en"
                            defaultValue={editingService?.description_en || ""}
                            placeholder="Custom software solutions and application development..."
                            rows={4}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 resize-none"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="description_ar" className="text-sm font-semibold text-gray-700">Description (Arabic)</Label>
                          <Textarea
                            id="description_ar"
                            name="description_ar"
                            defaultValue={editingService?.description_ar || ""}
                            placeholder="حلول برمجية مخصصة وتطوير التطبيقات..."
                            rows={4}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 resize-none text-right"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="description_ro" className="text-sm font-semibold text-gray-700">Description (Romanian)</Label>
                          <Textarea
                            id="description_ro"
                            name="description_ro"
                            defaultValue={editingService?.description_ro || ""}
                            placeholder="Soluții software personalizate și dezvoltare de aplicații..."
                            rows={4}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 resize-none"
                          />
                        </div>
                      </div>

                      {/* Icon Selection */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">Select Technology Icon</Label>
                        <input
                          type="hidden"
                          id="icon"
                          name="icon"
                          value={editingService?.icon || "Code"}
                          required
                        />
                        <ScrollArea className="h-[250px] border-2 border-gray-300 rounded-xl p-4 bg-gray-50/50">
                          <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                              { icon: Code, name: "Code" },
                              { icon: Cloud, name: "Cloud" },
                              { icon: Shield, name: "Shield" },
                              { icon: Brain, name: "Brain" },
                              { icon: Database, name: "Database" },
                              { icon: Smartphone, name: "Smartphone" },
                              { icon: Server, name: "Server" },
                              { icon: Cpu, name: "Cpu" },
                              { icon: Zap, name: "Zap" },
                              { icon: Lock, name: "Lock" },
                              { icon: Users, name: "Users" },
                              { icon: Globe, name: "Globe" }
                            ].map(({ icon: Icon, name }) => (
                              <Button
                                key={name}
                                type="button"
                                variant={editingService?.icon === name ? "default" : "outline"}
                                className={`p-4 flex flex-col items-center gap-3 h-auto aspect-square transition-all duration-300 ${
                                  editingService?.icon === name 
                                    ? 'bg-gradient-to-br from-blue-900 to-purple-900 text-white border-0' 
                                    : 'border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                }`}
                                onClick={() => {
                                  const iconInput = document.querySelector('input[name="icon"]') as HTMLInputElement;
                                  if (iconInput) {
                                    iconInput.value = name;
                                  }
                                  setEditingService(prev => prev ? {...prev, icon: name} : null);
                                }}
                              >
                                <Icon className="h-6 w-6" />
                                <span className="text-xs text-center font-medium">{name}</span>
                              </Button>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      {/* Service Image */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">Service Image</Label>
                        <input type="hidden" name="image_url" value={editingService?.image_url || ""} />
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50">
                          <ImageUpload
                            value={editingService?.image_url || ""}
                            onChange={(url) => {
                              const hiddenInput = document.querySelector('input[name="image_url"]') as HTMLInputElement;
                              if (hiddenInput) {
                                hiddenInput.value = url;
                              }
                            }}
                            className="!mt-0"
                          />
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <Button
                          type="button"
                          variant="outline"
                          className="px-8 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400"
                          onClick={() => {
                            setShowAddForm(false)
                            setEditingService(null)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                          {editingService ? "Update Service" : "Add Service"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}