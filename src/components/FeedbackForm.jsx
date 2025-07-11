

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

