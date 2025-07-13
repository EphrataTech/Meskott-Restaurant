"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Moon, Sun, MenuIcon } from "lucide-react"

export default function Header({ darkMode, toggleDarkMode }) {
  const [isSticky, setIsSticky] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isSticky ? "fixed top-0 bg-slate-800/95 backdrop-blur-sm shadow-lg" : "relative bg-slate-800"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-white font-bold text-xl">Restaurant</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white hover:text-amber-400 transition-colors"
            >
              Home
            </button>

            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="text-white hover:text-amber-400 transition-colors flex items-center">
                Menu
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg py-2">
                  <Link to="/menu/starters" className="block px-4 py-2 text-white hover:bg-slate-600 transition-colors">
                    Starters
                  </Link>
                  <Link to="/menu/mains" className="block px-4 py-2 text-white hover:bg-slate-600 transition-colors">
                    Main Course
                  </Link>
                  <Link to="/menu/desserts" className="block px-4 py-2 text-white hover:bg-slate-600 transition-colors">
                    Desserts
                  </Link>
                  <Link to="/menu/drinks" className="block px-4 py-2 text-white hover:bg-slate-600 transition-colors">
                    Drinks
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("signature-dishes")}
              className="text-white hover:text-amber-400 transition-colors"
            >
              Signature Dishes
            </button>

            <button
              onClick={() => scrollToSection("reservation")}
              className="text-white hover:text-amber-400 transition-colors"
            >
              Reservation
            </button>

            <button
              onClick={() => scrollToSection("feedback")}
              className="text-white hover:text-amber-400 transition-colors"
            >
              Feedback
            </button>

            <button
              onClick={() => scrollToSection("chatbot")}
              className="text-white hover:text-amber-400 transition-colors"
            >
              Chat
            </button>

            <button
              onClick={() => scrollToSection("footer")}
              className="text-white hover:text-amber-400 transition-colors"
            >
              Contact
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
          </div>

          <div className="md:hidden">
            <MenuIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </nav>
    </header>
  )
}
