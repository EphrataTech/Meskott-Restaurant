import React, { useState } from 'react';

export default function Headerr({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-[#0B1517] dark:bg-gray-900 shadow-md'>
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        <ul className={`flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-[#0B1517] md:bg-transparent z-40 md:flex items-start md:items-center text-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'flex' : 'hidden'} md:gap-6 gap-4 px-4 py-4 md:py-0`}>
          <li><a href="#home" className='hover:text-white text-[#C99A56] font-roboto'>Home</a></li>
          <li><a href="#feedback" className='hover:text-white text-[#C99A56] font-roboto'>Feedback</a></li>

          {/* Menu Dropdown with React State */}
          <li
            className="relative"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer text-[#C99A56] hover:text-white font-roboto">
              <span>Menu</span>
              <span className="text-xs">▼</span>
            </div>

            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-md p-2 min-w-[150px] z-50 transition-all duration-300">
                <a href="#starters" className="block px-3 py-1 hover:text-black text-[#C99A56] font-roboto">Starters</a>
                <a href="#main-course" className="block px-3 py-1 hover:text-black text-[#C99A56] font-roboto">Main Course</a>
                <a href="#desserts" className="block px-3 py-1 hover:text-black text-[#C99A56] font-roboto">Desserts</a>
                <a href="#drinks" className="block px-3 py-1 hover:text-black text-[#C99A56] font-roboto">Drinks</a>
              </div>
            )}
          </li>
        </ul>

        <div className='flex-shrink-0'>
          <img src="/public/images/Actions.png" alt="Meskot-Logo" className='h-10 object-contain' />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 text-white px-3 py-1 rounded-md hover:bg-gray-600 text-sm"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          <a
            href="#menu-button"
            className="bg-[#C99A56] text-black px-4 py-2 rounded-full hover:bg-[#b98a46] text-sm shadow-md"
          >
            Menu
          </a>
        </div>
      </nav>
    </header>
  );
}
