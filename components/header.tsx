"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, X } from "lucide-react"
import Logo from "@/components/logo"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const menuItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/import-export", label: t("nav.importExport") },
    { href: "/certificates", label: t("nav.certificates") },
    { href: "/contact", label: t("nav.contact") },
  ] as const

  return (
    <header className="w-full fixed top-4 left-1/2 transform -translate-x-1/2 z-50" style={{ width: '80%' }}>
      <div className="relative">
        {/* Glass Effect Container */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 relative overflow-hidden">
          {/* Blue Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-400/30 shadow-inner"></div>
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-[70px]">
            {/* Logo Section */}
            <Link href="/" className="flex items-center group">
              <Logo size="md" className="group-hover:scale-105 transition-transform duration-300" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="relative px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium rounded-lg hover:bg-white/50 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* Language Switcher */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              
              {/* CTA Button */}
              <Button 
                size="sm" 
                className="hidden md:flex bg-gradient-to-r from-gray-600 to-gray-900 hover:from-blue-700 hover:to-blue-800/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/30"
              >
                {t("common.getStarted")}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-white/50 transition-colors border border-transparent hover:border-blue-200/30"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Blue Border for Mobile Menu */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-600/5 border border-blue-400/20"></div>
            
            <div className="relative z-10 px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 hover:bg-white/50 transition-all duration-300 font-medium px-4 py-3 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-4 border-t border-gray-200/50 space-y-3">
                <div className="px-4">
                  <LanguageSwitcher />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border border-blue-500/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("common.getStarted")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}