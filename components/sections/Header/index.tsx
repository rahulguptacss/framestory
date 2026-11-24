'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Menu, X } from 'lucide-react';
import type { HeaderData } from '../../types';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll
      const sections = data.links.map((link) => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          const matchedLink = data.links.find(
            (link) => link.href.replace('#', '') === sections[i]
          );
          if (matchedLink) {
            setActiveTab(matchedLink.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.links]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#ece6dd]'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo Left: Image Logo or Outline Camera + Brand Text */}
        <Link
          href="#home"
          onClick={() => setActiveTab('Home')}
          className="flex items-center gap-3.5"
        >
          {data.logo_image ? (
            <div className="relative h-10 w-36 sm:h-12 sm:w-44">
              <Image
                src={data.logo_image}
                alt={data.logo_alt || 'Logo'}
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          ) : (
            <>
              {/* Exact Gold Camera Outline Icon */}
              <div className="flex items-center justify-center text-[#c58c2b]">
                <svg
                  className="h-9 w-11 sm:h-10 sm:w-12 text-[#c58c2b]"
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
                  <line
                    x1="20"
                    y1="5.5"
                    x2="26"
                    y2="5.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="8"
                    y1="6"
                    x2="10.5"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="23"
                    cy="21"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="23"
                    cy="21"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="37" cy="14" r="1.3" fill="currentColor" />
                </svg>
              </div>

              {/* Logo Name & Subtitle */}
              <div className="flex flex-col select-none">
                <div className="flex items-center text-2xl font-bold tracking-tight leading-none sm:text-[26px]">
                  <span className="text-[#0c1524]">{data.logo_title_dark}</span>
                  <span className="text-[#c58c2b]">{data.logo_title_gold}</span>
                </div>
                <span className="mt-1 text-[9px] font-semibold tracking-[0.32em] text-[#0c1524] uppercase">
                  {data.logo_sub}
                </span>
              </div>
            </>
          )}
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 lg:gap-10 md:flex">
          {data.links.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(link.name)}
                className={`relative py-1 text-sm lg:text-[15px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-[#c58c2b]'
                    : 'text-[#0c1524] hover:text-[#c58c2b]'
                }`}
              >
                <span>{link.name}</span>

                {/* Animated Gold Underline Bar */}
                {isActive && (
                  <motion.span
                    layoutId="header-active-line"
                    className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full bg-[#c58c2b]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop CTA Button with Mail Icon */}
        <div className="hidden items-center md:flex">
          <motion.div
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={data.button_href}
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d9942a] via-[#c68928] to-[#b3751a] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#c58c2b]/25 transition-all duration-300 hover:shadow-lg hover:shadow-[#c58c2b]/35"
            >
              <Mail className="h-4 w-4 stroke-[2.2] text-white" />
              <span>{data.button_text}</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8dfd5] text-[#0c1524] transition-colors hover:border-[#c58c2b] hover:text-[#c58c2b] md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Mobile Navigation Drawer with Smooth Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#ece6dd] bg-white px-5 pt-3 pb-6 md:hidden shadow-lg"
          >
            <nav className="flex flex-col gap-2">
              {data.links.map((link, idx) => {
                const isActive = activeTab === link.name;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveTab(link.name);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#fbf8f2] text-[#c58c2b]'
                          : 'text-[#0c1524] hover:bg-[#faf7f2] hover:text-[#c58c2b]'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[#c58c2b]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-3"
              >
                <Link
                  href={data.button_href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d9942a] via-[#c68928] to-[#b3751a] py-3 text-sm font-semibold text-white shadow-md shadow-[#c58c2b]/25"
                >
                  <Mail className="h-4 w-4 stroke-[2.2] text-white" />
                  <span>{data.button_text}</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
