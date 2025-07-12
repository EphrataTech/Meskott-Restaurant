import React, { useEffect, useState } from 'react';

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay(); // 0 = Sunday
    
        // Open Mon–Sat: 8am–12pm, 1pm–8pm (as shown in figma)
        const isWeekday = currentDay >= 1 && currentDay <= 6;
        const isOpenTime =
          (currentHour >= 8 && currentHour < 12) ||
          (currentHour >= 13 && currentHour < 20);
    
        setIsOpen(isWeekday && isOpenTime);
    }, []);
    return (
        <footer className="bg-[#0B1517] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-300">
            {/* Logo & meskot Map section */}
            <div className="space-y-4 text-center md:text-left">
            <img src="/images/Actions.png" alt="Meskott Logo" className="h-10 mx-auto md:mx-0" />
            <div className="bg-gray-500 h-32 w-full md:w-40 mx-auto md:mx-0 rounded-md flex items-center justify-center">
                <img src="/public/images/Placeholder Image.png " className='object-cover w-full h-full'/>
            </div>
            <div className="text-[#C99A56]">
                {isOpen ? 'We’re Open!' : 'Currently Closed'}
            </div>
            </div>
    
            {/* Quick Links of meskott pages*/}
            <div className="space-y-2 text-center md:text-left text-[#C99A56]">
            <h4 className="font-semibold text-[#C99A56]">Quick Links</h4>
            <a href="#home" className="hover:text-white block">Home Page</a>
            <a href="#menu" className="hover:text-white block">Our Menu</a>
            <a href="#contact" className="hover:text-white block">Contact Us</a>
            <a href="#story" className="hover:text-white block">Our Story</a>
            <a href="#feedback" className="hover:text-white block">Feedback Form</a>
            </div>
    
            {/* Connect With Us Section
            {/* TODO: Add links to social media icons later */}

            <div className="space-y-2 text-center md:text-left text-[#C99A56]">
            <h4 className="font-semibold text-[#C99A56]">Connect With Us</h4>
            <a href="#" className="hover:text-[#C99A56] block">Facebook Page</a>
            <a href="#" className="hover:text-white block">Instagram Feed</a>
            <a href="#" className="hover:text-white block">Twitter Profile</a>
            <a href="#" className="hover:text-white block">LinkedIn Page</a>
            <a href="#" className="hover:text-white block">YouTube Channel</a>
            </div>
    
            {/* Stay Updated section*/}
            <div className="space-y-2 text-center md:text-left text-[#C99A56]">
            <h4 className="font-semibold text-[#C99A56]">Stay Updated</h4>
            <a href="#" className="hover:text-white block">Facebook</a>
            <a href="#" className="hover:text-white block">Instagram</a>
            <a href="#" className="hover:text-white block">Twitter</a>
            <a href="#" className="hover:text-white block">LinkedIn</a>
            <a href="#" className="hover:text-white block">YouTube</a>
            </div>
    
            {/* Working Hours of Meskott */}
            <div className="space-y-2 text-center md:text-left text-[#C99A56]">
            <h4 className="font-semibold text-white text-[#C99A56]">Working Hours</h4>
            <p className='text-[#C99A56]'>8:00AM - 12PM</p>
            <p className='text-[#C99A56]'>1:00PM - 8PM</p>
            </div>
        </div>
    
          {/* Bottom Text */}
        {/* Horizontal Divider having blur shadow*/}
<div className="w-full h-px bg-gray-700/50 shadow-sm backdrop-blur-sm my-6"></div>

{/* Bottom Footer Informations*/}
<div className="flex flex-col md:flex-row justify-between items-center text-xs text-[#C99A56] px-4">
  <p className="mb-2 md:mb-0">© 2025 All rights reserved. Meskott</p>
  <div className="space-x-4">
    <a href="#" className="hover:text-white">Privacy Policy</a>
    <a href="#" className="hover:text-white">Terms of Service</a>
    <a href="#" className="hover:text-white">Cookie Settings</a>
  </div>
</div>

    </footer>
    );
    }