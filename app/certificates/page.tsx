"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Globe, Shield, CheckCircle, Cpu, Lock, Cloud, Zap } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

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

// Ensure image URL points to the public uploads folder
function normalizeImageUrl(url?: string) {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  let u = url.startsWith('/') ? url : `/${url}`
  if (u.startsWith('/images/')) {
    u = u.replace('/images/', '/uploads/')
  }
  return u
}

// Translation texts for the entire page
const translations = {
  en: {
    headerTitle: "Our Certifications & Accreditations",
    headerDescription: "TECH INNOVATION is committed to maintaining the highest standards of quality, security, and technological excellence through internationally recognized certifications.",
    sectionTitle: "Quality & Security Certifications",
    sectionDescription: "Our certifications demonstrate our commitment to excellence and compliance with international standards in software development, cybersecurity, and technology services.",
    noCertificatesTitle: "No Certificates Available",
    noCertificatesDescription: "Certificates will be displayed here once they are added.",
    expired: "Expired",
    expiringSoon: "Expiring Soon",
    valid: "Valid",
    issued: "Issued",
    expires: "Expires",
    certificateExpired: "Certificate Expired",
    expiresSoonText: "Expires Soon",
    validCertificate: "Valid Certificate",
    totalCertifications: "Total Certifications",
    validCertificates: "Valid Certificates",
    expiringSoonCount: "Expiring Soon",
    footerTitle: "Trusted by International Technology Standards",
    footerDescription: "Our certifications ensure that we meet the highest international standards for quality, security, and technological innovation in all our solutions.",
    loading: "Loading certificates...",
    errorTitle: "Error Loading Certificates",
    securityStandards: "Security Standards",
    qualityAssurance: "Quality Assurance",
    technologyExcellence: "Technology Excellence"
  },
  ar: {
    headerTitle: "شهاداتنا واعتماداتنا",
    headerDescription: "تلتزم TECH INNOVATION بالحفاظ على أعلى معايير الجودة والأمان والتميز التكنولوجي من خلال الشهادات المعترف بها دولياً.",
    sectionTitle: "شهادات الجودة والأمان",
    sectionDescription: "تُظهر شهاداتنا التزامنا بالتميز والامتثال للمعايير الدولية في مجال تطوير البرمجيات والأمن السيبراني والخدمات التكنولوجية.",
    noCertificatesTitle: "لا توجد شهادات متاحة",
    noCertificatesDescription: "سيتم عرض الشهادات هنا بمجرد إضافتها.",
    expired: "منتهية الصلاحية",
    expiringSoon: "تنتهي قريباً",
    valid: "سارية",
    issued: "تاريخ الإصدار",
    expires: "تاريخ الانتهاء",
    certificateExpired: "شهادة منتهية الصلاحية",
    expiresSoonText: "تنتهي قريباً",
    validCertificate: "شهادة سارية",
    totalCertifications: "إجمالي الشهادات",
    validCertificates: "شهادات سارية",
    expiringSoonCount: "تنتهي قريباً",
    footerTitle: "موثوق بها من قبل المعايير التكنولوجية الدولية",
    footerDescription: "تضمن شهاداتنا أننا نلبي أعلى المعايير الدولية للجودة والأمان والابتكار التكنولوجي في جميع حلولنا.",
    loading: "جاري تحميل الشهادات...",
    errorTitle: "خطأ في تحميل الشهادات",
    securityStandards: "معايير الأمان",
    qualityAssurance: "ضمان الجودة",
    technologyExcellence: "التميز التكنولوجي"
  },
  ro: {
    headerTitle: "Certificările și Acreditările Noastre",
    headerDescription: "TECH INNOVATION se angajează să mențină cele mai înalte standarde de calitate, securitate și excelență tehnologică prin certificări recunoscute la nivel internațional.",
    sectionTitle: "Certificări de Calitate și Securitate",
    sectionDescription: "Certificările noastre demonstrează angajamentul nostru față de excelență și conformitatea cu standardele internaționale în dezvoltarea de software, securitatea cibernetică și serviciile tehnologice.",
    noCertificatesTitle: "Niciun certificat disponibil",
    noCertificatesDescription: "Certificatele vor fi afișate aici odată ce sunt adăugate.",
    expired: "Expirat",
    expiringSoon: "Expiră în Curând",
    valid: "Valid",
    issued: "Emis",
    expires: "Expiră",
    certificateExpired: "Certificat Expirat",
    expiresSoonText: "Expiră în Curând",
    validCertificate: "Certificat Valid",
    totalCertifications: "Total Certificări",
    validCertificates: "Certificări Valide",
    expiringSoonCount: "Expiră în Curând",
    footerTitle: "De Încredere prin Standarde Tehnologice Internaționale",
    footerDescription: "Certificările noastre asigură că îndeplinim cele mai înalte standarde internaționale pentru calitate, securitate și inovație tehnologică în toate soluțiile noastre.",
    loading: "Se încarcă certificatele...",
    errorTitle: "Eroare la încărcarea certificatelor",
    securityStandards: "Standarde de Securitate",
    qualityAssurance: "Asigurarea Calității",
    technologyExcellence: "Excelență Tehnologică"
  }
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // استخدام useLanguage hook
  const { t, language } = useLanguage()

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await fetch('/api/certificates')
        if (response.ok) {
          const data = await response.json()
          setCertificates(data)
        } else {
          console.error('Failed to load certificates')
          setError('Failed to load certificates')
        }
      } catch (error) {
        console.error('Error loading certificates:', error)
        setError('Error loading certificates')
      } finally {
        setIsLoading(false)
      }
    }

    loadCertificates()
  }, [])

  // Helper functions
  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const isExpiringSoon = (expiryDate: string) => {
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return new Date(expiryDate) <= threeMonthsFromNow && new Date(expiryDate) > new Date()
  }

  const formatDate = (dateString: string) => {
    const locales = {
      en: 'en-US',
      ar: 'ar-EG',
      ro: 'ro-RO'
    }
    return new Date(dateString).toLocaleDateString(locales[language], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get certificate name based on language
  const getCertificateName = (certificate: Certificate) => {
    switch (language) {
      case 'ar': return certificate.name_ar
      case 'ro': return certificate.name_ro
      default: return certificate.name_en
    }
  }

  // Get certificate description based on language
  const getCertificateDescription = (certificate: Certificate) => {
    switch (language) {
      case 'ar': return certificate.description_ar
      case 'ro': return certificate.description_ro
      default: return certificate.description_en
    }
  }

  const pageTranslations = translations[language]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{pageTranslations.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{pageTranslations.errorTitle}</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-900/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Award className="h-10 w-10 text-white" />
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

      {/* Certificates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {certificates.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-200/30">
              <Award className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{pageTranslations.noCertificatesTitle}</h3>
            <p className="text-gray-600">{pageTranslations.noCertificatesDescription}</p>
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
              {certificates.map((certificate) => (
                <Card key={certificate.id} className="group hover:shadow-2xl transition-all duration-500 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden hover:-translate-y-2">
                  <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-200/50">
                          <Shield className="h-5 w-5 text-blue-900" />
                        </div>
                        <Badge 
                          variant={isExpired(certificate.expiry_date) ? "destructive" : 
                                  isExpiringSoon(certificate.expiry_date) ? "secondary" : "default"}
                          className="text-xs bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/50"
                        >
                          {isExpired(certificate.expiry_date) ? pageTranslations.expired : 
                           isExpiringSoon(certificate.expiry_date) ? pageTranslations.expiringSoon : pageTranslations.valid}
                        </Badge>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-900" />
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors">
                      {getCertificateName(certificate)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 p-6">
                    {/* Certificate Image */}
                    {certificate.image_url && (
                      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200/30">
                        <Image
                          src={normalizeImageUrl(certificate.image_url) || '/placeholder.jpg'}
                          alt={getCertificateName(certificate)}
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
                      {getCertificateDescription(certificate)}
                    </p>

                    {/* Dates */}
                    <div className="space-y-2 pt-4 border-t border-gray-200/50">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-semibold">{pageTranslations.issued}:</span>
                        <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'}`}>{formatDate(certificate.issued_date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-semibold">{pageTranslations.expires}:</span>
                        <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'}`}>{formatDate(certificate.expiry_date)}</span>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-center pt-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        isExpired(certificate.expiry_date) 
                          ? 'bg-red-100/80 text-red-900 border border-red-200/50' 
                          : isExpiringSoon(certificate.expiry_date)
                          ? 'bg-yellow-100/80 text-yellow-900 border border-yellow-200/50'
                          : 'bg-green-100/80 text-green-900 border border-green-200/50'
                      }`}>
                        {isExpired(certificate.expiry_date) ? (
                          <>
                            <div className="w-2 h-2 bg-red-900 rounded-full mr-2"></div>
                            {pageTranslations.certificateExpired}
                          </>
                        ) : isExpiringSoon(certificate.expiry_date) ? (
                          <>
                            <div className="w-2 h-2 bg-yellow-900 rounded-full mr-2"></div>
                            {pageTranslations.expiresSoonText}
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-green-900 rounded-full mr-2"></div>
                            {pageTranslations.validCertificate}
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-200/30 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                  <div className="text-3xl font-bold text-blue-900 mb-2">
                    {certificates.length}
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.totalCertifications}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50">
                  <div className="text-3xl font-bold text-green-900 mb-2">
                    {certificates.filter(c => !isExpired(c.expiry_date) && !isExpiringSoon(c.expiry_date)).length}
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.validCertificates}</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50">
                  <div className="text-3xl font-bold text-yellow-900 mb-2">
                    {certificates.filter(c => isExpiringSoon(c.expiry_date)).length}
                  </div>
                  <div className="text-gray-700 font-medium">{pageTranslations.expiringSoonCount}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <h3 className="text-2xl font-bold mb-4">
            {pageTranslations.footerTitle}
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            {pageTranslations.footerDescription}
          </p>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-white/80">{pageTranslations.securityStandards}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-white/80">{pageTranslations.qualityAssurance}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-white/80">{pageTranslations.technologyExcellence}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}