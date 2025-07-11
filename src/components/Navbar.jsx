import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

// Load theme from localStorage on mount
useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

// Watch for dark mode changes
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
    <header className='sticky top-0 z-50 bg-[#0B1517] dark:bg-gray-900 shadow-md'>
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <ul className='flex items-center space-x-4 gap-6 text-white relative'>
                <li><a href="#home" className='hover:text-pink-400'>Home</a></li>
                <li><a href="#feedback" className='hover:text-pink-400'>About</a>Feedback</li>
            </ul>
        </nav>
    </header>
)
}