'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FaqSectionData } from '../../types';

interface FaqProps {
  data: FaqSectionData;
}

export default function Faq({ data }: FaqProps) {
  // Default first item open, can toggle any
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id={data.id} className="relative bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#c58c2b] uppercase select-none">
                {data.eyebrow}
              </span>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0c1524]">
                {data.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4b5563]">
                {data.subtitle}
              </p>
            </motion.div>

            {/* Accordion Items List */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {data.items.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isOpen
                        ? 'border-[#c58c2b]/60 bg-[#fdfbf7] shadow-sm'
                        : 'border-[#e8dfd5] bg-white hover:border-[#c58c2b]/50 shadow-xs'
                    }`}
                  >
                    {/* Accordion Question Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="flex w-full items-center justify-between px-5 sm:px-6 py-4.5 sm:py-5 text-left cursor-pointer transition-colors focus:outline-hidden"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-[#0c1524] pr-4 text-sm sm:text-base select-none">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="shrink-0 text-[#c58c2b]"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </button>

                    {/* Smooth Collapsible Content via AnimatePresence */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: {
                                duration: 0.35,
                                ease: [0.04, 0.62, 0.23, 0.98],
                              },
                              opacity: { duration: 0.25, delay: 0.08 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: {
                                duration: 0.3,
                                ease: [0.04, 0.62, 0.23, 0.98],
                              },
                              opacity: { duration: 0.15 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#c58c2b]/15 px-5 sm:px-6 pt-3 pb-5">
                            <p className="text-sm sm:text-base leading-relaxed text-[#4b5563]">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Couple & Floating Bouquet Polaroid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none pt-4 lg:pt-8"
          >
            {/* Soft Warm Radial Backdrop Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#f6eee3] -z-10 blur-2xl opacity-70" />

            {/* Main Couple Photo */}
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl shadow-black/8 z-0">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={data.image_main}
                  alt="Wedding Couple Embrace"
                  fill
                  quality={95}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                  priority
                />
              </div>
            </div>

            {/* Overlapping Floating Polaroid Card (Bouquet) */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-5 w-44 sm:w-52 rotate-[5deg] rounded-xl border-4 border-white bg-white p-2 shadow-2xl shadow-black/15 cursor-pointer z-10"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f4ede3]">
                <Image
                  src={data.image_polaroid}
                  alt="Bridal Bouquet Detail"
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
