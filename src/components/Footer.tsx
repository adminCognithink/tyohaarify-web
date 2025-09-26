'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Heart, Sparkles, Gift, Users } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Create Card', href: '/create' },
    { name: 'Templates', href: '/templates' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Gallery', href: '/#gallery' },
  ];

  const festivals = [
    { name: 'Diwali', slug: 'diwali' },
    { name: 'Christmas', slug: 'christmas' },
    { name: 'Eid', slug: 'eid' },
    { name: 'Holi', slug: 'holi' },
    { name: 'New Year', slug: 'newyear' },
    { name: 'Easter', slug: 'easter' },
    { name: 'Dussehra', slug: 'dussehra' },
    { name: 'Ganesh Chaturthi', slug: 'ganeshchaturthi' }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/tyohaarify', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com/tyohaarify', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/tyohaarify', name: 'Instagram' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:hello@tyohaarify.com', name: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/images/logos/ios/64.png"
                  alt="Tyohaarify Logo"
                  width={48}
                  height={48}
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#e773b4] to-purple-400 bg-clip-text text-transparent">
                  Tyohaarify
                </h3>
                <p className="text-sm text-gray-300">Celebrate Every Festival</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Create beautiful, personalized greeting cards for every festival and celebration. 
              Spread joy and connect with your loved ones through our stunning templates.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#e773b4] to-purple-600 rounded-full mb-2 mx-auto">
                  <Gift className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-[#e773b4]">50+</p>
                <p className="text-xs text-gray-400">Templates</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-2 mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-purple-400">9</p>
                <p className="text-xs text-gray-400">Festivals</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600 to-red-500 rounded-full mb-2 mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-pink-400">1K+</p>
                <p className="text-xs text-gray-400">Happy Users</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-[#e773b4]">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#e773b4] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-[#e773b4] rounded-full"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Festivals */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-purple-400">Festivals</h4>
            <div className="grid grid-cols-2 gap-2">
              {festivals.map((festival) => (
                <Link
                  key={festival.slug}
                  href={`/festival/${festival.slug}`}
                  className="text-sm text-gray-300 hover:text-purple-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/5"
                >
                  {festival.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-pink-400">Connect</h4>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Follow us for festival updates and new templates!
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gradient-to-r from-[#e773b4] to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all duration-200"
                    title={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h5 className="font-semibold text-white mb-2">Get Festival Updates</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#e773b4] text-sm"
                />
                <button className="bg-gradient-to-r from-[#e773b4] to-purple-600 px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} Tyohaarify. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Made with love for celebrations</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[#e773b4] transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#e773b4] transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/support" className="text-gray-400 hover:text-[#e773b4] transition-colors duration-200">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}