"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Phone, Mail, MapPin, Clock, MessageCircle, Cpu, Globe } from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-900 via-gray-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-800/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge 
            variant="secondary" 
            className="mb-4 animate-in fade-in delay-300 duration-700 bg-white/20 backdrop-blur-md border-white/30 text-white"
          >
            {t("contact.title")}
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom delay-500 duration-1000">
            {t("contact.heroTitle")}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom delay-700 duration-1000">
            {t("contact.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <Badge 
                variant="outline" 
                className="mb-4 animate-in fade-in delay-200 duration-600 bg-white/80 backdrop-blur-md border-blue-200"
              >
                {t("contact.contactFormTitle")}
              </Badge>
              <h2 className="text-3xl font-bold mb-6 animate-in fade-in slide-in-from-left delay-300 duration-800 text-gray-800">
                {t("contact.sendMessageTitle")}
              </h2>
              <Card className="hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-left delay-500 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="animate-in fade-in slide-in-from-right duration-1000">
              <Badge 
                variant="outline" 
                className="mb-4 animate-in fade-in delay-200 duration-600 bg-white/80 backdrop-blur-md border-purple-200"
              >
                {t("contact.contactInfoTitle")}
              </Badge>
              <h2 className="text-3xl font-bold mb-6 animate-in fade-in slide-in-from-right delay-300 duration-800 text-gray-800">
                {t("contact.contactDirectlyTitle")}
              </h2>

              <div className="space-y-6">
                <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-right delay-500 group border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-blue-900 transition-colors duration-300 text-gray-800">
                        {t("contact.phone")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{t("contact.callDirectly")}</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-800 hover:text-blue-900 transition-colors duration-300 cursor-pointer">
                        +971 123 456 789
                      </p>
                      <p className="font-semibold text-gray-800 hover:text-blue-900 transition-colors duration-300 cursor-pointer">
                        +971 987 654 321
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-right delay-600 group border border-purple-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-purple-900 transition-colors duration-300 text-gray-800">
                        {t("contact.email")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{t("contact.emailUs")}</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-gray-800 hover:text-purple-900 transition-colors duration-300 cursor-pointer">
                        info@techinnovation.com
                      </p>
                      <p className="font-semibold text-gray-800 hover:text-purple-900 transition-colors duration-300 cursor-pointer">
                        support@techinnovation.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-right delay-700 group border border-green-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-900 to-green-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-green-600 transition-colors duration-300 text-gray-800">
                        {t("contact.address")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{t("contact.mainOffice")}</p>
                    <p className="font-semibold text-gray-800 hover:text-green-900 transition-colors duration-300">
                      📍 Tech District, Dubai Internet City, UAE
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-right delay-800 group border border-orange-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-900 to-orange-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-orange-900 transition-colors duration-300 text-gray-800">
                        {t("contact.workingHours")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200 group/item">
                        <span className="text-gray-700 group-hover/item:text-gray-900">Sunday - Thursday</span>
                        <span className="font-semibold text-gray-900 group-hover/item:text-orange-900">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200 group/item">
                        <span className="text-gray-700 group-hover/item:text-gray-900">Friday</span>
                        <span className="font-semibold text-gray-900 group-hover/item:text-orange-900">Closed</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors duration-200 group/item">
                        <span className="text-gray-700 group-hover/item:text-gray-900">Saturday</span>
                        <span className="font-semibold text-gray-900 group-hover/item:text-orange-900">9:00 AM - 2:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Support Section
      <section className="py-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge 
              variant="outline" 
              className="mb-4 bg-white/80 backdrop-blur-md border-blue-200 text-blue-900"
            >
              Quick Support
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Need Immediate Assistance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our technical support team is ready to help you with any technology challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm">Get instant help from our tech experts</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-purple-200/30 bg-white/80 backdrop-blur-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-900 to-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Technical Support</h3>
                <p className="text-gray-600 text-sm">24/7 technical assistance for your systems</p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-green-200/30 bg-white/80 backdrop-blur-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-900 to-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Remote Assistance</h3>
                <p className="text-gray-600 text-sm">We can connect remotely to solve issues</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-800">
            <Badge 
              variant="outline" 
              className="mb-4 animate-in fade-in delay-200 duration-600 bg-white/80 backdrop-blur-md border-blue-200"
            >
              {t("contact.locationTitle")}
            </Badge>
            <h2 className="text-3xl font-bold mb-4 animate-in fade-in slide-in-from-bottom delay-300 duration-800 text-gray-800">
              {t("contact.visitUsTitle")}
            </h2>
            <p className="text-gray-600 animate-in fade-in slide-in-from-bottom delay-500 duration-800 max-w-2xl mx-auto">
              {t("contact.locationSubtitle")}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom delay-700 border border-blue-200/30">
  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden border-2 border-dashed border-blue-200/50 hover:from-blue-200 hover:to-purple-200 transition-all duration-300">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213393.7176996676!2d44.52071553994117!3d33.31157725954699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9deda9d2a3b16f2c!2z2KjYutiv2KfYr9iMINio2LrYr9in2K8g2YXYrdin2YHYuNip!5e0!3m2!1sar!2siq!4v1761961235690!5m2!1sar!2siq"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      // allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-xl"
    ></iframe>
  </div>

  <div className="text-center mt-4">
    <p className="text-gray-600 font-semibold">{t("contact.interactiveMap")}</p>
    <p className="text-gray-500 text-sm mt-2">Iraq - Baghdad</p>
  </div>
</div>

        </div>
      </section>

      <Footer />
    </div>
  )
}