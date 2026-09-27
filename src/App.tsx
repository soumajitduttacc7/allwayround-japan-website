/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import fujiDayBackground from './assets/fuji_chureito.jpg';
import fujiNightBackground from './assets/fuji_chureito_night.jpg';
import { ParticleCanvas } from './components/ParticleCanvas';
import {
  POPULAR_PACKAGES,
  SAMPLE_ITINERARY,
  TESTIMONIALS,
  GALLERY_IMAGES,
  FAQS,
  PackageItem,
} from './data/japanData';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [packagesFilter, setPackagesFilter] = useState<string>('All');

  // Contact / Enquiry Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: 'Golden Route (Tokyo, Kyoto, Osaka, Mt Fuji)',
    travelMonth: 'Spring Cherry Blossom (March - May)',
    groupSize: '2 Adults (Couple / Honeymoon)',
    dietaryPreference: 'Pure Vegetarian / Jain Food Guaranteed',
    budgetRange: '₹1.5L - ₹2.5L per person',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Parallax / subtle float state for the Glassmorphism Navbar
  const [navFloat, setNavFloat] = useState<{ y: number; r: number }>({ y: 0, r: 0 });

  const nightVideoRef = useRef<HTMLVideoElement | null>(null);
  const dayVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      if (nightVideoRef.current) {
        nightVideoRef.current.play().catch(() => {});
      }
    } else {
      if (dayVideoRef.current) {
        dayVideoRef.current.play().catch(() => {});
      }
    }
  }, [isDarkMode]);

  // Slow continuous parallax float for top navigation bar
  useEffect(() => {
    let animId: number;
    let t = 0;
    const animateNav = () => {
      t += 0.018;
      const y = Math.sin(t) * 2.5;
      const r = Math.sin(t * 0.7) * 0.25;
      setNavFloat({ y, r });
      animId = requestAnimationFrame(animateNav);
    };
    animId = requestAnimationFrame(animateNav);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleTheme = () => {
    setIsTransitioning(true);
    setIsDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        destination: 'Golden Route (Tokyo, Kyoto, Osaka, Mt Fuji)',
        travelMonth: 'Spring Cherry Blossom (March - May)',
        groupSize: '2 Adults (Couple / Honeymoon)',
        dietaryPreference: 'Pure Vegetarian / Jain Food Guaranteed',
        budgetRange: '₹1.5L - ₹2.5L per person',
        message: '',
      });
    }, 5000);
  };

  const currentYear = new Date().getFullYear();

  const filteredPackages =
    packagesFilter === 'All'
      ? POPULAR_PACKAGES
      : POPULAR_PACKAGES.filter((p) => p.category === packagesFilter);

  // Dynamic Theme-Adaptive Color Tokens
  // Day / Light Theme: Crisp, high-contrast, deep sapphire/charcoal text, luminous porcelain-glass cards
  // Night / Dark Theme: Ethereal glowing white, platinum headings, slate secondary text, deep obsidian glass cards
  const theme = {
    // Top-level text & background
    headingText: isDarkMode ? 'text-white' : 'text-slate-900',
    bodyText: isDarkMode ? 'text-slate-300' : 'text-slate-700',
    mutedText: isDarkMode ? 'text-slate-400' : 'text-slate-500',
    subtleText: isDarkMode ? 'text-slate-500' : 'text-slate-600',
    
    // Card & section surfaces
    cardBg: isDarkMode
      ? 'bg-slate-900/80 border-white/10'
      : 'bg-white/85 border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)]',
    cardInnerBg: isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/90',
    cardHoverBorder: isDarkMode ? 'hover:border-rose-500/50' : 'hover:border-rose-500/60',
    
    // Header & Navigation
    navBg: isDarkMode ? 'rgba(3, 7, 18, 0.82)' : 'rgba(255, 255, 255, 0.88)',
    navBorder: isDarkMode ? 'border-white/10' : 'border-slate-200/90',
    navText: isDarkMode ? 'text-slate-300 hover:text-rose-400' : 'text-slate-700 hover:text-rose-600',
    navDropdownBg: isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200 shadow-2xl',
    navDropdownItemText: isDarkMode ? 'text-slate-200 hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100',
    
    // Strips & full sections
    sectionDividerBg: isDarkMode ? 'bg-slate-950/80 border-white/10' : 'bg-white/80 border-slate-200/80',
    sectionMutedBg: isDarkMode ? 'bg-slate-950/60 border-white/10' : 'bg-slate-100/70 border-slate-200/70',
    
    // Inputs & Form elements
    inputBg: isDarkMode ? 'bg-white/5 border-white/15 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400',
    selectBg: isDarkMode ? 'bg-slate-900 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900',
    inputLabel: isDarkMode ? 'text-slate-300' : 'text-slate-700',
    
    // Highlights & Accents
    accentRedText: isDarkMode ? 'text-rose-400' : 'text-rose-600',
    accentGoldText: isDarkMode ? 'text-amber-400' : 'text-amber-600',
    badgeBg: isDarkMode ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-700',
    
    // Filter pills
    filterInactive: isDarkMode
      ? 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-sm',
      
    // Footer
    footerBg: isDarkMode ? 'bg-slate-950/90 border-white/10' : 'bg-white/90 border-slate-200',
    footerText: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    footerHeading: isDarkMode ? 'text-white' : 'text-slate-900',
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 selection:bg-rose-500 selection:text-white ${
        isDarkMode ? 'text-slate-100 bg-[#030712]' : 'text-slate-900 bg-[#f8fafc]'
      }`}
    >
      {/* =========================================================================
          PERSISTENT BACKGROUND LAYERS: Google Flow Day & Night Live Motion Video
          (Background is fully preserved as required)
      ========================================================================= */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        {/* Light Mode Layer: Daytime Chureito Pagoda, Blossoms & Fuji Video from Google Flow */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: isDarkMode ? 0 : 1,
            transform: isDarkMode ? 'scale(1.04)' : 'scale(1.0)',
            zIndex: 1,
          }}
        >
          <video
            ref={dayVideoRef}
            src="/fuji_day.mp4"
            poster={fujiDayBackground}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 38%',
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Dark Mode Layer: Starry Night with Crescent Moon, Pagoda & Glowing City Video from Google Flow */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: isDarkMode ? 1 : 0,
            transform: isDarkMode ? 'scale(1.0)' : 'scale(1.04)',
            zIndex: 2,
          }}
        >
          <video
            ref={nightVideoRef}
            src="/fuji_night.mp4"
            poster={fujiNightBackground}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 42%',
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Transition Sky Bloom Flare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            zIndex: 3,
            opacity: isTransitioning ? (isDarkMode ? 0.45 : 0.6) : 0,
            background: isDarkMode
              ? 'radial-gradient(circle at 65% 25%, rgba(147, 197, 253, 0.4) 0%, rgba(59, 130, 246, 0.15) 35%, transparent 70%)'
              : 'radial-gradient(circle at 65% 25%, rgba(254, 240, 138, 0.45) 0%, rgba(249, 115, 22, 0.2) 40%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Dynamic Dark and Light Mode Backdrop Gradients for Reading Contrast */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            zIndex: 4,
            opacity: isDarkMode ? 0.92 : 0.65,
            background: isDarkMode
              ? 'radial-gradient(circle at 50% 15%, rgba(3, 7, 18, 0.3) 0%, rgba(3, 7, 18, 0.78) 50%, rgba(3, 7, 18, 0.98) 100%)'
              : 'radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.25) 0%, rgba(248, 250, 252, 0.85) 55%, rgba(241, 245, 249, 0.97) 100%)',
          }}
        />
      </div>

      {/* Subtle Drifting Particles Layer */}
      <ParticleCanvas isDarkMode={isDarkMode} />

      {/* =========================================================================
          1. STICKY HEADER (Glassmorphic with parallax float, Dropdowns, Logo, CTA & Hamburger)
      ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 transition-all duration-300 backdrop-blur-xl border-b ${theme.navBorder}`}
        style={{
          backgroundColor: theme.navBg,
          boxShadow: isDarkMode ? '0 10px 30px -5px rgba(0,0,0,0.6)' : '0 4px 20px -2px rgba(0,0,0,0.06)',
          transform: `translateY(${navFloat.y}px) rotate(${navFloat.r}deg)`,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo with Japanese Red Sun Accent */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.6)] group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-base tracking-tighter">全</span>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-900 animate-pulse-dot" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[17px] font-bold tracking-tight flex items-center gap-1 font-serif-elegant transition-colors ${theme.headingText}`}>
                allwayround
                <span className="text-[11px] px-1.5 py-0.2 bg-rose-600/30 text-rose-500 font-sans font-medium rounded border border-rose-500/40">
                  JAPAN
                </span>
              </span>
              <span className={`text-[10px] tracking-wider uppercase font-sans transition-colors ${theme.mutedText}`}>
                Curated for Indian Travelers
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium">
            <a href="#hero" className={`transition-colors ${theme.navText}`}>
              Home
            </a>

            {/* Packages Dropdown */}
            <div className="relative group py-2">
              <button
                type="button"
                className={`flex items-center gap-1 transition-colors cursor-pointer ${theme.navText}`}
              >
                <span>Packages</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full left-0 hidden group-hover:block w-64 p-2 rounded-xl backdrop-blur-2xl transition-colors ${theme.navDropdownBg}`}>
                <a href="#packages" onClick={() => setPackagesFilter('Classic')} className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>
                  <div className={`font-semibold ${theme.headingText}`}>Golden Route Tour</div>
                  <div className={`text-[11px] ${theme.mutedText}`}>Tokyo, Mt. Fuji, Kyoto, Osaka</div>
                </a>
                <a href="#packages" onClick={() => setPackagesFilter('Explorer')} className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>
                  <div className={`font-semibold ${theme.headingText}`}>Tokyo City Explorer</div>
                  <div className={`text-[11px] ${theme.mutedText}`}>Shibuya, Shinjuku, teamLab</div>
                </a>
                <a href="#packages" onClick={() => setPackagesFilter('Culture')} className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>
                  <div className={`font-semibold ${theme.headingText}`}>Kyoto & Osaka Heritage</div>
                  <div className={`text-[11px] ${theme.mutedText}`}>Temples, Geishas & Nara Deers</div>
                </a>
                <a href="#packages" onClick={() => setPackagesFilter('Nature')} className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>
                  <div className={`font-semibold ${theme.headingText}`}>Mt. Fuji & Onsen Escape</div>
                  <div className={`text-[11px] ${theme.mutedText}`}>Ryokan stays with hot springs</div>
                </a>
                <a href="#packages" onClick={() => setPackagesFilter('Romance')} className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>
                  <div className={`font-semibold ${theme.headingText}`}>Luxury Honeymoon</div>
                  <div className={`text-[11px] ${theme.mutedText}`}>Private couple shoots & dining</div>
                </a>
              </div>
            </div>

            {/* Destinations Dropdown */}
            <div className="relative group py-2">
              <button
                type="button"
                className={`flex items-center gap-1 transition-colors cursor-pointer ${theme.navText}`}
              >
                <span>Destinations</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute top-full left-0 hidden group-hover:block w-52 p-2 rounded-xl backdrop-blur-2xl transition-colors ${theme.navDropdownBg}`}>
                <a href="#gallery" className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>Tokyo Metropolitan</a>
                <a href="#gallery" className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>Kyoto Heritage</a>
                <a href="#gallery" className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>Osaka Kitchen of Japan</a>
                <a href="#gallery" className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>Mt. Fuji & Hakone</a>
                <a href="#gallery" className={`block px-3 py-2 rounded-lg text-xs transition-colors ${theme.navDropdownItemText}`}>Hokkaido Snow & Blossoms</a>
              </div>
            </div>

            <a href="#visa" className={`transition-colors ${theme.navText}`}>
              Visa Assistance
            </a>
            <a href="#why-us" className={`transition-colors ${theme.navText}`}>
              About Us
            </a>
            <a href="#itinerary" className={`transition-colors ${theme.navText}`}>
              Itinerary
            </a>
            <a href="#enquiry" className={`transition-colors ${theme.navText}`}>
              Contact
            </a>
          </nav>

          {/* Right Action Controls: Day/Night Mode + Enquire CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Day / Night Scene Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to daytime theme' : 'Switch to nighttime theme'}
              className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium backdrop-blur-md transition-all duration-300 ${
                isDarkMode
                  ? 'border-white/15 bg-white/5 hover:bg-white/10 text-slate-300'
                  : 'border-slate-300 bg-white/80 hover:bg-white text-slate-800 shadow-sm'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-500 shadow-sm"
                style={{
                  backgroundColor: isDarkMode ? '#3b82f6' : '#f59e0b',
                }}
              >
                {isDarkMode ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                    <circle cx="12" cy="12" r="5" />
                  </svg>
                )}
              </span>
              <span>{isDarkMode ? 'Night' : 'Day'}</span>
            </button>

            {/* Enquire Now CTA Button with Shimmer */}
            <a
              href="#enquiry"
              className="relative overflow-hidden inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-lg font-medium text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-semibold shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <span className="absolute inset-0 pointer-events-none w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
              <span className="relative z-10 flex items-center gap-1.5 font-semibold">
                Enquire Now
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            {/* Hamburger Button (Secondary / Utility navigation) */}
            <button
              type="button"
              onClick={() => setIsHamburgerOpen(true)}
              aria-label="Open secondary navigation menu"
              className={`cursor-pointer p-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800 shadow-sm'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          FULL-SCREEN HAMBURGER MENU (Completely transparent glassmorphism so background video is clearly visible)
      ========================================================================= */}
      {isHamburgerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 animate-fade-in"
          style={{
            // Completely transparent with subtle atmospheric tint and delicate blur so the video shines through
            backgroundColor: isDarkMode ? 'rgba(2, 6, 23, 0.38)' : 'rgba(255, 255, 255, 0.32)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full border-b border-white/20 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(225,29,72,0.6)]">
                全
              </div>
              <span className={`text-xl font-bold font-serif-elegant tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]`}>
                allwayround <span className="text-rose-500 font-sans text-xs">JAPAN</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsHamburgerOpen(false)}
              aria-label="Close menu"
              className={`cursor-pointer p-2.5 rounded-full border transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md ${
                isDarkMode
                  ? 'border-white/25 bg-black/40 hover:bg-white/20 text-white'
                  : 'border-slate-300 bg-white/70 hover:bg-white text-slate-900'
              }`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Centered Navigation Links with luminous glass pill highlights and drop-shadows */}
          <div className="max-w-2xl mx-auto w-full my-auto py-8 text-center flex flex-col gap-3 sm:gap-4">
            {[
              { label: 'Home', href: '#hero' },
              { label: 'All Packages', href: '#packages' },
              { label: 'Visa & Documentation', href: '#visa' },
              { label: 'Why Choose Us', href: '#why-us' },
              { label: 'Sample 7-Day Itinerary', href: '#itinerary' },
              { label: 'Testimonials', href: '#testimonials' },
              { label: 'Photo Gallery', href: '#gallery' },
              { label: 'Travel Guide & FAQs', href: '#faq' },
              { label: 'Trip Planner & Contact', href: '#enquiry' },
            ].map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsHamburgerOpen(false)}
                className={`text-2xl sm:text-3xl lg:text-4xl font-serif-elegant py-1 transition-all hover:scale-105 ${
                  isDarkMode
                    ? 'text-white hover:text-rose-400 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
                    : 'text-slate-950 hover:text-rose-600 drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]'
                }`}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {link.label}
              </a>
            ))}

            {/* Quick WhatsApp / Direct Call Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/819000000000?text=Hi%20AllWayRound,%20I%20am%20planning%20a%20trip%20to%20Japan%20from%20India.%20Please%20guide%20me."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(5,150,105,0.5)] backdrop-blur-md"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                </svg>
                WhatsApp Us Now (+81-90-XXXX-XXXX)
              </a>
              <a
                href="tel:+919876543210"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-transform hover:scale-105 border backdrop-blur-md shadow-lg ${
                  isDarkMode
                    ? 'border-white/25 bg-black/40 hover:bg-white/20 text-white'
                    : 'border-slate-300 bg-white/70 hover:bg-white text-slate-900'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Delhi Concierge (+91-98765-XXXXX)
              </a>
            </div>
          </div>

          <div className={`max-w-5xl mx-auto w-full text-center text-xs border-t border-white/20 pt-4 ${isDarkMode ? 'text-slate-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]' : 'text-slate-700'}`}>
            AllWayRound K.K. Tokyo & New Delhi &bull; Registered Japan Tour Operator License No. 3-8192
          </div>
        </div>
      )}

      {/* =========================================================================
          2. HERO SECTION (Visuals from day/night video background, tagline, CTAs)
      ========================================================================= */}
      <section
        id="hero"
        className="relative z-10 w-full min-h-[92vh] flex flex-col justify-end items-center px-4 sm:px-6 pt-32 pb-16"
      >
        <div className="max-w-4xl mx-auto w-full text-center animate-fade-in-up">
          {/* Animated Status Pill */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-6 shadow-xl backdrop-blur-md transition-colors ${
              isDarkMode
                ? 'border-rose-500/30 bg-slate-900/80 text-rose-200'
                : 'border-rose-300 bg-white/90 text-rose-800 shadow-md'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse-dot" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              Tokyo-Based Specialists &bull; 100% Indian Traveler Focused
            </span>
          </div>

          {/* Hero Headline */}
          <h1
            className={`allwayround-hero-h1 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 transition-colors ${
              isDarkMode
                ? 'text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]'
                : 'text-slate-950 drop-shadow-[0_2px_20px_rgba(255,255,255,0.8)]'
            }`}
          >
            Experience Japan with <br />
            <span
              className={`font-serif-elegant italic ${
                isDarkMode
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-amber-600'
              }`}
            >
              Absolute Peace of Mind.
            </span>
          </h1>

          {/* Hero Subtext */}
          <p
            className={`text-base sm:text-xl font-normal max-w-2xl mx-auto mb-10 leading-relaxed transition-colors ${
              isDarkMode
                ? 'text-slate-200 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]'
                : 'text-slate-800 drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)] font-medium'
            }`}
          >
            Handcrafted Japan tours curated for Indian families, couples, and groups. Pure vegetarian & Jain dining, seamless visa assistance, and English & Hindi speaking tour concierges in Tokyo.
          </p>

          {/* Hero CTA Buttons */}
          <div className="hero-button-group flex items-center justify-center gap-4">
            <a
              href="#packages"
              className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-medium text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-semibold shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all text-sm sm:text-base group"
            >
              <span className="absolute inset-0 pointer-events-none w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                View Japan Packages
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            <a
              href="#enquiry"
              className={`inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold backdrop-blur-xl hover:scale-105 active:scale-95 transition-all text-sm sm:text-base shadow-xl border ${
                isDarkMode
                  ? 'text-white border-white/30 bg-white/10 hover:bg-white/20'
                  : 'text-slate-900 border-slate-300 bg-white/90 hover:bg-white shadow-md'
              }`}
            >
              Plan My Japan Trip
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. TRUST BAR (Small strip of 4 key value props)
      ========================================================================= */}
      <section className={`relative z-20 w-full py-6 backdrop-blur-xl border-y transition-colors ${theme.sectionDividerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className={`text-sm font-bold transition-colors ${theme.headingText}`}>100% Vegetarian & Jain</div>
              <div className={`text-xs transition-colors ${theme.mutedText}`}>Guaranteed onion/garlic-free meals</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className={`text-sm font-bold transition-colors ${theme.headingText}`}>Guaranteed Japan Visa</div>
              <div className={`text-xs transition-colors ${theme.mutedText}`}>Complete documentation & 99.4% rate</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <div className={`text-sm font-bold transition-colors ${theme.headingText}`}>Hindi & English Guides</div>
              <div className={`text-xs transition-colors ${theme.mutedText}`}>24/7 bilingual on-ground tour support</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <div className={`text-sm font-bold transition-colors ${theme.headingText}`}>500+ Indian Travelers</div>
              <div className={`text-xs transition-colors ${theme.mutedText}`}>Rated 4.9/5 stars across India</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. POPULAR PACKAGES (Grid of cards with categories, price, duration)
      ========================================================================= */}
      <section id="packages" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
            Handcrafted Vacations
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
            Curated Japan Travel Packages
          </h2>
          <p className={`text-sm sm:text-base transition-colors ${theme.mutedText}`}>
            Every itinerary includes 4★/5★ central hotels, bullet train passes, daily Indian breakfasts & dinners, and full visa support.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {['All', 'Classic', 'Explorer', 'Culture', 'Nature', 'Romance', 'Group'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPackagesFilter(cat)}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  packagesFilter === cat
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                    : theme.filterInactive
                }`}
              >
                {cat === 'All' ? 'All Packages' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group rounded-2xl overflow-hidden border backdrop-blur-xl flex flex-col hover:-translate-y-1.5 transition-all duration-300 shadow-xl ${theme.cardBg} ${theme.cardHoverBorder}`}
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-slate-950 via-transparent to-transparent' : 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent'}`} />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-600 text-white shadow-md">
                  {pkg.tag}
                </span>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/20">
                    ⏱ {pkg.duration}
                  </span>
                  {pkg.isVegetarianGuaranteed && (
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                      🌱 Veg / Jain
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`text-xl font-bold font-serif-elegant group-hover:text-rose-500 transition-colors mb-2 ${theme.headingText}`}>
                    {pkg.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.destinations.map((d) => (
                      <span
                        key={d}
                        className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                          isDarkMode
                            ? 'text-slate-400 bg-white/5 border-white/5'
                            : 'text-slate-600 bg-slate-100 border-slate-200'
                        }`}
                      >
                        📍 {d}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-1.5 mb-6">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className={`flex items-start gap-2 text-xs transition-colors ${theme.bodyText}`}>
                        <span className="text-rose-500 shrink-0 font-bold">✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`border-t pt-4 flex items-center justify-between transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <div>
                    <span className={`text-[11px] block transition-colors ${theme.mutedText}`}>Starting from</span>
                    <span className="text-lg font-bold text-amber-500">{pkg.priceInr}</span>
                    <span className={`text-[10px] block transition-colors ${theme.subtleText}`}>per person + GST</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                      isDarkMode
                        ? 'bg-white/10 hover:bg-rose-600 text-white border-white/15'
                        : 'bg-slate-900 hover:bg-rose-600 text-white border-slate-900 shadow-sm'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. WHY CHOOSE US (4 feature blocks: Visa, Expertise, Food, Custom)
      ========================================================================= */}
      <section id="why-us" className={`relative z-10 py-20 px-4 sm:px-8 border-y backdrop-blur-xl transition-colors ${theme.sectionMutedBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
              The AllWayRound Advantage
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
              Why Indian Travelers Choose Us
            </h2>
            <p className={`text-sm sm:text-base transition-colors ${theme.mutedText}`}>
              Headquartered in Tokyo with our guest liaison offices in Delhi and Mumbai, we eliminate all language and cultural friction for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-2xl border backdrop-blur-lg hover:border-rose-500/40 transition-all ${theme.cardBg}`}>
              <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center text-xl mb-4 border border-rose-500/30">
                🛂
              </div>
              <h3 className={`text-lg font-bold mb-2 font-serif-elegant ${theme.headingText}`}>Complete Visa Guarantee</h3>
              <p className={`text-xs leading-relaxed ${theme.bodyText}`}>
                Official Ministry of Foreign Affairs (MOFA) verified travel vouchers, embassy cover letters, and document scrutiny for guaranteed approvals.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border backdrop-blur-lg hover:border-emerald-500/40 transition-all ${theme.cardBg}`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-500 flex items-center justify-center text-xl mb-4 border border-emerald-500/30">
                🍲
              </div>
              <h3 className={`text-lg font-bold mb-2 font-serif-elegant ${theme.headingText}`}>Pure Veg & Jain Feasts</h3>
              <p className={`text-xs leading-relaxed ${theme.bodyText}`}>
                Never worry about fish broth, pork, or onion/garlic. Enjoy hot rotis, daal, paneer, and authentic Japanese vegetarian tempura pre-vetted daily.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border backdrop-blur-lg hover:border-amber-500/40 transition-all ${theme.cardBg}`}>
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center text-xl mb-4 border border-amber-500/30">
                🏯
              </div>
              <h3 className={`text-lg font-bold mb-2 font-serif-elegant ${theme.headingText}`}>Local Tokyo Expertise</h3>
              <p className={`text-xs leading-relaxed ${theme.bodyText}`}>
                Direct hotel partnerships across Tokyo, Kyoto & Osaka provide wholesale tariff discounts, bullet train passes, and zero middleman markups.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border backdrop-blur-lg hover:border-blue-500/40 transition-all ${theme.cardBg}`}>
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center text-xl mb-4 border border-blue-500/30">
                ✨
              </div>
              <h3 className={`text-lg font-bold mb-2 font-serif-elegant ${theme.headingText}`}>Bespoke Customization</h3>
              <p className={`text-xs leading-relaxed ${theme.bodyText}`}>
                From private Ryokan hot-springs overlooking Mt. Fuji to anime tours in Akihabara, we build itineraries around your family’s exact pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SAMPLE ITINERARY PREVIEW (Day-wise breakdown: 7-Day Golden Route)
      ========================================================================= */}
      <section id="itinerary" className="relative z-10 py-24 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
            Day-by-Day Walkthrough
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
            Sample 7-Day Tokyo, Kyoto & Osaka Itinerary
          </h2>
          <p className={`text-sm sm:text-base transition-colors ${theme.mutedText}`}>
            See how smoothly your vacation is paced from touch-down to takeoff.
          </p>
        </div>

        <div className="relative border-l-2 border-rose-500/30 ml-4 sm:ml-8 space-y-10">
          {SAMPLE_ITINERARY.map((day) => (
            <div key={day.day} className="relative pl-6 sm:pl-10 group">
              {/* Dot Icon */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-rose-500 group-hover:scale-125 group-hover:bg-rose-500 transition-all" />

              <div className={`p-6 rounded-2xl border backdrop-blur-xl transition-all shadow-md ${theme.cardBg} ${theme.cardHoverBorder}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
                    {day.day}
                  </span>
                  <span className="text-xs text-amber-500 font-semibold">
                    🍽 {day.meals}
                  </span>
                </div>
                <h3 className={`text-lg font-bold font-serif-elegant mb-2 ${theme.headingText}`}>
                  {day.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${theme.bodyText}`}>
                  {day.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold text-sm shadow-xl shadow-rose-900/40 hover:scale-105 transition-all"
          >
            Customize this 7-Day Itinerary for My Family
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* =========================================================================
          7. VISA & DOCUMENTATION HELP SECTION
      ========================================================================= */}
      <section id="visa" className={`relative z-10 py-20 px-4 sm:px-8 border-y backdrop-blur-xl transition-colors ${theme.sectionMutedBg}`}>
        <div
          className={`max-w-5xl mx-auto rounded-3xl border p-8 sm:p-12 shadow-2xl transition-colors ${
            isDarkMode
              ? 'border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-slate-900/80'
              : 'border-rose-200 bg-gradient-to-b from-rose-50/90 to-white'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                Hassle-Free Japan Tourist Visa
              </span>
              <h2 className={`text-3xl sm:text-4xl font-bold font-serif-elegant mt-2 mb-4 transition-colors ${theme.headingText}`}>
                Assistance with Japan Visa for Indian Passport Holders
              </h2>
              <p className={`text-sm leading-relaxed mb-6 transition-colors ${theme.bodyText}`}>
                Applying for a Japan tourist visa from India is simple when you have an accredited Tokyo operator. AllWayRound provides all official Ministry of Foreign Affairs (MOFA) verified invitation letters, day-wise itineraries, and confirmed hotel vouchers required by VFS Global.
              </p>

              <div className="space-y-3 mb-8">
                <div className={`flex items-center gap-3 text-xs sm:text-sm transition-colors ${theme.bodyText}`}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-bold">✓</div>
                  <span>eVisa & Physical Sticker Visa guidance for all Indian cities</span>
                </div>
                <div className={`flex items-center gap-3 text-xs sm:text-sm transition-colors ${theme.bodyText}`}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-bold">✓</div>
                  <span>Review of ITR and bank statements to ensure zero rejections</span>
                </div>
                <div className={`flex items-center gap-3 text-xs sm:text-sm transition-colors ${theme.bodyText}`}>
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-bold">✓</div>
                  <span>Average processing time: 4 to 6 working days</span>
                </div>
              </div>

              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl transition-all hover:scale-105"
              >
                Enquire for Visa + Trip Package
              </a>
            </div>

            <div
              className={`p-6 rounded-2xl border space-y-4 transition-colors ${
                isDarkMode
                  ? 'border-white/10 bg-black/40 backdrop-blur-md'
                  : 'border-slate-200 bg-white/95 shadow-md'
              }`}
            >
              <h3 className={`text-sm font-bold uppercase tracking-wider border-b pb-3 transition-colors ${isDarkMode ? 'border-white/10 text-slate-200' : 'border-slate-200 text-slate-800'}`}>
                Standard Document Checklist
              </h3>
              <ul className={`text-xs space-y-2.5 transition-colors ${theme.bodyText}`}>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">📄</span>
                  <span>Original Passport with at least 6 months validity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">📸</span>
                  <span>2 Passport Photographs (2x2 inches, white background, matte finish)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">🏦</span>
                  <span>Last 6 months Bank Statement with bank seal and minimum balance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">📑</span>
                  <span>Last 2 years Income Tax Returns (ITR-V) / Form 16</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">🎌</span>
                  <span><strong className={theme.headingText}>Provided by AllWayRound:</strong> Confirmed daily itinerary, hotel booking vouchers, flight itinerary, and Tokyo operator guarantee letter</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. TESTIMONIALS (Indian traveler reviews, photos, 5-star ratings)
      ========================================================================= */}
      <section id="testimonials" className="relative z-10 py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
            Real Experiences
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
            Loved by 500+ Indian Families & Couples
          </h2>
          <p className={`text-sm sm:text-base transition-colors ${theme.mutedText}`}>
            Read unedited feedback from travelers from Mumbai, Delhi, Bengaluru, and Ahmedabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border backdrop-blur-xl flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-xl ${theme.cardBg}`}
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                  {'★'.repeat(t.rating)}
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed italic mb-6 transition-colors ${theme.bodyText}`}>
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className={`flex items-center gap-3 pt-4 border-t transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-rose-500/40"
                />
                <div>
                  <h4 className={`text-sm font-bold font-serif-elegant ${theme.headingText}`}>{t.name}</h4>
                  <p className={`text-[11px] ${theme.mutedText}`}>{t.city} &bull; {t.tour}</p>
                  <p className="text-[10px] text-rose-500 font-medium">{t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. PHOTO GALLERY (Grid of Japan destination images)
      ========================================================================= */}
      <section id="gallery" className={`relative z-10 py-20 px-4 sm:px-8 border-y backdrop-blur-xl transition-colors ${theme.sectionMutedBg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
              Visual Inspiration
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
              Moments from the Land of the Rising Sun
            </h2>
            <p className={`text-sm sm:text-base transition-colors ${theme.mutedText}`}>
              From sacred Kyoto bamboo groves to dazzling Shibuya crossings and snow-capped Mount Fuji.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-bold text-white font-serif-elegant mb-1">
                    {img.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FAQ ACCORDION (Visa, Budget, Best Time, Food, Currency)
      ========================================================================= */}
      <section id="faq" className="relative z-10 py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
            Everything You Need To Know
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-sm sm:text-base transition-colors ${theme.mutedText}`}>
            Clear answers to common questions about traveling to Japan from India.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border backdrop-blur-xl overflow-hidden transition-all shadow-md ${theme.cardBg}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold font-serif-elegant transition-colors ${theme.headingText}`}>
                    {faq.q}
                  </span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-rose-600 text-white' : (isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-800')
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className={`p-5 pt-0 text-xs sm:text-sm leading-relaxed border-t transition-colors ${isDarkMode ? 'border-white/5' : 'border-slate-200'} ${theme.bodyText}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          11. ENQUIRY / CONTACT FORM (Destination, dates, group size, budget)
      ========================================================================= */}
      <section id="enquiry" className={`relative z-10 py-24 px-4 sm:px-8 border-t backdrop-blur-xl transition-colors ${theme.sectionDividerBg}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg}`}>
              Free Consultation
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold font-serif-elegant mt-4 mb-4 transition-colors ${theme.headingText}`}>
              Plan Your Japan Dream Trip
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto transition-colors ${theme.mutedText}`}>
              Tell us your preferences. Our bilingual Japan specialists will prepare a customized day-by-day itinerary with exact quote within 12 hours.
            </p>
          </div>

          <div className={`rounded-3xl border p-8 sm:p-12 shadow-2xl backdrop-blur-2xl transition-colors ${theme.cardBg}`}>
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 text-3xl flex items-center justify-center mx-auto border border-emerald-500/30 animate-pulse-dot">
                  ✓
                </div>
                <h3 className={`text-2xl font-bold font-serif-elegant ${theme.headingText}`}>
                  Arigato Gozaimasu! Thank you, {formData.fullName || 'Traveler'}!
                </h3>
                <p className={`text-sm max-w-md mx-auto ${theme.bodyText}`}>
                  Our Tokyo and Delhi travel concierges have received your enquiry. We will reach out on WhatsApp / Phone with a detailed day-wise proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.inputBg}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.inputBg}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.inputBg}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      Preferred Travel Month
                    </label>
                    <select
                      value={formData.travelMonth}
                      onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.selectBg}`}
                    >
                      <option>Spring Cherry Blossom (March - May)</option>
                      <option>Summer Holidays (June - August)</option>
                      <option>Autumn Red Foliage (September - November)</option>
                      <option>Winter Snow & Mt Fuji (December - February)</option>
                      <option>Flexible Dates</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      Destinations Interest
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.selectBg}`}
                    >
                      <option>Golden Route (Tokyo, Mt Fuji, Kyoto, Osaka)</option>
                      <option>Tokyo Explorer Only (5-6 Days)</option>
                      <option>Kyoto, Nara & Osaka Culture</option>
                      <option>Hokkaido Nature & Snow</option>
                      <option>Custom Honeymoon Japan</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      Group Size
                    </label>
                    <select
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.selectBg}`}
                    >
                      <option>2 Adults (Couple / Honeymoon)</option>
                      <option>Family with Kids (3-4 Persons)</option>
                      <option>Extended Family / Senior Citizens (5-8 Persons)</option>
                      <option>Group of Friends (4+ Persons)</option>
                      <option>Solo Traveler</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                      Food Preference
                    </label>
                    <select
                      value={formData.dietaryPreference}
                      onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors ${theme.selectBg}`}
                    >
                      <option>Pure Vegetarian / Jain Food Guaranteed</option>
                      <option>Vegetarian + Eggs OK</option>
                      <option>No Dietary Restrictions</option>
                      <option>Halal Certified Dining</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-2 transition-colors ${theme.inputLabel}`}>
                    Any Specific Requests or Questions? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Traveling with senior citizens, need wheelchair assistance, want to experience a private onsen ryokan, anime merchandise shopping, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none ${theme.inputBg}`}
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="relative overflow-hidden cursor-pointer inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <span className="absolute inset-0 pointer-events-none w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
                    <span className="relative z-10 flex items-center gap-2">
                      Get My Free Japan Itinerary & Quote
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                  <p className={`text-[11px] mt-3 transition-colors ${theme.subtleText}`}>
                    🔒 100% Privacy Guaranteed &bull; Zero Spam &bull; No Obligation Consultation
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. FOOTER (Company info, quick links, contact, newsletter)
      ========================================================================= */}
      <footer className={`relative z-20 py-16 px-4 sm:px-8 border-t backdrop-blur-xl transition-colors ${theme.footerBg}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white">
                全
              </div>
              <span className={`text-xl font-bold font-serif-elegant tracking-tight ${theme.footerHeading}`}>
                allwayround <span className="text-rose-500 font-sans text-xs">JAPAN</span>
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${theme.footerText}`}>
              AllWayRound K.K. is a licensed Tokyo inbound tour operator specializing in handcrafted, vegetarian-friendly Japan tours for travelers from India.
            </p>
            <div className="text-xs space-y-1">
              <div className={`font-semibold ${theme.footerHeading}`}>Tokyo HQ:</div>
              <div className={theme.footerText}>Roppongi Hills Mori Tower 18F, Minato-ku, Tokyo 106-6118, Japan</div>
              <div className={`font-semibold mt-2 ${theme.footerHeading}`}>Delhi Liaison:</div>
              <div className={theme.footerText}>Connaught Place, New Delhi 110001, India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.footerHeading}`}>
              Japan Packages
            </h4>
            <ul className={`space-y-2 text-xs ${theme.footerText}`}>
              <li><a href="#packages" className="hover:text-rose-500 transition-colors">The Grand Golden Route (8 Days)</a></li>
              <li><a href="#packages" className="hover:text-rose-500 transition-colors">Tokyo City Explorer (5 Days)</a></li>
              <li><a href="#packages" className="hover:text-rose-500 transition-colors">Kyoto & Osaka Heritage (6 Days)</a></li>
              <li><a href="#packages" className="hover:text-rose-500 transition-colors">Mt. Fuji & Onsen Escape (4 Days)</a></li>
              <li><a href="#packages" className="hover:text-rose-500 transition-colors">Romantic Japan Honeymoon (9 Days)</a></li>
              <li><a href="#packages" className="hover:text-rose-500 transition-colors">Sakura Blossom Special Tour</a></li>
            </ul>
          </div>

          {/* Helpful Information */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.footerHeading}`}>
              Travel Assistance
            </h4>
            <ul className={`space-y-2 text-xs ${theme.footerText}`}>
              <li><a href="#visa" className="hover:text-rose-500 transition-colors">Japan Visa for Indian Citizens</a></li>
              <li><a href="#why-us" className="hover:text-rose-500 transition-colors">Pure Vegetarian & Jain Food in Japan</a></li>
              <li><a href="#itinerary" className="hover:text-rose-500 transition-colors">Sample 7-Day Day-wise Itinerary</a></li>
              <li><a href="#faq" className="hover:text-rose-500 transition-colors">Currency, eSIM & JR Pass Guide</a></li>
              <li><button type="button" onClick={() => setActiveModal('privacy')} className="hover:text-rose-500 transition-colors cursor-pointer">Privacy Policy</button></li>
              <li><button type="button" onClick={() => setActiveModal('terms')} className="hover:text-rose-500 transition-colors cursor-pointer">Terms of Service</button></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme.footerHeading}`}>
              Japan Travel Insider
            </h4>
            <p className={`text-xs leading-relaxed mb-4 ${theme.footerText}`}>
              Subscribe to receive cherry blossom forecast alerts, autumn foliage guides, and exclusive group departure discounts for Indian travelers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`px-3 py-2 rounded-lg text-xs flex-1 focus:outline-none focus:border-rose-500 ${theme.inputBg}`}
              />
              <button
                type="button"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
            <div className={`mt-4 flex items-center gap-3 text-xs ${theme.footerText}`}>
              <span className="text-xs">Follow us:</span>
              <span className="hover:text-rose-500 cursor-pointer">Instagram</span>
              <span className="hover:text-rose-500 cursor-pointer">YouTube</span>
              <span className="hover:text-rose-500 cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] transition-colors ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-500'}`}>
          <div>&copy; {currentYear} AllWayRound K.K. All rights reserved. Registered Travel Agency.</div>
          <div className="flex items-center gap-4">
            <span>Tokyo &bull; Kyoto &bull; Osaka &bull; New Delhi &bull; Mumbai</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          PACKAGE DETAILS MODAL
      ========================================================================= */}
      {selectedPackage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPackage(null)}
        >
          <div
            className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 text-left shadow-2xl transition-colors ${
              isDarkMode
                ? 'border-white/15 bg-slate-900 text-slate-200'
                : 'border-slate-300 bg-white text-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPackage(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <img
              src={selectedPackage.image}
              alt={selectedPackage.title}
              className="w-full h-56 object-cover rounded-xl mb-6"
            />

            <span className="px-2.5 py-1 rounded bg-rose-600/30 text-rose-500 text-xs font-semibold border border-rose-500/40">
              {selectedPackage.tag}
            </span>
            <h3 className={`text-2xl font-bold font-serif-elegant mt-2 mb-2 ${theme.headingText}`}>
              {selectedPackage.title}
            </h3>
            <p className={`text-sm mb-4 ${theme.mutedText}`}>
              Duration: <strong className={theme.headingText}>{selectedPackage.duration}</strong> &bull; Starting: <strong className="text-amber-500 text-base">{selectedPackage.priceInr}</strong> / person
            </p>

            <div className={`space-y-4 text-xs sm:text-sm border-t pt-4 mb-6 transition-colors ${isDarkMode ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-700'}`}>
              <h4 className={`font-bold uppercase tracking-wider text-xs ${theme.headingText}`}>Package Inclusions:</h4>
              <ul className="space-y-2 list-disc list-inside">
                {selectedPackage.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
                <li>4★ / 5★ centrally located hotel accommodations</li>
                <li>Japan Rail Pass / Bullet Train (Shinkansen) intercity tickets</li>
                <li>Daily breakfast & specialized pure vegetarian / Jain dinners</li>
                <li>Full Japan Tourist Visa documentation & invitation dossier</li>
                <li>24/7 on-ground WhatsApp concierge in English and Hindi</li>
              </ul>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t transition-colors ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <a
                href="#enquiry"
                onClick={() => setSelectedPackage(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg hover:brightness-110"
              >
                Book / Inquire for this Package
              </a>
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer ${
                  isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LEGAL MODAL (Privacy & Terms)
      ========================================================================= */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className={`relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl border p-6 text-left shadow-2xl transition-colors ${
              isDarkMode
                ? 'border-white/10 bg-[#0e121b] text-neutral-300'
                : 'border-slate-300 bg-white text-slate-700'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <h2 className={`text-base font-semibold ${theme.headingText}`}>
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="cursor-pointer text-neutral-400 hover:text-rose-500 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed">
              {activeModal === 'privacy' ? (
                <>
                  <p>AllWayRound K.K. is dedicated to protecting the privacy of our travelers.</p>
                  <p><strong className={theme.headingText}>Passport Data:</strong> Personal identification provided for Japan Visa issuance is stored on encrypted, secure servers and processed strictly with authorized diplomatic channels.</p>
                  <p><strong className={theme.headingText}>No Third-party Sharing:</strong> We do not sell or lease your contact information.</p>
                </>
              ) : (
                <>
                  <p>Booking with AllWayRound implies agreement to our standard Japan tour operator conditions.</p>
                  <p><strong className={theme.headingText}>Reservations & Payments:</strong> Booking deposits are secured in INR or JPY. Visas are subject to final consular review.</p>
                  <p><strong className={theme.headingText}>Cancellations:</strong> Transparent cancellation schedules apply based on Shinkansen and luxury ryokan advance reservations.</p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={`cursor-pointer px-4 py-2 text-xs font-medium rounded-md ${
                  isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
