import React, { useEffect, useState } from 'react';
import './App.css'
import Navbar from '../src/components/Navbar'

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

  // On load: apply theme from localStorage
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
    return(
        <div className="bg-white dark:bg-[#0B1517] text-black dark:text-white transition-all duration-500 min-h-screen">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
    </div>
    )
}