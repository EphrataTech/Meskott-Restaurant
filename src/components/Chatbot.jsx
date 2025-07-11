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
