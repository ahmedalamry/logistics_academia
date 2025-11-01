"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Cloud, Shield, Brain, Database, Smartphone, Server, ArrowRight, CheckCircle, Cpu } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

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

// Ensure image URL points to the public uploads folder and normalize legacy /images/ paths
function normalizeImageUrl(url?: string) {
  if (!url) return undefined
  // If already an absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  // Ensure leading slash
  let u = url.startsWith('/') ? url : `/${url}`
  // Map legacy /images/* to /uploads/* (admin uploads are stored in public/uploads)
  if (u.startsWith('/images/')) {
    u = u.replace('/images/', '/uploads/')
  }
  return u
}

const serviceIcons = {
  Code: <Code className="h-8 w-8 text-gray-600" />,
  Cloud: <Cloud className="h-8 w-8 text-gray-600" />,
  Shield: <Shield className="h-8 w-8 text-gray-600" />,
  Brain: <Brain className="h-8 w-8 text-gray-600" />,
  Database: <Database className="h-8 w-8 text-gray-600" />,
  Smartphone: <Smartphone className="h-8 w-8 text-gray-600" />,
  Server: <Server className="h-8 w-8 text-gray-600" />,
  Cpu: <Cpu className="h-8 w-8 text-gray-600" />,
}

// Translation texts for the entire page
const translations = {
  en: {
    headerTitle: "Our Technology Services",
    headerDescription: "TECH INNOVATION provides comprehensive technology solutions tailored to meet your business needs with the highest standards of quality and innovation.",
    sectionTitle: "Advanced Technology Solutions",
    sectionDescription: "From software development to AI solutions, we provide end-to-end technology services that ensure your digital transformation success.",
    noServicesTitle: "No Services Available",
    noServicesDescription: "Services will be displayed here once they are added.",
    available: "Available",
    professionalService: "Expert Development",
    support24: "24/7 Support",
    globalNetwork: "Latest Technologies",
    learnMore: "Learn More",
    totalServices: "Total Services",
    countriesServed: "Countries Served",
    happyClients: "Happy Clients",
    yearsExperience: "Years Experience",
    readyTitle: "Ready to Transform Your Business?",
    readyDescription: "Contact us today to discuss your technology needs and get a customized solution that fits your business requirements.",
    getQuote: "Get Quote",
    contactUs: "Contact Us",
    loading: "Loading services...",
    errorTitle: "Error Loading Services",
    features: "Key Features",
    secureInfrastructure: "Secure Infrastructure",
    scalableSolutions: "Scalable Solutions",
    innovativeApproach: "Innovative Approach"
  },
  ar: {
    headerTitle: "خدماتنا التكنولوجية",
    headerDescription: "تقدم TECH INNOVATION حلولاً تكنولوجية شاملة مصممة لتلبية احتياجات عملك بأعلى معايير الجودة والابتكار.",
    sectionTitle: "حلول تكنولوجية متقدمة",
    sectionDescription: "من تطوير البرمجيات إلى حلول الذكاء الاصطناعي، نقدم خدمات تكنولوجية متكاملة تضمن نجاح تحولك الرقمي.",
    noServicesTitle: "لا توجد خدمات متاحة",
    noServicesDescription: "سيتم عرض الخدمات هنا بمجرد إضافتها.",
    available: "متاح",
    professionalService: "تطوير احترافي",
    support24: "دعم على مدار الساعة",
    globalNetwork: "أحدث التقنيات",
    learnMore: "تعرف على المزيد",
    totalServices: "إجمالي الخدمات",
    countriesServed: "دولة تمت خدمتها",
    happyClients: "عميل سعيد",
    yearsExperience: "سنوات الخبرة",
    readyTitle: "مستعد لتحويل عملك؟",
    readyDescription: "اتصل بنا اليوم لمناقشة احتياجاتك التكنولوجية والحصول على حل مخصص يناسب متطلبات عملك.",
    getQuote: "احصل على عرض سعر",
    contactUs: "اتصل بنا",
    loading: "جاري تحميل الخدمات...",
    errorTitle: "خطأ في تحميل الخدمات",
    features: "الميزات الرئيسية",
    secureInfrastructure: "بنية تحتية آمنة",
    scalableSolutions: "حلول قابلة للتطوير",
    innovativeApproach: "نهج مبتكر"
  },
  ro: {
    headerTitle: "Serviciile Noastre Tehnologice",
    headerDescription: "TECH INNOVATION oferă soluții tehnologice complete, adaptate nevoilor afacerii dumneavoastră, cu cele mai înalte standarde de calitate și inovație.",
    sectionTitle: "Soluții Tehnologice Avansate",
    sectionDescription: "De la dezvoltarea de software la soluții AI, oferim servicii tehnologice complete care asigură succesul transformării digitale.",
    noServicesTitle: "Niciun serviciu disponibil",
    noServicesDescription: "Serviciile vor fi afișate aici odată ce sunt adăugate.",
    available: "Disponibil",
    professionalService: "Dezvoltare Expertă",
    support24: "Suport 24/7",
    globalNetwork: "Cele Mai Noi Tehnologii",
    learnMore: "Află Mai Mult",
    totalServices: "Total Servicii",
    countriesServed: "Țări Deservite",
    happyClients: "Clienți Fericiți",
    yearsExperience: "Ani Experiență",
    readyTitle: "Gata să vă transformați afacerea?",
    readyDescription: "Contactați-ne astăzi pentru a discuta nevoile dvs. tehnologice și pentru a obține o soluție personalizată care se potrivește cerințelor afacerii dvs.",
    getQuote: "Solicită Ofertă",
    contactUs: "Contactează-ne",
    loading: "Se încarcă serviciile...",
    errorTitle: "Eroare la încărcarea serviciilor",
    features: "Caracteristici Principale",
    secureInfrastructure: "Infrastructură Securizată",
    scalableSolutions: "Soluții Scalabile",
    innovativeApproach: "Abordare Inovatoare"
  }
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // استخدام useLanguage hook للحصول على اللغة الحالية
  const { t, language } = useLanguage()

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        } else {
          console.error('Failed to load services')
          setError('Failed to load services')
        }
      } catch (error) {
        console.error('Error loading services:', error)
        setError('Error loading services')
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  // Helper function to get service name based on current language
  const getServiceName = (service: Service) => {
    switch (language) {
      case 'ar': return service.name_ar
      case 'ro': return service.name_ro
      default: return service.name_en
    }
  }

  // Helper function to get service description based on current language
  const getServiceDescription = (service: Service) => {
    switch (language) {
      case 'ar': return service.description_ar
      case 'ro': return service.description_ro
      default: return service.description_en
    }
  }

  // الحصول على الترجمات بناءً على اللغة الحالية
  const pageTranslations = translations[language]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{pageTranslations.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{pageTranslations.errorTitle}</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-900 to-gray-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-3 left-0 w-72 h-72 bg-gray-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-10">
              <div className="w-20 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                {/* <Cpu className="h-10 w-10 text-white" /> */}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageTranslations.headerTitle}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {pageTranslations.headerDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {services.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-200/30">
              <Cpu className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{pageTranslations.noServicesTitle}</h3>
            <p className="text-gray-600">{pageTranslations.noServicesDescription}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {pageTranslations.sectionTitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {pageTranslations.sectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 border border-gray-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden hover:-translate-y-2">
                  <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-50 border-b border-gray-200/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-200/50">
                          {serviceIcons[service.icon as keyof typeof serviceIcons] || <Code className="h-6 w-6 text-gray-600" />}
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-gray-200 backdrop-blur-sm">
                          {pageTranslations.available}
                        </Badge>
                      </div>
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
                      {getServiceName(service)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 p-6">
                    {/* Service Image */}
                    {service.image_url && (
                      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-100 border border-gray-200/30">
                        <Image
                          src={normalizeImageUrl(service.image_url) || '/placeholder.jpg'}
                          alt={getServiceName(service)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {getServiceDescription(service)}
                    </p>

                    {/* Service Features */}
                    <div className="space-y-3 pt-4 border-t border-gray-200/50">
                      <h4 className="text-sm font-semibold text-gray-800">{pageTranslations.features}</h4>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{pageTranslations.professionalService}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{pageTranslations.secureInfrastructure}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{pageTranslations.scalableSolutions}</span>
                      </div>
                    </div>

            
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/30 p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-bold text-gray-600 mb-2">
                    {services.length}
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.totalServices}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-bold text-gray-600 mb-2">
                    50+
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.countriesServed}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.happyClients}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    15+
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.yearsExperience}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gray-300 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-300 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">
            {pageTranslations.readyTitle}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {pageTranslations.readyDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              {pageTranslations.getQuote}
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-600 transition-all duration-300"
            >
              {pageTranslations.contactUs}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}