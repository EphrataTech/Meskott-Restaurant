import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MenuPage from "./components/MenuPage"
import SignatureDishes from "./components/SignatureDishes"
import ReservationForm from "./components/ReservationForm"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignatureDishes />} />
        <Route path="/menu/:category" element={<MenuPage />} />
        <Route path="/reservation" element={<ReservationForm />} />
      </Routes>
    </Router>
  )
}
