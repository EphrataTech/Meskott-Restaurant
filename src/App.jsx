import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MenuPage from "./components/MenuPage"
import SignatureDishes from "./components/SignatureDishes"
import ReservationForm from "./components/ReservationForm"

export default function App() {
  return (
    <Router>
      {/* <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-slate-900" : "bg-white"}`}> */}
        {/* <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
        <Routes>
          <Route
            path="/"
            element={
              <main>
                {/* <Hero /> */}
                <SignatureDishes />
                <ReservationForm />
                {/* <ChatBot /> */}
              </main>
            }
          />
          <Route path="/menu/:category" element={<MenuPage />} />
        </Routes>
        {/* <Footer /> */}
      {/* </div> */}
    </Router>
  )
}
