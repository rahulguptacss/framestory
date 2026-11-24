'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SocialIcon } from '../../ui/SocialIcons';
import type { FooterData } from '../../types';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const brandDark = data.brand_title_dark || data.logo_title_dark || data.brand_name.split(' ')[0];
  const brandGold = data.brand_title_gold || data.logo_title_gold || data.brand_name.split(' ').slice(1).join(' ');
  const brandSub = data.brand_sub || data.logo_sub || 'P H O T O G R A P H Y';
  const logoHref = data.logo_href || '#home';
  const logoAlt = data.logo_alt || data.brand_name || 'FrameStory Logo';
  const separator = data.separator || '|';

  return (
    <footer className="relative bg-white border-t border-[#ece6dd] pt-12 sm:pt-14 pb-8 sm:pb-10 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Brand Logo: Header Logo Image or SVG Camera + Text Fallback */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <Link href={logoHref} className="inline-flex items-center justify-center cursor-pointer select-none">
            {data.logo_image ? (
              <div className="relative h-11 w-44 sm:h-13 sm:w-52">
                <Image
                  src={data.logo_image}
                  alt={logoAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 176px, 208px"
                />
              </div>
            ) : (
              <div className="inline-flex items-center gap-3.5 sm:gap-4 select-none">
                {/* Gold Camera Outline Icon */}
                <div className="flex items-center justify-center text-[#c58c2b]">
                  <svg
                    className="h-10 w-12 sm:h-12 sm:w-14 text-[#c58c2b]"
                    viewBox="0 0 46 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="9"
                      width="42"
                      height="24"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 9L15.8 4.2C16.3 3.4 17.2 3 18.2 3H27.8C28.8 3 29.7 3.4 30.2 4.2L33 9"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="23"
                      cy="21"
                      r="7.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <circle cx="37" cy="14" r="1.3" fill="currentColor" />
                  </svg>
                </div>

                {/* Brand Title & Subtitle */}
                <div className="flex flex-col text-left">
                  <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                    <span className="text-[#0c1524]">{brandDark}</span>{' '}
                    <span className="text-[#c58c2b]">{brandGold}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[9px] sm:text-[10px] font-bold tracking-[0.32em] text-[#0c1524] uppercase">
                    <span className="h-[1.5px] w-6 sm:w-8 bg-[#0c1524]" />
                    <span>{brandSub}</span>
                    <span className="h-[1.5px] w-6 sm:w-8 bg-[#0c1524]" />
                  </div>
                </div>
              </div>
            )}
          </Link>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#4b5563]"
        >
          {data.description}
        </motion.p>

        {/* Circular Gold Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 sm:mt-7 flex items-center justify-center gap-3.5 sm:gap-4"
        >
          {data.socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-[1.5px] border-[#c58c2b] bg-transparent text-[#0c1524] transition-colors duration-300 hover:bg-[#c58c2b] hover:text-white hover:border-[#c58c2b] shadow-xs cursor-pointer"
            >
              <SocialIcon name={social.name} className="h-4 w-4" />
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation Links Strip with Horizontal Gold Lines - Header Menu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full mt-10 sm:mt-12"
        >
          <div className="border-y-[1.5px] border-[#c58c2b] py-4 sm:py-4.5 px-2">
            <nav className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-7 gap-y-2 text-sm sm:text-base font-serif font-bold text-[#0c1524]">
              {data.links.map((link, idx) => (
                <div key={link.name} className="flex items-center gap-4 sm:gap-7">
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-[#c58c2b]"
                  >
                    {link.name}
                  </Link>
                  {idx < data.links.length - 1 && (
                    <span className="text-[#c58c2b] select-none font-normal">{separator}</span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Copyright (called directly from data.json) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-7 sm:mt-8 text-center text-xs sm:text-sm text-[#4b5563] font-serif"
        >
          {data.copyright_highlight && data.copyright.includes(data.copyright_highlight) ? (
            <span>
              {data.copyright.slice(0, data.copyright.indexOf(data.copyright_highlight))}
              <span className="font-semibold text-[#c58c2b]">{data.copyright_highlight}</span>
              {data.copyright.slice(data.copyright.indexOf(data.copyright_highlight) + data.copyright_highlight.length)}
            </span>
          ) : (
            <span>{data.copyright}</span>
          )}
        </motion.div>

      </div>
    </footer>
  );
}
