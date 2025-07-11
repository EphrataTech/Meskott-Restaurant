

import type React from "react"
import { useState, useEffect } from "react"
import { Star, Send } from "lucide-react"

interface Feedback {
  id: string
  name: string
  email: string
  rating: number
  message: string
  timestamp: string
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [messageLength, setMessageLength] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("feedbacks")
    if (saved) {
      setFeedbacks(JSON.parse(saved))
    }
  }, [])

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format"
    if (formData.rating === 0) newErrors.rating = "Please provide a rating"
    if (!formData.message.trim()) newErrors.message = "Feedback message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date().toISOString(),
      }

      const updatedFeedbacks = [...feedbacks, newFeedback]
      setFeedbacks(updatedFeedbacks)
      localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks))

      setShowSuccess(true)
      setFormData({
        name: "",
        email: "",
        rating: 0,
        message: "",
      })
      setMessageLength(0)

      setTimeout(() => setShowSuccess(false), 5000)
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData({ ...formData, message: value })
    setMessageLength(value.length)
  }

  const handleStarClick = (rating: number) => {
    setFormData({ ...formData, rating })
  }
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => handleStarClick(star)}
        onMouseEnter={() => setHoveredStar(star)}
        onMouseLeave={() => setHoveredStar(0)}
        className="focus:outline-none transition-colors"
      >
        <Star
          className={`w-8 h-8 ${
            star <= (hoveredStar || formData.rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-400 hover:text-amber-300"
          }`}
        />
      </button>
    ))
  }

  const getRatingText = (rating: number) => {
    const ratingTexts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    }
    return ratingTexts[rating as keyof typeof ratingTexts] || ""
  }

    return (
    <section id="feedback" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">Share Your Feedback</h2>

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
                <label className="block text-white mb-2">Rating *</label>
                <div className="flex items-center space-x-1 mb-2">{renderStars()}</div>
                {formData.rating > 0 && <p className="text-amber-400 text-sm">{getRatingText(formData.rating)}</p>}
                {errors.rating && <p className="text-red-400 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label className="block text-white mb-2">Your Feedback *</label>
                <textarea
                  value={formData.message}
                  onChange={handleMessageChange}
                  className="w-full p-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-amber-500 outline-none h-32 resize-none"
                  placeholder="Tell us about your experience..."
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-400 text-sm">{messageLength}/500 characters</span>
                  {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Feedback</span>
              </button>
            </form>

            {showSuccess && (
              <div className="mt-6 p-4 bg-green-600 text-white rounded-lg">
                Thank you for your feedback! We appreciate your input and will use it to improve our service.
              </div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Recent Feedback</h3>
            {feedbacks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No feedback yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto chat-scroll">
                {feedbacks
                  .slice()
                  .reverse()
                  .map((feedback) => (
                    <div key={feedback.id} className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{feedback.name}</h4>
                        <span className="text-amber-400 text-sm">
                          {new Date(feedback.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= feedback.rating ? "text-amber-400 fill-amber-400" : "text-gray-400"
                            }`}
                          />
                        ))}
                        <span className="text-gray-300 text-sm ml-2">
                          ({feedback.rating}/5 - {getRatingText(feedback.rating)})
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{feedback.message}</p>
                    </div>
                  ))}
              </div>
            )}

