import { useState, useEffect } from "react"

const heroImages = [
     '/images/Meskot7.avif',
    '/images/Meskot6.avif',
    '/images/meskot-hero5.avif',
    '/images/photo-1414235077428-338989a2e8c0.avif',
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const restaurantName = "Meskott Restaurant"

  // Image carousel autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= restaurantName.length) {
        setDisplayText(restaurantName.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image || " /images/photo-1414235077428-338989a2e8c0.avif"}
              alt={`Restaurant ambiance ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div>
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8">Experience Culinary Excellence</p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
            Explore Menu
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-amber-500" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
