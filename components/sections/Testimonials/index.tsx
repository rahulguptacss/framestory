'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { TestimonialsSectionData, TestimonialItem } from '../../types';

interface TestimonialsProps {
  data: TestimonialsSectionData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  // Fallback to legacy single-item fields if items array is missing
  const items: TestimonialItem[] =
    data.items && data.items.length > 0
      ? data.items
      : [
          {
            id: 1,
            author: data.author || 'Priya & Rahul',
            role: data.role || 'Wedding Client',
            quote:
              data.quote ||
              'Absolutely amazing experience! The team made us feel so comfortable, and the photos turned out beyond beautiful. They truly captured the emotions and spirit of our special day.',
            image: data.image || '/img/testimonials/couple-hill.webp',
          },
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideInterval = data.auto_slide_interval || 5000;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Auto-slide effect (pauses on hover)
  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoSlideInterval, handleNext, items.length]);

  const currentTestimonial = items[currentIndex];

  return (
    <section id={data.id} className="relative bg-[#fbf7f2] py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Testimonial Composite Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative flex flex-col lg:flex-row items-center"
        >
          {/* Left Side: Photo with Gold L-Shape Corner Brackets */}
          <div className="relative w-full max-w-md lg:max-w-none lg:w-[48%] z-10 select-none">
            {/* Top-Left Gold Corner Bracket */}
            <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-16 h-16 sm:w-20 sm:h-20 border-t-[10px] sm:border-t-[14px] border-l-[10px] sm:border-l-[14px] border-[#c58c2b] pointer-events-none z-0" />

            {/* Bottom-Right Gold Corner Bracket */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 w-16 h-16 sm:w-20 sm:h-20 border-b-[10px] sm:border-b-[14px] border-r-[10px] sm:border-r-[14px] border-[#c58c2b] pointer-events-none z-0" />

            {/* Image Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f4ede3] shadow-xl shadow-black/8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.image}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Cream Background Content Box with Overlap */}
          <div className="relative w-full lg:w-[56%] lg:-ml-10 mt-8 lg:mt-0 z-0">
            <div className="relative bg-[#fbf7f2] px-6 sm:px-12 lg:pl-16 lg:pr-12 py-10 sm:py-14 text-center shadow-xs">
              
              {/* Centered Camera Outline Icon with Gold Lines */}
              <div className="mb-2 inline-flex items-center justify-center gap-3 select-none">
                <span className="h-[1.5px] w-10 sm:w-14 bg-[#c58c2b]" />
                <div className="flex items-center justify-center text-[#c58c2b]">
                  <svg
                    className="h-7 w-9 sm:h-8 sm:w-10 text-[#c58c2b]"
                    viewBox="0 0 44 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="8"
                      width="40"
                      height="24"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 8L15.6 3.6C16 3 16.8 2.5 17.6 2.5H26.4C27.2 2.5 28 3 28.4 3.6L31 8"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="22"
                      cy="20"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <circle cx="34" cy="13" r="1.3" fill="currentColor" />
                  </svg>
                </div>
                <span className="h-[1.5px] w-10 sm:w-14 bg-[#c58c2b]" />
              </div>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0c1524]">
                {data.title_start}
                <span className="text-[#c58c2b]">{data.title_highlight}</span>
              </h2>

              {/* Subtitle */}
              <p className="mt-1 text-sm sm:text-base font-medium text-[#555e6d]">
                {data.subtitle}
              </p>

              {/* Animated Quote & Author Container */}
              <div className="min-h-[140px] sm:min-h-[150px] flex items-center justify-center my-4 sm:my-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="w-full"
                  >
                    {/* Review Quote with Golden Quotation Marks */}
                    <blockquote className="text-sm sm:text-base italic font-serif leading-relaxed text-[#2c3545] max-w-lg mx-auto">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#c58c2b] select-none leading-none mr-1.5 align-middle">
                        &ldquo;
                      </span>
                      {currentTestimonial.quote}
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#c58c2b] select-none leading-none ml-1.5 align-middle">
                        &rdquo;
                      </span>
                    </blockquote>

                    {/* Short Gold Divider Line */}
                    <div className="mx-auto my-3 sm:my-3.5 h-[1px] w-12 bg-[#c58c2b]" />

                    {/* Author Name */}
                    <div className="font-serif text-base sm:text-lg font-bold text-[#0c1524]">
                      {currentTestimonial.author}
                    </div>

                    {/* Client Role */}
                    <div className="text-xs sm:text-sm font-medium text-[#6b7280]">
                      {currentTestimonial.role}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom-Right Slider Controls (Arrows & Dots) */}
            <div className="mt-4 sm:mt-5 flex items-center justify-end gap-3 sm:gap-4 select-none pr-1 sm:pr-3">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="group flex items-center text-[#c58c2b] hover:opacity-75 transition-opacity p-1 cursor-pointer"
              >
                <svg
                  className="w-8 sm:w-10 h-3.5 sm:h-4"
                  viewBox="0 0 36 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2L2 8L8 14M2 8H36"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'h-2.5 w-2.5 bg-[#c58c2b]'
                        : 'h-2.5 w-2.5 border border-[#c58c2b] bg-transparent hover:bg-[#c58c2b]/30'
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="group flex items-center text-[#c58c2b] hover:opacity-75 transition-opacity p-1 cursor-pointer"
              >
                <svg
                  className="w-8 sm:w-10 h-3.5 sm:h-4"
                  viewBox="0 0 36 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 2L34 8L28 14M34 8H0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
