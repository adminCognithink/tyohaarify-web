'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Gift, Heart, Search, Bell, Plus } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Create', href: '/create', icon: <Plus className="w-4 h-4" /> },
    { name: 'Templates', href: '/templates', icon: <Gift className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm border-b border-pink-50 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative">
              <Image
                src="/images/logos/ios/128.png"
                alt="Tyohaarify Logo"
                width={48}
                height={48}
                className="rounded-xl shadow-lg"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#e773b4] to-purple-600 bg-clip-text text-transparent">
                Tyohaarify
              </h1>
              <p className="text-sm text-gray-500 -mt-1 hidden sm:block">Festival Greetings Made Easy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#e773b4] transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-pink-50"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/create"
                className="bg-gradient-to-r from-[#e773b4] to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Create Card
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#e773b4] hover:bg-pink-50 rounded-xl transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex-shrink-0">{item.icon}</div>
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="pt-4">
                <Link
                  href="/create"
                  className="flex items-center justify-center w-full bg-gradient-to-r from-[#e773b4] to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Card
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}