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

    return (
    <section id="chatbot" className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (


                <div className="bg-slate-800 rounded-lg shadow-2xl w-80 h-96 flex flex-col">
          <div className="bg-amber-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Restaurant Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-amber-600 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.isBot ? "bg-slate-700 text-white" : "bg-amber-500 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-white p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>


         
