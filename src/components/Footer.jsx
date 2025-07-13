

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkOpeningHours = () => {
      const now = new Date()
      const currentHour = now.getHours()

      // Restaurant hours: 5 PM to 11 PM
      const openHour = 17
      const closeHour = 23

      setIsOpen(currentHour >= openHour && currentHour < closeHour)
    }

    checkOpeningHours()
    const interval = setInterval(checkOpeningHours, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer id="footer" className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white font-bold text-xl">Restaurant</span>
            </div>
            <p className="text-gray-400 mb-4">
              Experience culinary excellence with our signature dishes and exceptional service.
            </p>
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className={`font-semibold ${isOpen ? "text-green-400" : "text-red-400"}`}>
                {isOpen ? "We're Open" : "Currently Closed"}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Daily: 5:00 PM - 11:00 PM</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#signature-dishes" className="text-gray-400 hover:text-white transition-colors">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#reservation" className="text-gray-400 hover:text-white transition-colors">
                  Reservations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1" />
                <div>
                  <p className="text-white">123 King George Street</p>
                  <p className="text-gray-400">Culinary District, CD 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <p className="text-white">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <p className="text-white">info@restaurant.com</p>
              </div>
            </div>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-slate-700 hover:bg-amber-500 p-3 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700 hover:bg-amber-500 p-3 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700 hover:bg-amber-500 p-3 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Subscribe for special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 p-2 bg-slate-700 text-white rounded-l-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r-lg transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Restaurant. All rights reserved. |
            <a href="#" className="hover:text-white transition-colors ml-1">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white transition-colors ml-1">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
