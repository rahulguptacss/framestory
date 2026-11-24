import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
}

export interface HeaderData {
  logo_image?: string;
  logo_alt?: string;
  logo_title_dark?: string;
  logo_title_gold?: string;
  logo_sub?: string;
  links: LinkType[];
  button_text: string;
  button_href: string;
  button_icon?: string;
}

export interface FooterData {
  logo_image?: string;
  logo_alt?: string;
  logo_href?: string;
  logo_title_dark?: string;
  logo_title_gold?: string;
  logo_sub?: string;
  brand_name: string;
  brand_title_dark?: string;
  brand_title_gold?: string;
  brand_sub?: string;
  description: string;
  socials: LinkType[];
  links: LinkType[];
  separator?: string;
  copyright: string;
  copyright_start?: string;
  copyright_highlight?: string;
  copyright_end?: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroSectionData {
  id: string;
  eyebrow: string;
  title_line1?: string;
  title_line2?: string;
  title_line3?: string;
  title_start?: string;
  title_highlight?: string;
  title_end?: string;
  description: string;
  description_line1?: string;
  description_line2?: string;
  button_text?: string;
  button_href?: string;
  photographer_image: string;
  polaroid_image: string;
  polaroid_alt?: string;
  background_image?: string;
  background_ridge?: string;
}

export interface AboutStatItem {
  value: string;
  label: string;
  icon: string;
}

export interface AboutSectionData {
  id: string;
  title_start: string;
  title_highlight: string;
  description: string;
  signature_name: string;
  signature_image?: string;
  stats: AboutStatItem[];
}

export interface ServiceItem {
  id: number;
  title: string;
  title_line1?: string;
  title_line2?: string;
  image: string;
}

export interface ServicesSectionData {
  id: string;
  title_start: string;
  title_highlight: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface PortfolioSectionData {
  id: string;
  title_start: string;
  title_highlight: string;
  subtitle: string;
  categories: string[];
  items: PortfolioItem[];
}

export interface TestimonialItem {
  id: number;
  image: string;
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsSectionData {
  id: string;
  title_start: string;
  title_highlight: string;
  subtitle: string;
  auto_slide_interval?: number;
  items: TestimonialItem[];
  image?: string;
  quote?: string;
  author?: string;
  role?: string;
  stars?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionData {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image_main: string;
  image_polaroid: string;
  items: FaqItem[];
}

export interface ContactInfoCard {
  title: string;
  text: string;
  href?: string;
  icon: string;
  external?: boolean;
}

export interface ContactSectionData {
  id: string;
  title_start: string;
  title_highlight: string;
  subtitle: string;
  map_image: string;
  map_address?: string;
  map_embed_url?: string;
  name_label?: string;
  name_placeholder: string;
  email_label?: string;
  email_placeholder: string;
  phone_label?: string;
  phone_placeholder: string;
  service_label?: string;
  service_placeholder: string;
  service_options: string[];
  description_label?: string;
  description_placeholder?: string;
  date_placeholder?: string;
  message_placeholder?: string;
  button_text: string;
  reset_button_text?: string;
  success_title: string;
  success_message: string;
  info_cards: ContactInfoCard[];
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Photography.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;
