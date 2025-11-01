"use client"

import Image from "next/image"
import { Eye, Target, Trophy, Users, Lightbulb, Code, Cloud, Shield, Brain } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

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

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const response = await fetch('/api/team')
        if (response.ok) {
          const data = await response.json()
          setTeamMembers(data)
        } else {
          console.error('Failed to load team members')
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

  const getLocalizedContent = (member: TeamMember, field: 'name' | 'position' | 'bio') => {
    switch (language) {
      case 'ar':
        return member[`${field}_ar` as keyof TeamMember] as string
      case 'ro':
        return member[`${field}_ro` as keyof TeamMember] as string
      default:
        return member[`${field}_en` as keyof TeamMember] as string
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br text-white relative overflow-hidden" style={{
  background: "linear-gradient(135deg, #0A0F2B 0%, #172A4E 50%, #2A4F7F 100%)",
}}
>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-900/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-800/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge 
            variant="secondary" 
            className="mb-4 animate-in fade-in delay-300 duration-700 bg-white/20 backdrop-blur-md border-white/30 text-white"
          >
            {t("nav.about")}
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom delay-500 duration-1000">
            {t("about.title")}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom delay-700 duration-1000">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <Badge 
                variant="outline" 
                className="mb-4 animate-in fade-in delay-200 duration-600 bg-white/80 backdrop-blur-md border-blue-200"
              >
                {t("about.storyTitle")}
              </Badge>
              <h2 className="text-4xl font-bold mb-6 animate-in fade-in slide-in-from-left delay-300 duration-800">
                {t("about.description")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="animate-in fade-in slide-in-from-left delay-500 duration-700">
                  {t("about.storyDesc1")}
                </p>
                <p className="animate-in fade-in slide-in-from-left delay-700 duration-700">
                  {t("about.storyDesc2")}
                </p>
                <p className="animate-in fade-in slide-in-from-left delay-900 duration-700">
                  {t("about.storyDesc3")}
                </p>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-300">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-blue-200/30 shadow-2xl">
                <Image
                  src="/tech-company.png"
                  alt="Modern technology company office with developers working on innovative projects"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full animate-pulse delay-500 backdrop-blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-100 rounded-full animate-bounce delay-1000 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-800">
            <Badge
              variant="outline"
              className="mb-4 animate-in fade-in delay-200 duration-600 border border-blue-400/50 text-white bg-blue-500/20 backdrop-blur-md"
            >
              {t("about.visionMissionTitle")}
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-white animate-in fade-in slide-in-from-bottom delay-300 duration-800">
              {t("about.whatWeBelieveTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-left delay-100 
                            border border-blue-400/30 bg-blue-500/10 backdrop-blur-xl 
                            hover:bg-blue-500/20 hover:border-blue-400/50 rounded-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 
                                group-hover:scale-110 transition-all duration-300 shadow-2xl backdrop-blur-sm">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-blue-100 transition-colors duration-300">
                  {t("about.visionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100/90 leading-relaxed text-lg">{t("about.visionDesc")}</p>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-right delay-200 
                            border border-purple-400/30 bg-purple-500/10 backdrop-blur-xl 
                            hover:bg-purple-500/20 hover:border-purple-400/50 rounded-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 
                                group-hover:scale-110 transition-all duration-300 shadow-2xl backdrop-blur-sm">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-purple-100 transition-colors duration-300">
                  {t("about.missionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100/90 leading-relaxed text-lg">{t("about.missionDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-800">
            <Badge 
              variant="outline" 
              className="mb-4 animate-in fade-in delay-200 duration-600 bg-white/80 backdrop-blur-md border-blue-200"
            >
              {t("about.valuesTitle")}
            </Badge>
            <h2 className="text-4xl font-bold mb-4 animate-in fade-in slide-in-from-bottom delay-300 duration-800">
              {t("about.valuesTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom delay-500 duration-800">
              {t("about.valuesSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-in fade-in slide-in-from-bottom delay-100 duration-700 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  {t("about.innovationTitle")}
                </h3>
                <p className="text-gray-600">{t("about.innovationDesc")}</p>
              </div>
            </div>

            <div className="text-center animate-in fade-in slide-in-from-bottom delay-200 duration-700 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-green-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  {t("about.excellenceTitle")}
                </h3>
                <p className="text-gray-600">{t("about.excellenceDesc")}</p>
              </div>
            </div>

            <div className="text-center animate-in fade-in slide-in-from-bottom delay-300 duration-700 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-purple-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-800  rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  {t("about.integrityTitle")}
                </h3>
                <p className="text-gray-600">{t("about.integrityDesc")}</p>
              </div>
            </div>

            <div className="text-center animate-in fade-in slide-in-from-bottom delay-400 duration-700 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-orange-200/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-800  rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                  Collaboration
                </h3>
                <p className="text-gray-600">Working together to achieve extraordinary results</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {!isLoading && teamMembers.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-800">
              <Badge 
                variant="outline" 
                className="mb-4 animate-in fade-in delay-200 duration-600 bg-white/80 backdrop-blur-md border-blue-200"
              >
                {t("about.teamTitle")}
              </Badge>
              <h2 className="text-4xl font-bold mb-4 animate-in fade-in slide-in-from-bottom delay-300 duration-800">
                {t("about.teamTitle")}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom delay-500 duration-800">
                {t("about.teamSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card 
                  key={member.id} 
                  className="text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom group
                            bg-white/80 backdrop-blur-md border border-blue-200/30 rounded-2xl overflow-hidden"
                >
                  <CardHeader>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-800  rounded-full w-32 h-32 mx-auto mb-4 p-1">
                     <Image
  src={member?.image_url && member.image_url.trim() !== "" ? member.image_url : "../logo.png"}
  alt={ "Member"}
  width={100}
  height={100}
  className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
/>

                    </div>
                    <CardTitle className="group-hover:text-blue-600 transition-colors duration-300">
                      {getLocalizedContent(member, 'name')}
                    </CardTitle>
                    <p className="text-gray-600">{getLocalizedContent(member, 'position')}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{getLocalizedContent(member, 'bio')}</p>
                    <div className="mt-2 text-xs text-blue-600 font-semibold">
                      {member.experience_years}+ years tech experience
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}