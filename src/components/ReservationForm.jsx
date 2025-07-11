"use client"

import React, { useState, useEffect } from "react"
import { Calendar } from "lucide-react"

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [reservations, setReservations] = useState([])
  const [messageLength, setMessageLength] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("reservations")
    if (saved) {
      setReservations(JSON.parse(saved))
    }
  }, [])

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const newReservation = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString(),
      }

      const updatedReservations = [...reservations, newReservation]
      setReservations(updatedReservations)
      localStorage.setItem("reservations", JSON.stringify(updatedReservations))

      setShowSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        message: "",
      })
      setMessageLength(0)

      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  const handleMessageChange = (e) => {
    const value = e.target.value
    setFormData({ ...formData, message: value })
    setMessageLength(value.length)
  }

  const generateCalendar = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dateString = date.toISOString().split("T")[0]
      const isToday = day === today.getDate()
      const isPast = date < today

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => {
            if (!isPast) {
              setFormData({ ...formData, date: dateString })
              setShowCalendar(false)
            }
          }}
          disabled={isPast}
          className={`p-2 text-sm rounded hover:bg-slate-600 transition-colors ${
            isToday
              ? "bg-amber-500 text-white"
              : isPast
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-slate-600"
          } ${formData.date === dateString ? "bg-amber-600" : ""}`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <section id="reservation" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">Make a Reservation</h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Your phone number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-white mb-2">Date *</label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none flex items-center justify-between"
                  >
                    <span>{formData.date || "Select date"}</span>
                    <Calendar className="w-5 h-5" />
                  </button>
                  {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}

                  {showCalendar && (
                    <div className="absolute top-full left-0 mt-2 bg-slate-700 rounded-lg p-4 shadow-lg z-10 w-80">
                      <div className="grid grid-cols-7 gap-1 text-center">
                        <div className="p-2 text-amber-400 font-semibold">Sun</div>
                        <div className="p-2 text-amber-400 font-semibold">Mon</div>
                        <div className="p-2 text-amber-400 font-semibold">Tue</div>
                        <div className="p-2 text-amber-400 font-semibold">Wed</div>
                        <div className="p-2 text-amber-400 font-semibold">Thu</div>
                        <div className="p-2 text-amber-400 font-semibold">Fri</div>
                        <div className="p-2 text-amber-400 font-semibold">Sat</div>
                        {generateCalendar()}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white mb-2">Time *</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="">Select time</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                  {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Special Requests</label>
                <textarea
                  value={formData.message}
                  onChange={handleMessageChange}
                  className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-24 resize-none"
                  placeholder="Any special requests or dietary requirements..."
                  maxLength={200}
                />
                <div className="text-right text-gray-400 text-sm mt-1">{messageLength}/200 characters</div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Reserve Table
              </button>
            </form>

            {showSuccess && (
              <div className="mt-6 p-4 bg-green-600 text-white rounded-lg">
                Thank you for your reservation! We'll contact you soon to confirm.
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Your Reservations</h3>
            {reservations.length === 0 ? (
              <p className="text-gray-400">No reservations yet.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{reservation.name}</h4>
                      <span className="text-amber-400 text-sm">
                        {new Date(reservation.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {reservation.date} at {reservation.time} • {reservation.guests} guests
                    </p>
                    {reservation.message && <p className="text-gray-400 text-sm mt-2">{reservation.message}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
