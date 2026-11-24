'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Mail,
  User,
  Phone,
  Layers,
  MessageSquare,
  MapPin,
  Map,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  ChevronDown,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContactSectionData } from '../../types';

interface ContactProps {
  data: ContactSectionData;
}

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getInfoIcon = (iconName: string) => {
    switch (iconName) {
      case 'map-pin':
        return <MapPin className="h-5 w-5 text-[#c58c2b]" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-[#c58c2b]" />;
      case 'mail':
        return <Mail className="h-5 w-5 text-[#c58c2b]" />;
      case 'map':
        return <Map className="h-5 w-5 text-[#c58c2b]" />;
      default:
        return <MapPin className="h-5 w-5 text-[#c58c2b]" />;
    }
  };

  return (
    <section id={data.id} className="relative bg-[#fbf8f2] py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top 2 Columns: Equal-Height Map on Left + Form on Right */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Live Google Map - Equal Height to Form */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:col-span-6 flex flex-col h-full"
          >
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-0 flex-1 overflow-hidden rounded-3xl border border-[#e2dcd2] bg-[#fbf7f2] shadow-md">
              <iframe
                title="Location Map"
                src={
                  data.map_embed_url ||
                  `https://maps.google.com/maps?q=${encodeURIComponent(
                    data.map_address || '123 Education Lane, New York, NY 10001'
                  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`
                }
                className="w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right Column: Send Us a Message Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:col-span-6 flex flex-col justify-between h-full"
          >
            {/* Header Area */}
            <div className="text-center">
              {/* Top Mail Outline Ornament */}
              <div className="mb-2 inline-flex items-center justify-center gap-3 select-none">
                <span className="h-[1.5px] w-12 sm:w-16 bg-[#c58c2b]" />
                <div className="flex items-center justify-center text-[#c58c2b]">
                  <Mail className="h-7 w-8 text-[#c58c2b] stroke-[1.8]" />
                </div>
                <span className="h-[1.5px] w-12 sm:w-16 bg-[#c58c2b]" />
              </div>

              {/* Section Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0c1524]">
                {data.title_start}{' '}
                <span className="text-[#c58c2b]">{data.title_highlight}</span>
              </h2>

              {/* Subtitle */}
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#555e6d] max-w-md mx-auto mb-6">
                {data.subtitle}
              </p>
            </div>

            {/* Form Container */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-[#c58c2b]/30 bg-[#fdfbf7] p-8 text-center"
                  >
                    <CheckCircle className="h-12 w-12 text-[#c58c2b] mb-3" />
                    <h3 className="font-serif text-2xl font-bold text-[#0c1524]">
                      {data.success_title}
                    </h3>
                    <p className="mt-2 text-sm text-[#4b5563] max-w-md">
                      {data.success_message}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full bg-[#b87b20] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#a36b16] cursor-pointer"
                    >
                      {data.reset_button_text || 'Send Another Message'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Row 1: Your Name + Email */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0c1524] mb-1.5">
                          {data.name_label || 'Your Name'}{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center rounded-xl border border-[#d8d0c5] bg-white px-3.5 py-2.5 sm:py-3 transition-colors focus-within:border-[#c58c2b] focus-within:ring-1 focus-within:ring-[#c58c2b]">
                          <User className="h-4 w-4 text-[#6b7280] mr-2.5 shrink-0" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder={data.name_placeholder}
                            className="w-full bg-transparent text-sm text-[#0c1524] placeholder:text-[#9ca3af] outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0c1524] mb-1.5">
                          {data.email_label || 'Email'}{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center rounded-xl border border-[#d8d0c5] bg-white px-3.5 py-2.5 sm:py-3 transition-colors focus-within:border-[#c58c2b] focus-within:ring-1 focus-within:ring-[#c58c2b]">
                          <Mail className="h-4 w-4 text-[#6b7280] mr-2.5 shrink-0" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder={data.email_placeholder}
                            className="w-full bg-transparent text-sm text-[#0c1524] placeholder:text-[#9ca3af] outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone Number + Custom Luxury Dropdown */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#0c1524] mb-1.5">
                          {data.phone_label || 'Phone Number'}{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center rounded-xl border border-[#d8d0c5] bg-white px-3.5 py-2.5 sm:py-3 transition-colors focus-within:border-[#c58c2b] focus-within:ring-1 focus-within:ring-[#c58c2b]">
                          <Phone className="h-4 w-4 text-[#6b7280] mr-2.5 shrink-0" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder={data.phone_placeholder}
                            className="w-full bg-transparent text-sm text-[#0c1524] placeholder:text-[#9ca3af] outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Custom Luxury Service Dropdown */}
                      <div ref={dropdownRef} className="relative">
                        <label className="block text-xs sm:text-sm font-bold text-[#0c1524] mb-1.5">
                          {data.service_label || 'Service Interested In'}{' '}
                          <span className="text-red-500">*</span>
                        </label>

                        {/* Dropdown Button Trigger */}
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`flex w-full items-center justify-between rounded-xl border bg-white px-3.5 py-2.5 sm:py-3 text-left transition-all duration-200 cursor-pointer ${
                            isDropdownOpen
                              ? 'border-[#c58c2b] ring-2 ring-[#c58c2b]/20 shadow-sm'
                              : 'border-[#d8d0c5] hover:border-[#c58c2b]/70'
                          }`}
                          aria-haspopup="listbox"
                          aria-expanded={isDropdownOpen}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <Layers className="h-4 w-4 text-[#6b7280] shrink-0" />
                            <span
                              className={`text-sm truncate select-none ${
                                formData.service
                                  ? 'font-medium text-[#0c1524]'
                                  : 'text-[#9ca3af]'
                              }`}
                            >
                              {formData.service || data.service_placeholder}
                            </span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 text-[#c58c2b] shrink-0 transition-transform duration-300 ${
                              isDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Hidden input for HTML validation */}
                        <input
                          type="text"
                          required
                          value={formData.service}
                          onChange={() => {}}
                          className="sr-only"
                          tabIndex={-1}
                        />

                        {/* Floating Animated Dropdown Menu */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              role="listbox"
                              className="absolute left-0 right-0 top-full mt-2 z-50 max-h-60 overflow-y-auto rounded-2xl border border-[#e5dfd5] bg-white p-1.5 shadow-2xl backdrop-blur-md"
                            >
                              {data.service_options.map((opt) => {
                                const isSelected = formData.service === opt;
                                return (
                                  <li
                                    key={opt}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                      setFormData({ ...formData, service: opt });
                                      setIsDropdownOpen(false);
                                    }}
                                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#fbf7f0] text-[#c58c2b] font-semibold'
                                        : 'text-[#2c3545] hover:bg-[#fbf8f2] hover:text-[#c58c2b]'
                                    }`}
                                  >
                                    <span>{opt}</span>
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
                    </div>

                    {/* Row 3: Description Textarea */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#0c1524] mb-1.5">
                        {data.description_label || 'Description'}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-start rounded-xl border border-[#d8d0c5] bg-white px-3.5 py-3 transition-colors focus-within:border-[#c58c2b] focus-within:ring-1 focus-within:ring-[#c58c2b]">
                        <MessageSquare className="h-4 w-4 text-[#6b7280] mr-2.5 mt-0.5 shrink-0" />
                        <textarea
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder={
                            data.description_placeholder || data.message_placeholder
                          }
                          className="w-full bg-transparent text-sm text-[#0c1524] placeholder:text-[#9ca3af] outline-hidden resize-none min-h-[90px]"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-2 flex justify-center">
                      <button
                        type="submit"
                        className="group flex items-center justify-center gap-2 rounded-full bg-[#b87b20] hover:bg-[#a36b16] text-white py-3.5 px-10 text-sm sm:text-base font-semibold shadow-md shadow-[#b87b20]/20 hover:shadow-xl hover:shadow-[#b87b20]/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer w-full sm:w-auto min-w-[220px]"
                      >
                        <span>{data.button_text}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Horizontal Info Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-16 w-full rounded-2xl sm:rounded-full bg-[#f6f5ef] border border-[#e5e1d5] p-5 sm:px-8 sm:py-5 shadow-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#e2ded2] items-center">
            {data.info_cards.map((card, idx) => (
              <div
                key={card.title}
                className={`flex items-center gap-3.5 sm:gap-4 ${
                  idx > 0 ? 'lg:pl-6' : ''
                } ${idx < data.info_cards.length - 1 ? 'lg:pr-6' : ''}`}
              >
                {/* Dark Forest Container with Gold Icon */}
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-[#0e2a22] flex items-center justify-center text-[#c58c2b] shrink-0 shadow-xs">
                  {getInfoIcon(card.icon)}
                </div>

                {/* Card Title & Content */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-base font-bold text-[#0c1524]">
                    {card.title}
                  </span>

                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? '_blank' : undefined}
                      rel={card.external ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-1 text-xs text-[#555e6d] hover:text-[#c58c2b] transition-colors truncate"
                    >
                      <span className="truncate">{card.text}</span>
                      {card.external && (
                        <ExternalLink className="h-3 w-3 shrink-0 text-[#c58c2b]" />
                      )}
                    </a>
                  ) : (
                    <span className="text-xs text-[#555e6d] leading-snug">
                      {card.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
