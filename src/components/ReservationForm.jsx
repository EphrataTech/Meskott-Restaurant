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

useEffect(() => {
  const saved = localStorage.getItem("reservations")
  if (saved) {
    setReservations(JSON.parse(saved))
  }
}, [])

const [reservations, setReservations] = useState([])
const [showSuccess, setShowSuccess] = useState(false)
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
    setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: 2, message: "" })
    setMessageLength(0)
    setTimeout(() => setShowSuccess(false), 5000)
  }
}

const [showCalendar, setShowCalendar] = useState(false)

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

{/* In the JSX form */}
<button
  type="button"
  onClick={() => setShowCalendar(!showCalendar)}
  className="w-full p-3 bg-slate-700 text-white rounded-lg ..."
>
  <span>{formData.date || "Select date"}</span>
  <Calendar className="w-5 h-5" />
</button>

{showCalendar && (
  <div className="absolute ...">
    <div className="grid grid-cols-7 ...">
      {/* weekday headers + {generateCalendar()} */}
    </div>
  </div>
)}




