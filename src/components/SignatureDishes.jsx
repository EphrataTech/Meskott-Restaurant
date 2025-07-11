"use client"

import { useState } from "react"
import { dishesData } from "../data/dishes"

export default function SignatureDishes() {
  const [visibleDishes, setVisibleDishes] = useState(3)
  const [filter, setFilter] = useState("all")
  const [hoveredDish, setHoveredDish] = useState(null)


  const filteredDishes = dishesData.filter((dish) => {
    if (filter === "all") return true
    return dish.category === filter
  })

  const loadMore = () => {
    setVisibleDishes((prev) => Math.min(prev + 3, filteredDishes.length))
  }

  return (
    <section id="signature-dishes" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">Signature Dishes</h2>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === "all" ? "bg-amber-500 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("veg")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === "veg" ? "bg-amber-500 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            Vegetarian
          </button>
          <button
            onClick={() => setFilter("non-veg")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === "non-veg" ? "bg-amber-500 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            Non-Vegetarian
          </button>
          <button
            onClick={() => setFilter("chef-special")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === "chef-special" ? "bg-amber-500 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            Chef Specials
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.slice(0, visibleDishes).map((dish, index) => (
            <div
              key={dish.id}
              className="relative bg-slate-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              onMouseEnter={() => setHoveredDish(dish.id)}
              onMouseLeave={() => setHoveredDish(null)}
            >
              <img
  src={dish.image}
  alt={dish.name}
  className="w-full h-48 object-cover"
/>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{dish.name}</h3>
                <p className="text-gray-300 text-sm">{dish.shortDescription}</p>
              </div>

              {hoveredDish === dish.id && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                    <p className="text-sm mb-4">{dish.description}</p>
                    <p className="text-2xl font-bold text-amber-400">${dish.price}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleDishes < filteredDishes.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
