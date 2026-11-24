'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';

interface HeroProps {
  data: HeroSectionData;
}

export default function Hero({ data }: HeroProps) {
  const line1 = data.title_line1 || data.title_start;
  const line2 = data.title_line2 || data.title_highlight;
  const line3 = data.title_line3 || data.title_end;

  return (
    <section
      id={data.id}
      className="relative overflow-hidden bg-gradient-to-b from-[#e3edf6] via-[#f7f5f0] to-[#f9e9da] pt-8 pb-14 sm:pt-10 sm:pb-18 lg:pt-12 lg:pb-24"
    >
      {/* Full-width Ultra HD Scenic Mountain Landscape Background */}
      {data.background_image && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <Image
            src={data.background_image}
            alt={data.eyebrow || 'Hero Background'}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Soft editorial gradient overlay so the typography and cards have 100% crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f4]/92 via-[#fbf8f4]/75 to-[#fbf8f4]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf8f4]/60 via-transparent to-[#fbf8f4]/80" />
        </div>
      )}

      {/* Atmospheric Sunrise Glow Effect */}
      <div className="pointer-events-none absolute -bottom-10 right-1/4 h-64 w-96 rounded-full bg-[#fed4a4]/40 blur-3xl z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Photographer Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex justify-center lg:col-span-5 lg:justify-start"
          >
            <div className="relative aspect-[3.8/4.6] w-full max-w-[420px] overflow-hidden rounded-[28px] sm:rounded-[32px] border-[3.5px] border-white bg-white shadow-2xl shadow-black/15 transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={data.photographer_image}
                alt={line1 || 'Professional Photographer'}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 420px"
              />
            </div>
          </motion.div>

          {/* Right Column: Eyebrow, Main Headline & Description */}
          <div className="relative lg:col-span-7 lg:pl-6">
            
            {/* Eyebrow with Left Gold L-Bracket and Right Gold Line */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 sm:mb-6 inline-flex items-center gap-3 select-none"
            >
              {/* Gold Top-Left Corner L-Bracket */}
              <span className="relative flex h-[19px] w-[26px] shrink-0 items-start">
                <span className="h-full w-[2px] bg-[#c58c2b]" />
                <span className="h-[2px] w-full bg-[#c58c2b]" />
              </span>

              {/* Eyebrow Text */}
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#0c1524] uppercase">
                {data.eyebrow}
              </span>

              {/* Right Horizontal Gold Line */}
              <span className="h-[2px] w-12 sm:w-16 bg-[#c58c2b]" />
            </motion.div>

            {/* Main Headline: 3 Lines Exact */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-serif text-5xl sm:text-6xl lg:text-[76px] font-bold tracking-tight leading-[1.08] text-[#0c1524]"
            >
              <span className="block">{line1}</span>
              <span className="block italic font-normal text-[#c58c2b]">
                {line2}
              </span>
              <span className="block">{line3}</span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-6 max-w-md lg:max-w-[420px] xl:max-w-[460px] text-base sm:text-lg font-medium leading-relaxed text-[#0c1524]"
            >
              {data.description_line1 ? (
                <>
                  <span className="block">{data.description_line1}</span>
                  <span className="block">{data.description_line2}</span>
                </>
              ) : (
                <p>{data.description}</p>
              )}
            </motion.div>

            {/* Floating Overlapping Landscape Card at Bottom Right - Shifted Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 7 }}
              transition={{ duration: 0.7, delay: 0.4, type: 'spring', stiffness: 220, damping: 20 }}
              className="mt-8 sm:mt-12 flex justify-end lg:absolute lg:-right-10 xl:-right-20 2xl:-right-28 lg:-bottom-8 xl:-bottom-12 lg:mt-0 z-20"
            >
              <div className="relative w-56 sm:w-64 lg:w-[270px] xl:w-[290px] rounded-2xl border-[3.5px] border-white bg-white p-1 shadow-2xl shadow-black/20 transition-all duration-300 hover:rotate-0 hover:scale-105">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl">
                  <Image
                    src={data.polaroid_image}
                    alt={data.polaroid_alt || data.title_start || 'Scenic Landscape'}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 640px) 220px, 290px"
                  />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
