<<<<<<< HEAD
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MenuPage from "./components/MenuPage"
import SignatureDishes from "./components/SignatureDishes"
import ReservationForm from "./components/ReservationForm"
import FeedbackForm from "./components/FeedbackForm"
import Chatbot from "./components/Chatbot"

export default function App() {
  return (
    <Router>
     
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
=======
import React, { useEffect, useState } from 'react';
import './App.css'
import Navbar from '../src/components/Navbar'
import Hero from '../src/components/Hero'
import Footer from './components/Footer'

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

  // On load: apply theme from localStorage
  //Applied useEffcet to check for dark mode in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Watch for changes
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <div className="bg-white dark:bg-[#0B1517] text-black dark:text-white transition-all duration-500 min-h-screen">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <Hero />
      <Footer />
    </div>
  );
}
>>>>>>> upstream/main
