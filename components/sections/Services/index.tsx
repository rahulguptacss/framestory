'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ServicesSectionData } from '../../types';

interface ServicesProps {
  data: ServicesSectionData;
}

export default function Services({ data }: ServicesProps) {
  return (
    <section id={data.id} className="relative bg-[#fbf8f2] py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          {/* Centered Camera Outline Ornament */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3.5 inline-flex items-center justify-center gap-4 select-none"
          >
            {/* Left Gold Line */}
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#c58c2b]" />

            {/* Camera Outline Icon */}
            <div className="flex items-center justify-center text-[#c58c2b]">
              <svg
                className="h-8 w-10 sm:h-9 sm:w-11"
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

            {/* Right Gold Line */}
            <span className="h-[1.5px] w-12 sm:w-16 bg-[#c58c2b]" />
          </motion.div>

          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-bold tracking-tight text-[#0c1524] sm:text-4xl lg:text-5xl"
          >
            {data.title_start}{' '}
            <span className="text-[#c58c2b]">
              {data.title_highlight}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-[#555e6d]"
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* 6 Asymmetric Staggered Cards Grid */}
        <div className="mx-auto mt-12 sm:mt-16 max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 lg:pb-8">
          {data.items.map((item, index) => {
            // Apply editorial downward offset on middle column via margin-top to keep hover translation 100% uniform on every card
            const isMiddle = index % 3 === 1;

            return (
              <div
                key={item.id}
                className={`w-full flex justify-center ${isMiddle ? 'lg:mt-16' : ''}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
                  className="group flex flex-col bg-white shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(197,140,43,0.18)] transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-xs sm:rounded-sm max-w-[320px] w-full cursor-pointer"
                >
                  {/* Edge-to-edge Top Image with smooth hover zoom */}
                  <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#f4ede3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    />
                    {/* Subtle editorial warm vignette on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Card Info Bottom */}
                  <div className="flex flex-col px-5 py-4 sm:px-5.5 sm:py-5 text-left">
                    {/* Short Gold Bar Accent */}
                    <div className="h-[2px] w-6 bg-[#c58c2b] mb-2.5 transition-all duration-300 group-hover:w-10" />

                    {/* Left-Aligned 2-Line Bold Serif Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0c1524] leading-snug transition-colors duration-300 group-hover:text-[#c58c2b]">
                      {item.title_line1 ? (
                        <>
                          <span className="block">{item.title_line1}</span>
                          <span className="block">{item.title_line2}</span>
                        </>
                      ) : (
                        item.title
                      )}
                    </h3>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
