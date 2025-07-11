import React, { useEffect, useState } from 'react';

const images = [
    '/public/images/Meskot7.avif',
    '/public/images/Meskot6.avif',
    '/public/images/meskot-hero5.avif',
    '/public/images/photo-1414235077428-338989a2e8c0.avif',
  ];
  const typeText = '🍽️ Welcome to Meskott Culinary Experience';
export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
        setTypedText(typeText.slice(0, i));
        i++;
        if (i > typeText.length) clearInterval(typing);
        }, 80);
        return () => clearInterval(typing);
    }, []);

    
        return (
            <section className="relative w-full h-[100vh] overflow-hidden">
              {/* Background Carousel */}
            <img
                src={images[currentSlide]}
                alt="Slide"
                className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-1000"
            />
        
              {/* Overlay Content of our hero section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-60 px-6 text-center">
                <h1 className="text-[#C99A56] text-3xl md:text-5xl font-bold mb-4">
                {typedText}
                </h1>
                <p className="text-[#C99A56] text-base md:text-lg max-w-2xl mb-6">
        Indulge in a culinary journey that celebrates freshness and culture. Discover the unique flavors that make our dishes unforgettable.
                </p>
                <a
        href="#reservation"
                  className="text-[#C99A56] border border-[#C99A56] px-6 py-2 rounded-md hover:bg-[#C99A56] hover:text-white transition duration-300"
                >
            Book a Table
                </a>
            </div>
            </section>
        );
        }

    
