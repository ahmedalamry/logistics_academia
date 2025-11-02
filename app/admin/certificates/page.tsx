"use client"

import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Edit, Trash2, Award, Calendar, Eye, X } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"
import Image from "next/image"

interface Certificate {
  id: string
  name_en: string
  name_ar: string
  name_ro: string
  description_en: string
  description_ar: string
  description_ro: string
  image_url: string
  issued_date: string
  expiry_date: string
  created_at: string
  updated_at: string
}

export default function AdminCertificatesPage() {
  const { isAuthenticated, loading } = useAdmin()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await fetch('/api/certificates')
        if (response.ok) {
          const data = await response.json()
          setCertificates(data)
        } else {
          console.error('Failed to load certificates from database')
          setCertificates([])
        }
      } catch (error) {
        console.error('Error loading certificates:', error)
        setCertificates([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCertificates()
  }, [])

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-900">Loading certificates...</p>
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

  const handleAddCertificate = () => {
    setShowAddForm(true)
  }

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingCertificate(certificate)
  }

  const handleDeleteCertificate = async (certificateId: string) => {
    console.log("Delete button clicked for certificate:", certificateId)
    
    if (confirm("Are you sure you want to delete this certificate?")) {
      try {
        const response = await fetch('/api/delete-certificate/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: certificateId })
        })
        
        if (response.ok) {
          setCertificates(certificates.filter(c => c.id !== certificateId))
          console.log("Certificate deleted:", certificateId)
          alert("Certificate deleted successfully!")
        } else {
          const errorData = await response.json()
          console.error('Failed to delete certificate:', errorData)
          alert(`Failed to delete certificate: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting certificate:', error)
        alert("Error deleting certificate. Please try again.")
      }
    }
  }

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const isExpiringSoon = (expiryDate: string) => {
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return new Date(expiryDate) <= threeMonthsFromNow && new Date(expiryDate) > new Date()
  }

  const handleSubmitCertificate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const certificateData = {
      id: editingCertificate?.id || undefined,
      name_en: formData.get('name_en') as string || '',
      name_ar: formData.get('name_ar') as string || '',
      name_ro: formData.get('name_ro') as string || '',
      description_en: formData.get('description_en') as string || '',
      description_ar: formData.get('description_ar') as string || '',
      description_ro: formData.get('description_ro') as string || '',
      image_url: formData.get('image_url') as string || '',
      issued_date: formData.get('issued_date') as string || null,
      expiry_date: formData.get('expiry_date') as string || null,
    };

    if (!certificateData.name_en || !certificateData.name_ar || !certificateData.name_ro) {
      alert('Please fill in all name fields (English, Arabic, Romanian)');
      return;
    }

    console.log('Submitting certificate data:', certificateData);

    try {
      const method = editingCertificate ? 'PUT' : 'POST';
      const url = editingCertificate 
        ? `/api/certificates/${editingCertificate.id}`
        : '/api/certificates';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificateData),
      });

      if (response.ok) {
        const updatedCertificate = await response.json();

        if (editingCertificate) {
          setCertificates(certificates.map(c => 
            c.id === updatedCertificate.id ? updatedCertificate : c
          ));
          alert('Certificate updated successfully!');
        } else {
          setCertificates([...certificates, updatedCertificate]);
          alert('Certificate added successfully!');
        }

        setShowAddForm(false);
        setEditingCertificate(null);
      } else {
        const errorData = await response.json();
        console.error('Failed to save certificate:', errorData);
        alert(`Failed to save certificate: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate. Please try again.');
    }
  };

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
              onClick={handleAddCertificate}
              className="bg-gradient-to-r "
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((certificate) => (
              <Card 
                key={certificate.id} 
                className="hover:shadow-xl transition-all duration-900 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden hover:-translate-y-2 group"
              >
                <CardContent className="p-0">
                  {/* Certificate Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    {certificate.image_url ? (
                      <Image
                        src={certificate.image_url}
                        alt={certificate.name_en}
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
                          <Award className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {certificate.name_en}
                      </h3>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCertificate(certificate)}
                          className="h-6 w-6 p-0 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCertificate(certificate.id)}
                          className="h-6 w-6 p-0 border-red-200 hover:bg-red-50 text-red-900 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        isExpired(certificate.expiry_date) 
                          ? 'bg-red-100 text-red-800' 
                          : isExpiringSoon(certificate.expiry_date) 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {isExpired(certificate.expiry_date) 
                          ? 'Expired' 
                          : isExpiringSoon(certificate.expiry_date) 
                            ? 'Expiring Soon' 
                            : 'Valid'
                        }
                      </span>
                      <span className="text-xs text-gray-900">
                        {new Date(certificate.expiry_date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* View More Button */}
                    <Button
                      onClick={() => setSelectedCertificate(certificate)}
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

          {/* Certificate Details Modal */}
          {selectedCertificate && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-blue-200/30 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl flex items-center justify-center">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <span>{selectedCertificate.name_en}</span>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCertificate(null)}
                        className="h-8 w-8 p-0 text-gray-900 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Certificate Image */}
                    {selectedCertificate.image_url && (
                      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/30">
                        <Image
                          src={selectedCertificate.image_url}
                          alt={selectedCertificate.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Certificate Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* English */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Name</Label>
                          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-200">
                            <p className="text-sm font-medium text-gray-900">{selectedCertificate.name_en}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Description</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedCertificate.description_en}</p>
                          </div>
                        </div>
                      </div>

                      {/* Arabic */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Name</Label>
                          <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                            <p className="text-sm font-medium text-gray-900 text-right" dir="rtl">{selectedCertificate.name_ar}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Description</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed text-right" dir="rtl">{selectedCertificate.description_ar}</p>
                          </div>
                        </div>
                      </div>

                      {/* Romanian */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Name</Label>
                          <div className="bg-purple-50/50 rounded-lg p-3 border border-purple-200">
                            <p className="text-sm font-medium text-gray-900">{selectedCertificate.name_ro}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Description</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedCertificate.description_ro}</p>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Issued Date</Label>
                          <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-200">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-orange-900" />
                              <span className="text-sm font-medium text-gray-900">
                                {new Date(selectedCertificate.issued_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Expiry Date</Label>
                          <div className={`rounded-lg p-3 border ${
                            isExpired(selectedCertificate.expiry_date) 
                              ? 'bg-red-50/50 border-red-200' 
                              : isExpiringSoon(selectedCertificate.expiry_date) 
                                ? 'bg-yellow-50/50 border-yellow-200' 
                                : 'bg-green-50/50 border-green-200'
                          }`}>
                            <div className="flex items-center space-x-2">
                              <Calendar className={`h-4 w-4 ${
                                isExpired(selectedCertificate.expiry_date) 
                                  ? 'text-red-900' 
                                  : isExpiringSoon(selectedCertificate.expiry_date) 
                                    ? 'text-yellow-900' 
                                    : 'text-green-900'
                              }`} />
                              <span className={`text-sm font-medium ${
                                isExpired(selectedCertificate.expiry_date) 
                                  ? 'text-red-900' 
                                  : isExpiringSoon(selectedCertificate.expiry_date) 
                                    ? 'text-yellow-900' 
                                    : 'text-green-900'
                              }`}>
                                {new Date(selectedCertificate.expiry_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedCertificate(null)}
                        className="border-gray-300 hover:border-gray-400"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingCertificate(selectedCertificate)
                          setSelectedCertificate(null)
                        }}
                        className="bg-gradient-to-r "
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Add/Edit Certificate Form */}
          {(showAddForm || editingCertificate) && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-blue-200/30 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {editingCertificate ? "Edit Certificate" : "Add New Certificate"}
                    </CardTitle>
                    <CardDescription className="text-gray-900">
                      {editingCertificate ? "Update certificate information" : "Add a new certificate to your company"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white p-8">
                    <form className="space-y-8" onSubmit={handleSubmitCertificate}>
                      {/* Certificate Names */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name_en" className="text-sm font-semibold text-gray-700">Name (English) *</Label>
                          <Input
                            id="name_en"
                            name="name_en"
                            defaultValue={editingCertificate?.name_en || ""}
                            placeholder="Certificate name in English"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="name_ar" className="text-sm font-semibold text-gray-700">Name (Arabic) *</Label>
                          <Input
                            id="name_ar"
                            name="name_ar"
                            defaultValue={editingCertificate?.name_ar || ""}
                            placeholder="اسم الشهادة بالعربية"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 text-right"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="name_ro" className="text-sm font-semibold text-gray-700">Name (Romanian) *</Label>
                          <Input
                            id="name_ro"
                            name="name_ro"
                            defaultValue={editingCertificate?.name_ro || ""}
                            placeholder="Numele certificatului în română"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Certificate Descriptions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="description_en" className="text-sm font-semibold text-gray-700">Description (English)</Label>
                          <Textarea
                            id="description_en"
                            name="description_en"
                            defaultValue={editingCertificate?.description_en || ""}
                            placeholder="Certificate description in English"
                            rows={3}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 resize-none"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="description_ar" className="text-sm font-semibold text-gray-700">Description (Arabic)</Label>
                          <Textarea
                            id="description_ar"
                            name="description_ar"
                            defaultValue={editingCertificate?.description_ar || ""}
                            placeholder="وصف الشهادة بالعربية"
                            rows={3}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 resize-none text-right"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="description_ro" className="text-sm font-semibold text-gray-700">Description (Romanian)</Label>
                          <Textarea
                            id="description_ro"
                            name="description_ro"
                            defaultValue={editingCertificate?.description_ro || ""}
                            placeholder="Descrierea certificatului în română"
                            rows={3}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300 resize-none"
                          />
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="issued_date" className="text-sm font-semibold text-gray-700">Issued Date</Label>
                          <Input
                            id="issued_date"
                            name="issued_date"
                            type="date"
                            defaultValue={editingCertificate?.issued_date || ""}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="expiry_date" className="text-sm font-semibold text-gray-700">Expiry Date</Label>
                          <Input
                            id="expiry_date"
                            name="expiry_date"
                            type="date"
                            defaultValue={editingCertificate?.expiry_date || ""}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-900 transition-colors duration-300"
                          />
                        </div>
                      </div>

                      {/* Certificate Image */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">Certificate Image</Label>
                        <input type="hidden" name="image_url" value={editingCertificate?.image_url || ""} />
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50">
                          <ImageUpload
                            value={editingCertificate?.image_url || ""}
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
                            setEditingCertificate(null)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                          {editingCertificate ? "Update Certificate" : "Add Certificate"}
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