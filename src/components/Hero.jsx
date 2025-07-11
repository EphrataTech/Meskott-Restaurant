import React, { useEffect, useState } from 'react';

const images = [
    '/public/images/meskott-hero1.jpeg',
    '/public/images/messkott-hero2.jpeg',
    '/public/images/meskott-hero3.jpeg',
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
    return(

    )
}