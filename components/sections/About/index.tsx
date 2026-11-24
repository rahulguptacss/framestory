'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import type { AboutSectionData } from '../../types';

interface AboutProps {
  data: AboutSectionData;
}

function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, numeric, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, numeric]);

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

export default function About({ data }: AboutProps) {
  const nameParts = (data.signature_name || 'John Phillips').trim().split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];

  return (
    <section id={data.id} className="relative bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Top Decorative Ornament: Flanking Gold Lines + Camera Outline Icon */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center justify-center gap-4 select-none"
        >
          {/* Left Gold Line */}
          <span className="h-[1.5px] w-12 sm:w-16 bg-[#c58c2b]" />

          {/* Camera Outline Icon from Screenshot */}
          <div className="flex items-center justify-center text-[#c58c2b]">
            <svg
              className="h-8 w-10 sm:h-9 sm:w-11"
              viewBox="0 0 44 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rounded Body */}
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
              {/* Top Viewfinder Prism */}
              <path
                d="M13 8L15.6 3.6C16 3 16.8 2.5 17.6 2.5H26.4C27.2 2.5 28 3 28.4 3.6L31 8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lens Outer Circle */}
              <circle
                cx="22"
                cy="20"
                r="7"
                stroke="currentColor"
                strokeWidth="2.2"
              />
              {/* Small Flash Dot */}
              <circle cx="34" cy="13" r="1.3" fill="currentColor" />
            </svg>
          </div>

          {/* Right Gold Line */}
          <span className="h-[1.5px] w-12 sm:w-16 bg-[#c58c2b]" />
        </motion.div>

        {/* Section Heading: About Us */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0c1524]"
        >
          {data.title_start}{' '}
          <span className="font-serif text-[#c58c2b]">
            {data.title_highlight}
          </span>
        </motion.h2>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed text-[#1e293b]"
        >
          {data.description}
        </motion.p>

        {/* Signature Name as Dynamic Content with Gold Curved Underline (Driven by data.json) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-7 sm:mt-9 flex justify-center"
        >
          <div className="inline-flex items-center justify-center font-bold text-3xl sm:text-[36px] text-[#0c1524] tracking-tight select-none">
            {firstName && <span className="mr-2 sm:mr-2.5">{firstName}</span>}
            <span className="relative inline-block">
              {lastName}
              <svg
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[105%] h-3 text-[#c58c2b]"
                viewBox="0 0 110 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3.5C32 14.5 78 14.5 107 3.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </motion.div>

        {/* Bottom 3 Stat Counters - Fully Mobile Responsive 3-Column Symmetrical Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 sm:mt-14 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 divide-x divide-[#e5ddd3] items-center">
            {data.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex flex-col sm:flex-row items-center justify-center px-1.5 sm:px-4 lg:px-8 gap-1.5 sm:gap-4.5 text-center sm:text-left select-none"
              >
                {/* Custom Exact Gold Outline Icons */}
                <div className="shrink-0 text-[#c58c2b]">
                  {stat.icon === 'camera' && (
                    <svg className="h-7 w-8 sm:h-11 sm:w-12" viewBox="0 0 46 36" fill="none">
                      <rect x="2" y="9" width="42" height="24" rx="5" stroke="currentColor" strokeWidth="2.4" />
                      <path d="M14 9L16.5 4.5C17 3.8 17.8 3.5 18.6 3.5H27.4C28.2 3.5 29 3.8 29.5 4.5L32 9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="23" cy="21" r="7.5" stroke="currentColor" strokeWidth="2.4" />
                      <circle cx="36" cy="14" r="1.4" fill="currentColor" />
                    </svg>
                  )}
                  {stat.icon === 'image' && (
                    <svg className="h-7 w-8 sm:h-11 sm:w-12" viewBox="0 0 46 36" fill="none">
                      <rect x="2" y="3" width="42" height="30" rx="5" stroke="currentColor" strokeWidth="2.4" />
                      <circle cx="12" cy="11" r="2.8" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 28L16 16L24 24L31 17L41 28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {stat.icon === 'users' && (
                    <svg className="h-7 w-8 sm:h-11 sm:w-12" viewBox="0 0 46 36" fill="none">
                      <circle cx="16" cy="13" r="5" stroke="currentColor" strokeWidth="2.4" />
                      <path d="M5 30C5 24 10 21 16 21C22 21 27 24 27 30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="30" cy="13" r="5" stroke="currentColor" strokeWidth="2.4" />
                      <path d="M26.5 21.5C28.5 21 31.5 21 34 23C38 25 39 27.5 39 30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  )}
                </div>

                {/* Number & Label Stacked with Count-Up Animation */}
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-[32px] lg:text-4xl font-bold tracking-tight text-[#0c1524] leading-none">
                    <StatCounter value={stat.value} />
                  </span>
                  <span className="mt-1 text-[10px] sm:text-xs lg:text-[13px] font-semibold text-[#1e293b] leading-tight sm:whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
