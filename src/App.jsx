import { useEffect, useState } from 'react';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MenuPage from "./components/MenuPage"
import SignatureDishes from "./components/SignatureDishes"
import ReservationForm from "./components/ReservationForm"
import FeedbackForm from "./components/FeedbackForm"
import Chatbot from "./components/Chatbot"
import Header from "./components/Header"

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Watch for theme changes
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  return (
    <Router>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
        <Routes>
          <Route
            path="/"
            element={
              <main>
            
                <SignatureDishes />
                <ReservationForm />
                <FeedbackForm />
                <Chatbot />
              </main>
            }
          />
          <Route path="/menu/:category" element={<MenuPage />} />
        </Routes>
       
    </Router>
  )
}
