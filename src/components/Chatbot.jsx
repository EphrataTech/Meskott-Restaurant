import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm here to help you with any questions about our restaurant. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const samplePrompts = [
    "What's the most popular dish?",
    "Do you have vegetarian options?",
    "What are your opening hours?",
  ]

    const botResponses = {
    "what's the most popular dish":
      "Our most popular dish is the Grilled Chicken Breast Provencale! ...",
    "do you have vegetarian options":
      "We have many vegetarian dishes including our Avocado Green Salad ...",
    "what are your opening hours":
      "We're open Monday to Sunday from 5:00 PM to 11:00 PM. ...",
    default:
      "Thank you for your question! ...",
  }

  const handleSendMessage = (text) => {
    const messageText = text || inputText.trim()
    if (!messageText) return

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    setTimeout(() => {
      const lowerText = messageText.toLowerCase()
      let response = botResponses.default

      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          response = value
          break
        }
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
