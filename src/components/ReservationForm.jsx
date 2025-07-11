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
