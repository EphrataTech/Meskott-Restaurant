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