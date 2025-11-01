import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
