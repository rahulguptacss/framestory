'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import type { BackToTopData } from '../../types';

interface BackToTopProps {
  data: BackToTopData;
}

export default function BackToTop({ data }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label={data.aria_label}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#c5903b] text-white shadow-lg shadow-[#c5903b]/30 transition-all duration-300 hover:bg-[#b07d2c] hover:scale-105 active:scale-95"
    >
      <ChevronUp className="h-5 w-5 stroke-[2.5]" />
    </button>
  );
}
