"use client"

import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Edit, Trash2, Users, Mail, Phone, Linkedin, Eye, X, Briefcase, Calendar } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"
import Image from "next/image"

interface TeamMember {
  id: string
  name_en: string
  name_ar: string
  name_ro: string
  position_en: string
  position_ar: string
  position_ro: string
  bio_en: string
  bio_ar: string
  bio_ro: string
  email: string
  phone: string
  image_url: string
  linkedin_url: string
  experience_years: number
  created_at: string
  updated_at: string
}

export default function AdminTeamPage() {
  const { isAuthenticated, loading } = useAdmin()
  const router = useRouter()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const response = await fetch('/api/team')
        if (response.ok) {
          const data = await response.json()
          setTeamMembers(data)
        } else {
          console.error('Failed to load team members from database')
          setTeamMembers([])
        }
      } catch (error) {
        console.error('Error loading team members:', error)
        setTeamMembers([])
      } finally {
        setIsLoading(false)
      }
    }

    loadTeamMembers()
  }, [])

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team members...</p>
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

  const handleAddMember = () => {
    setShowAddForm(true)
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
  }

  const handleDeleteMember = async (memberId: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        const response = await fetch('/api/delete-team-member/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: memberId })
        })
        
        if (response.ok) {
          setTeamMembers(teamMembers.filter(m => m.id !== memberId))
          console.log("Team member deleted:", memberId)
          alert("Team member deleted successfully!")
        } else {
          const errorData = await response.json()
          console.error('Failed to delete team member:', errorData)
          alert(`Failed to delete team member: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error deleting team member:', error)
        alert("Error deleting team member. Please try again.")
      }
    }
  }

  const handleSubmitTeamMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const memberData = {
      name_en: formData.get('name_en') as string,
      name_ar: formData.get('name_ar') as string,
      name_ro: formData.get('name_ro') as string,
      position_en: formData.get('position_en') as string,
      position_ar: formData.get('position_ar') as string,
      position_ro: formData.get('position_ro') as string,
      bio_en: formData.get('bio_en') as string,
      bio_ar: formData.get('bio_ar') as string,
      bio_ro: formData.get('bio_ro') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      experience_years: parseInt(formData.get('experience_years') as string),
      image_url: formData.get('image_url') as string,
      linkedin_url: formData.get('linkedin_url') as string,
    }

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      })

      if (response.ok) {
        const newMember = await response.json()
        setTeamMembers([...teamMembers, newMember])
        setShowAddForm(false)
        setEditingMember(null)
        alert('Team member added successfully!')
      } else {
        alert('Failed to add team member. Please try again.')
      }
    } catch (error) {
      console.error('Error adding team member:', error)
      alert('Error adding team member. Please try again.')
    }
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
              onClick={handleAddMember}
              className="bg-gradient-to-r"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card 
                key={member.id} 
                className="hover:shadow-xl transition-all duration-500 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden hover:-translate-y-2 group"
              >
                <CardContent className="p-0">
                  {/* Member Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                          <Users className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {member.name_en}
                      </h3>
                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditMember(member)}
                          className="h-6 w-6 p-0 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id)}
                          className="h-6 w-6 p-0 border-red-200 hover:bg-red-50 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600 line-clamp-1">{member.position_en}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{member.experience_years}+ years</span>
                      </div>
                    </div>

                    {/* View More Button */}
                    <Button
                      onClick={() => setSelectedMember(member)}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                    >
                      <Eye className="h-3 w-3 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Member Details Modal */}
          {selectedMember && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-blue-200/30 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <span>{selectedMember.name_en}</span>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMember(null)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Member Image */}
                    {selectedMember.image_url && (
                      <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/30">
                        <Image
                          src={selectedMember.image_url}
                          alt={selectedMember.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Member Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* English */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Name</Label>
                          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-200">
                            <p className="text-sm font-medium text-gray-900">{selectedMember.name_en}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Position</Label>
                          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-200">
                            <p className="text-sm font-medium text-gray-900">{selectedMember.position_en}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">English Bio</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedMember.bio_en}</p>
                          </div>
                        </div>
                      </div>

                      {/* Arabic */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Name</Label>
                          <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                            <p className="text-sm font-medium text-gray-900 text-right" dir="rtl">{selectedMember.name_ar}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Position</Label>
                          <div className="bg-green-50/50 rounded-lg p-3 border border-green-200">
                            <p className="text-sm font-medium text-gray-900 text-right" dir="rtl">{selectedMember.position_ar}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Arabic Bio</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed text-right" dir="rtl">{selectedMember.bio_ar}</p>
                          </div>
                        </div>
                      </div>

                      {/* Romanian */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Name</Label>
                          <div className="bg-purple-50/50 rounded-lg p-3 border border-purple-200">
                            <p className="text-sm font-medium text-gray-900">{selectedMember.name_ro}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Position</Label>
                          <div className="bg-purple-50/50 rounded-lg p-3 border border-purple-200">
                            <p className="text-sm font-medium text-gray-900">{selectedMember.position_ro}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Romanian Bio</Label>
                          <div className="bg-gray-50/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedMember.bio_ro}</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact & Experience */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Contact Information</Label>
                          <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-200 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-orange-600" />
                              <span className="text-sm text-gray-700">{selectedMember.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-orange-600" />
                              <span className="text-sm text-gray-700">{selectedMember.phone}</span>
                            </div>
                            {selectedMember.linkedin_url && (
                              <div className="flex items-center space-x-2">
                                <Linkedin className="h-4 w-4 text-blue-600" />
                                <a 
                                  href={selectedMember.linkedin_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  LinkedIn Profile
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Experience</Label>
                          <div className="bg-yellow-50/50 rounded-lg p-3 border border-yellow-200">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-gray-900">
                                {selectedMember.experience_years}+ years of experience
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
                        onClick={() => setSelectedMember(null)}
                        className="border-gray-300 hover:border-gray-400"
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingMember(selectedMember)
                          setSelectedMember(null)
                        }}
                        className="bg-gradient-to-r "
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Member
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Add/Edit Team Member Form */}
          {(showAddForm || editingMember) && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <Card className="w-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-blue-200/30 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {editingMember ? "Edit Team Member" : "Add New Team Member"}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {editingMember ? "Update team member information" : "Add a new technology expert to your team"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-white p-8">
                    <form className="space-y-8" onSubmit={handleSubmitTeamMember}>
                      {/* Member Names */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name_en" className="text-sm font-semibold text-gray-700">Name (English) *</Label>
                          <Input
                            id="name_en"
                            name="name_en"
                            defaultValue={editingMember?.name_en || ""}
                            placeholder="Full name in English"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="name_ar" className="text-sm font-semibold text-gray-700">Name (Arabic) *</Label>
                          <Input
                            id="name_ar"
                            name="name_ar"
                            defaultValue={editingMember?.name_ar || ""}
                            placeholder="الاسم الكامل بالعربية"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300 text-right"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="name_ro" className="text-sm font-semibold text-gray-700">Name (Romanian) *</Label>
                          <Input
                            id="name_ro"
                            name="name_ro"
                            defaultValue={editingMember?.name_ro || ""}
                            placeholder="Numele complet în română"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Member Positions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="position_en" className="text-sm font-semibold text-gray-700">Position (English) *</Label>
                          <Input
                            id="position_en"
                            name="position_en"
                            defaultValue={editingMember?.position_en || ""}
                            placeholder="Job title in English"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="position_ar" className="text-sm font-semibold text-gray-700">Position (Arabic) *</Label>
                          <Input
                            id="position_ar"
                            name="position_ar"
                            defaultValue={editingMember?.position_ar || ""}
                            placeholder="المسمى الوظيفي بالعربية"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300 text-right"
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="position_ro" className="text-sm font-semibold text-gray-700">Position (Romanian) *</Label>
                          <Input
                            id="position_ro"
                            name="position_ro"
                            defaultValue={editingMember?.position_ro || ""}
                            placeholder="Titlul postului în română"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Member Bios */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="bio_en" className="text-sm font-semibold text-gray-700">Bio (English)</Label>
                          <Textarea
                            id="bio_en"
                            name="bio_en"
                            defaultValue={editingMember?.bio_en || ""}
                            placeholder="Professional bio in English"
                            rows={3}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300 resize-none"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="bio_ar" className="text-sm font-semibold text-gray-700">Bio (Arabic)</Label>
                          <Textarea
                            id="bio_ar"
                            name="bio_ar"
                            defaultValue={editingMember?.bio_ar || ""}
                            placeholder="السيرة المهنية بالعربية"
                            rows={3}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300 resize-none text-right"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="bio_ro" className="text-sm font-semibold text-gray-700">Bio (Romanian)</Label>
                          <Textarea
                            id="bio_ro"
                            name="bio_ro"
                            defaultValue={editingMember?.bio_ro || ""}
                            placeholder="Biografia profesională în română"
                            rows={3}
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300 resize-none"
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={editingMember?.email || ""}
                            placeholder="email@company.com"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            defaultValue={editingMember?.phone || ""}
                            placeholder="+40 123 456 789"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                          />
                        </div>
                      </div>

                      {/* Experience & Image */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="experience_years" className="text-sm font-semibold text-gray-700">Experience (Years)</Label>
                          <Input
                            id="experience_years"
                            name="experience_years"
                            type="number"
                            defaultValue={editingMember?.experience_years || ""}
                            placeholder="5"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="linkedin_url" className="text-sm font-semibold text-gray-700">LinkedIn URL</Label>
                          <Input
                            id="linkedin_url"
                            name="linkedin_url"
                            defaultValue={editingMember?.linkedin_url || ""}
                            placeholder="https://linkedin.com/in/username"
                            className="border-2 border-gray-300 rounded-xl focus:border-blue-500 transition-colors duration-300"
                          />
                        </div>
                      </div>

                      {/* Member Image */}
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold text-gray-700">Profile Image</Label>
                        <input type="hidden" name="image_url" value={editingMember?.image_url || ""} />
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50">
                          <ImageUpload
                            value={editingMember?.image_url || ""}
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
                            setEditingMember(null)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                        >
                          {editingMember ? "Update Member" : "Add Member"}
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