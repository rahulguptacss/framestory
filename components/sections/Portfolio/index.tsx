'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, ChevronDown, Check, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PortfolioSectionData } from '../../types';

interface PortfolioProps {
  data: PortfolioSectionData;
}

export default function Portfolio({ data }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState(data.categories[0] || 'All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredItems =
    activeCategory.toLowerCase() === 'all'
      ? data.items
      : data.items.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id={data.id} className="relative bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-10 sm:w-14 bg-[#c5903b]/50" />
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#c5903b]/30 bg-[#fbf8f2] shadow-sm">
              <Camera className="h-4 w-4 text-[#c5903b]" />
            </div>
            <span className="h-[1px] w-10 sm:w-14 bg-[#c5903b]/50" />
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#141b2b] sm:text-4xl lg:text-5xl">
            {data.title_start}{' '}
            <span className="font-serif italic font-normal text-[#c5903b]">
              {data.title_highlight}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-[#4b5563]">
            {data.subtitle}
          </p>
        </div>

        {/* Mobile View: Luxury Category Filter Dropdown (block sm:hidden) */}
        <div ref={dropdownRef} className="relative mt-8 block sm:hidden w-full max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`flex w-full items-center justify-between rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
              isDropdownOpen
                ? 'border-[#c58c2b] bg-[#fdfbf7] ring-2 ring-[#c58c2b]/20 text-[#0c1524]'
                : 'border-[#e8dfd5] bg-white text-[#0c1524] hover:border-[#c58c2b]/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Filter className="h-4 w-4 text-[#c58c2b]" />
              <span className="font-medium text-[#2c3545]">
                Category: <strong className="font-bold text-[#c58c2b]">{activeCategory}</strong>
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-[#c58c2b] transition-transform duration-300 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Floating Dropdown Menu on Mobile */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                role="listbox"
                className="absolute left-0 right-0 top-full mt-2 z-50 max-h-64 overflow-y-auto rounded-2xl border border-[#e5dfd5] bg-white p-1.5 shadow-2xl backdrop-blur-md"
              >
                {data.categories.map((cat) => {
                  const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <li
                      key={cat}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#fbf7f0] text-[#c58c2b] font-bold'
                          : 'text-[#2c3545] hover:bg-[#fbf8f2] hover:text-[#c58c2b]'
                      }`}
                    >
                      <span>{cat}</span>
                      {isSelected && (
                        <Check className="h-4 w-4 text-[#c58c2b] shrink-0" />
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View: Horizontal Filter Pills (hidden sm:flex) */}
        <div className="mt-10 hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {data.categories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-200 sm:text-sm cursor-pointer ${
                  isActive
                    ? 'bg-[#c58c2b] text-white shadow-md shadow-[#c58c2b]/25 scale-105'
                    : 'border border-[#e8dfd5] bg-white text-[#4b5563] hover:border-[#c58c2b]/60 hover:text-[#141b2b]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 4x2 Photo Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c5903b]/15"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-semibold tracking-widest text-[#c5903b] uppercase">
                    {item.category}
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-bold text-white">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
