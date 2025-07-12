
import { useParams, Link } from "react-router-dom"
import { dishesData } from "../data/dishes"
import { ArrowLeft } from "lucide-react"

export default function MenuPage() {
  const { category } = useParams()

  const categoryTitles = {
    starters: "Starters",
    mains: "Main Dishes",
    desserts: "Desserts",
    drinks: "Drinks",
  }

  const filteredDishes = dishesData.filter((dish) => {
    if (category === "mains") return dish.menuCategory === "main"
    return dish.menuCategory === category
  })

  return (
    <div className="min-h-screen bg-slate-800 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-amber-400 hover:text-amber-300 transition-colors mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center text-amber-400 mb-12">
          {categoryTitles[category || ""] || "Menu"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-slate-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
            >
              <img src={dish.image || ""} alt={dish.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{dish.name}</h3>
                  <span className="text-2xl font-bold text-amber-400">${dish.price}</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      dish.category === "veg"
                        ? "bg-green-600 text-white"
                        : dish.category === "non-veg"
                          ? "bg-red-600 text-white"
                          : "bg-amber-600 text-white"
                    }`}
                  >
                    {dish.category === "veg"
                      ? "Vegetarian"
                      : dish.category === "non-veg"
                        ? "Non-Vegetarian"
                        : "Chef Special"}
                  </span>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No dishes found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
