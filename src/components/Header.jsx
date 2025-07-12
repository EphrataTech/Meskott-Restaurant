import React from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Load the theme from Local storage Using use state effect
  // Load theme from localStorage on mount
  useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }, []);

    
//  for dark mode changes
// It will add dark mode changes
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
        <button
    className="md:hidden text-white text-3xl"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  >
    ☰
  </button>
  <ul className={`flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-[#0B1517] md:bg-transparent z-40 md:flex items-start md:items-center text-white transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'flex' : 'hidden'} md:gap-6 gap-4 px-4 py-4 md:py-0`}>
  <li><a href="#home" className='hover:text-white text-[#C99A56] font-roboto'>Home</a></li>
  <li><a href="#feedback" className='hover:text-white text-[#C99A56] font-roboto'>Feedback</a></li>
