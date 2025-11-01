"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Code, Cloud, Shield, Brain, Database, Smartphone, Server, ChevronRight, Globe, Award, TrendingUp, Cpu, Zap, Lock, Users } from "lucide-react"

export default function SolutionsPage() {
  const { language } = useLanguage()

  const solutions = [
    {
      icon: Code,
      title: language === "ar" ? "تطوير البرمجيات المخصصة" : "Custom Software Development",
      description: language === "ar" ? "حلول برمجية مصممة خصيصًا لتلبية احتياجات عملك الفريدة باستخدام أحدث التقنيات" : "Tailored software solutions designed to meet your unique business needs using the latest technologies",
      features: language === "ar" ? ["تطبيقات ويب متقدمة", "حلول الهواتف الذكية", "أنظمة إدارة متكاملة"] : ["Advanced web applications", "Mobile solutions", "Integrated management systems"]
    },
    {
      icon: Cloud,
      title: language === "ar" ? "الحلول السحابية" : "Cloud Solutions",
      description: language === "ar" ? "تحول سحابي آمن وقابل للتطوير مع بنية تحتية مرنة تنمو مع عملك" : "Secure and scalable cloud transformation with flexible infrastructure that grows with your business",
      features: language === "ar" ? ["هجرة سحابية", "بنية تحتية كخدمة", "إدارة وحوكمة"] : ["Cloud migration", "Infrastructure as a service", "Management & governance"]
    },
    {
      icon: Brain,
      title: language === "ar" ? "الذكاء الاصطناعي والتعلم الآلي" : "AI & Machine Learning",
      description: language === "ar" ? "استفد من قوة الذكاء الاصطناعي لتحسين عملياتك واتخاذ قرارات أكثر ذكاءً" : "Leverage AI power to optimize your operations and make smarter decisions",
      features: language === "ar" ? ["تحليلات تنبؤية", "معالجة اللغات الطبيعية", "رؤية حاسوبية"] : ["Predictive analytics", "Natural language processing", "Computer vision"]
    },
    {
      icon: Shield,
      title: language === "ar" ? "الأمن السيبراني" : "Cybersecurity",
      description: language === "ar" ? "حماية شاملة لبياناتك وأنظمتك من التهديدات الإلكترونية المتطورة" : "Comprehensive protection for your data and systems from advanced cyber threats",
      features: language === "ar" ? ["أمن الشبكات", "إدارة الهوية", "استجابة للحوادث"] : ["Network security", "Identity management", "Incident response"]
    },
    {
      icon: Database,
      title: language === "ar" ? "تحليلات البيانات الضخمة" : "Big Data Analytics",
      description: language === "ar" ? "تحويل البيانات إلى رؤى قابلة للتنفيذ لدفع النمو والابتكار في عملك" : "Transform data into actionable insights to drive growth and innovation in your business",
      features: language === "ar" ? ["مستودعات البيانات", "لوحات تحكم تفاعلية", "تقارير ذكية"] : ["Data warehousing", "Interactive dashboards", "Smart reporting"]
    },
    {
      icon: Smartphone,
      title: language === "ar" ? "حلول الجوال والويب" : "Mobile & Web Solutions",
      description: language === "ar" ? "تطبيقات ويب وجوال مبتكرة توفر تجربة مستخدم استثنائية عبر جميع المنصات" : "Innovative web and mobile applications delivering exceptional user experience across all platforms",
      features: language === "ar" ? ["تطبيقات هجينة", "تصميم متجاوب", "أداء فائق"] : ["Hybrid applications", "Responsive design", "High performance"]
    },
  ]

  const industries = [
    { name: language === "ar" ? "الرعاية الصحية" : "Healthcare", icon: "🏥" },
    { name: language === "ar" ? "التمويل" : "Finance", icon: "💳" },
    { name: language === "ar" ? "التجارة الإلكترونية" : "E-commerce", icon: "🛒" },
    { name: language === "ar" ? "التعليم" : "Education", icon: "🎓" },
    { name: language === "ar" ? "التصنيع" : "Manufacturing", icon: "🏭" },
    { name: language === "ar" ? "النقل" : "Transportation", icon: "🚚" },
    { name: language === "ar" ? "الطاقة" : "Energy", icon: "⚡" },
    { name: language === "ar" ? "التجزئة" : "Retail", icon: "🏪" },
    { name: language === "ar" ? "السياحة" : "Tourism", icon: "✈️" },
    { name: language === "ar" ? "العقارات" : "Real Estate", icon: "🏠" },
    { name: language === "ar" ? "الإعلام" : "Media", icon: "🎬" },
    { name: language === "ar" ? "الخدمات الحكومية" : "Government", icon: "🏛️" },
  ]

  const stats = [
    { icon: Globe, value: "50+", label: language === "ar" ? "دولة نخدمها" : "Countries Served" },
    { icon: Code, value: "500+", label: language === "ar" ? "مشروع مكتمل" : "Projects Completed" },
    { icon: Award, value: "98%", label: language === "ar" ? "رضا العملاء" : "Client Satisfaction" },
    { icon: TrendingUp, value: "15+", label: language === "ar" ? "سنة خبرة" : "Years Experience" },
  ]

  const processSteps = [
    {
      number: "01",
      title: language === "ar" ? "التحليل والتخطيط" : "Analysis & Planning",
      description: language === "ar" ? "نفهم احتياجاتك العميقة ونضع خطة استراتيجية شاملة لمشروعك" : "We understand your deep needs and create a comprehensive strategic plan for your project"
    },
    {
      number: "02",
      title: language === "ar" ? "التصميم والتطوير" : "Design & Development",
      description: language === "ar" ? "نصمم ونطور الحل الأمثل باستخدام أحدث التقنيات وأفضل الممارسات" : "We design and develop the optimal solution using latest technologies and best practices"
    },
    {
      number: "03",
      title: language === "ar" ? "الاختبار والجودة" : "Testing & Quality",
      description: language === "ar" ? "نضمن أعلى معايير الجودة من خلال اختبارات شاملة ومراجعات متعددة" : "We ensure highest quality standards through comprehensive testing and multiple reviews"
    },
    {
      number: "04",
      title: language === "ar" ? "النشر والدعم" : "Deployment & Support",
      description: language === "ar" ? "ننفذ الحل وندعمه بشكل مستمر لضمان استمرارية الأداء الأمثل" : "We deploy the solution and provide continuous support to ensure optimal performance"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-gray-900 to-indigo-700 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
            {language === "ar" ? "حلولنا التكنولوجية" : "Our Technology Solutions"}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom delay-300 duration-1000">
            {language === "ar"
              ? "حلول تكنولوجية متقدمة تدفع تحولك الرقمي وتحدث ثورة في طريقة عملك"
              : "Advanced technology solutions that drive your digital transformation and revolutionize your business operations"}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-xl border-b border-blue-200/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-gray-900 rounded-2xl flex items-center justify-center group-hover:from-blue-900 group-hover:to-gray-700 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-900 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section - Enhanced */}
      <section id="solutions" className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-blue-200/30">
              <span className="text-sm font-bold text-blue-900">{language === "ar" ? "ماذا نقدم" : "What We Offer"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "حلولنا المتكاملة" : "Our Integrated Solutions"}
            </h2>
            <p className="text-xl text-gray-900 max-w-2xl mx-auto">
              {language === "ar" ? "حلول شاملة لجميع احتياجاتك التكنولوجية" : "Comprehensive solutions for all your technology needs"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-blue-200/30 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-gray-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <ChevronRight className="w-4 h-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-900 transition-colors duration-300 mb-2">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-900 mb-4 leading-relaxed">
                      {solution.description}
                    </CardDescription>
                    <div className="space-y-2 pt-4 border-t border-gray-200/50">
                      {solution.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industries Section - Enhanced */}
      <section className="py-24 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200/30">
              <span className="text-sm font-bold text-gray-900">
                {language === "ar" ? "قطاعاتنا" : "Our Industries"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "نخدم قطاعات متعددة" : "Serving Multiple Industries"}
            </h2>
            <p className="text-xl text-gray-900">
              {language === "ar"
                ? "خبرة واسعة في تقديم حلول تكنولوجية لمختلف القطاعات"
                : "Extensive experience in delivering technology solutions across various sectors"}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl text-center shadow-sm hover:shadow-xl hover:-translate-y-2 border border-blue-200/30 hover:border-blue-300/50 transition-all duration-500 cursor-pointer"
              >
                <div
                  className="text-4xl mb-3 transition-all duration-500 
                             group-hover:scale-110 group-hover:rotate-12"
                >
                  {industry.icon}
                </div>
                <span className="font-semibold text-gray-800 group-hover:text-blue-900 transition-colors text-sm">
                  {industry.name}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-900 text-lg">
              {language === "ar" ? "وغيرها من القطاعات المتخصصة..." : "And other specialized sectors..."}
            </p>
          </div>
        </div>
      </section>

      {/* Process Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-blue-50/50 via-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-md rounded-full border border-green-200/30">
              <span className="text-sm font-bold text-green-900">{language === "ar" ? "كيف نعمل" : "How We Work"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "عملية تطوير مضمونة" : "Guaranteed Development Process"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-gray-200 to-blue-200"></div>

            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-blue-200/30 hover:border-blue-300/50 h-full">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-gray-900 rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <span className="text-3xl font-bold text-white">{step.number}</span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-900 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-300 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gray-300 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">
            {language === "ar" ? "ابدأ رحلتك الرقمية معنا" : "Start Your Digital Journey With Us"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {language === "ar" ? "احصل على استشارة مجانية وتقييم لمشروعك التكنولوجي" : "Get a free consultation and assessment for your technology project"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              {language === "ar" ? "احصل على استشارة مجانية" : "Get Free Consultation"}
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              {language === "ar" ? "عرض مشروعك" : "Present Your Project"}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}