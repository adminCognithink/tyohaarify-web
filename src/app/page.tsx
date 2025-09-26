'use client';

import FloatingActionButton from '@/components/FloatingActionButton';
import MobileQuickActions from '@/components/MobileQuickActions';
import UserProfile from '@/components/UserProfile';
import TemplateGallery from '@/components/TemplateGallery';
import SocialShare from '@/components/SocialShare';
import { Notification } from '@/components/UIComponents';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Sparkles, Users, Clock, Download, ArrowRight, Star, Zap, Heart, Share, TrendingUp, PlayCircle, Bell, Settings, User, Lamp, TreePine, Moon, PartyPopper, Palette, Gift, Calendar, CalendarDays } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('features');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }>>([]);

  // Notification ID counter to ensure uniqueness
  const notificationCounter = useRef(0);

  // Add notification function
  const addNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    notificationCounter.current += 1;
    const id = `notification_${Date.now()}_${notificationCounter.current}`;
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Check for PWA install prompt
  useEffect(() => {
    let deferredPrompt: any;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install notification
      addNotification('Install Tyohaarify for a better experience!', 'info');
    });

    window.addEventListener('appinstalled', () => {
      addNotification('Thanks for installing Tyohaarify!', 'success');
    });

    // Show notification if service worker is ready
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        addNotification('Offline features enabled!', 'success');
      });
    }
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Suggestions",
      description: "Get personalized message suggestions powered by AI",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Festivals",
      description: "Choose from 9 popular festivals with beautiful templates",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Creation",
      description: "Create stunning cards in just a few minutes",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Multiple Formats",
      description: "Download in PNG, JPEG, PDF, and social media formats",
      color: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, value: "15", label: "Premium Templates", color: "text-yellow-600" },
    { icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />, value: "9", label: "Festivals", color: "text-red-500" },
    { icon: <Share className="w-4 h-4 sm:w-5 sm:h-5" />, value: "1K+", label: "Cards Created", color: "text-blue-500" },
    { icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />, value: "5★", label: "User Rating", color: "text-green-500" }
  ];

  // Upcoming Festivals with dates (2025-2026)
  const upcomingFestivals = [
    {
      name: 'Diwali',
      date: '2025-10-20',
      description: 'Festival of Lights',
      image: '/images/diwali/diwali1.jpeg',
      icon: <Lamp className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      href: '/create?festival=diwali'
    },
    {
      name: 'Christmas',
      date: '2025-12-25',
      description: 'Season of Joy',
      image: '/images/christmas/christmas1.jpg',
      icon: <TreePine className="w-5 h-5" />,
      color: 'from-green-500 to-red-500',
      href: '/create?festival=christmas'
    },
    {
      name: 'New Year',
      date: '2026-01-01',
      description: 'Fresh Beginnings',
      image: '/images/newyear/newyear1.jpg',
      icon: <PartyPopper className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      href: '/create?festival=newyear'
    },
    {
      name: 'Chinese New Year',
      date: '2026-01-29',
      description: 'Lunar Celebration',
      image: '/images/chinesenewyear/chinesenewyear1.jpg',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-red-500 to-yellow-500',
      href: '/create?festival=chinesenewyear'
    },
    {
      name: 'Holi',
      date: '2026-03-13',
      description: 'Festival of Colors',
      image: '/images/holi/holi1.jpg',
      icon: <Palette className="w-5 h-5" />,
      color: 'from-pink-500 to-purple-500',
      href: '/create?festival=holi'
    },
    {
      name: 'Easter',
      date: '2026-04-05',
      description: 'Season of Renewal',
      image: '/images/easter/easter1.jpg',
      icon: <Gift className="w-5 h-5" />,
      color: 'from-blue-500 to-green-500',
      href: '/create?festival=easter'
    }
  ];

  // Filter and sort upcoming festivals
  const getUpcomingFestivals = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    return upcomingFestivals
      .map(festival => {
        const festivalDate = new Date(festival.date);
        const thisYearDate = new Date(currentYear, festivalDate.getMonth(), festivalDate.getDate());
        const nextYearDate = new Date(currentYear + 1, festivalDate.getMonth(), festivalDate.getDate());
        
        // Use this year's date if it's in the future, otherwise next year's date
        const upcomingDate = thisYearDate > today ? thisYearDate : nextYearDate;
        
        return {
          ...festival,
          upcomingDate,
          daysUntil: Math.ceil((upcomingDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
        };
      })
      .sort((a, b) => a.upcomingDate.getTime() - b.upcomingDate.getTime())
      .slice(0, 4); // Show next 4 upcoming festivals
  };

  const nextFestivals = getUpcomingFestivals();

  // Format date helper
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const quickActions = [
    { title: "Diwali Cards", icon: <Lamp className="w-8 h-8 text-yellow-600" />, count: "3 templates", href: "/create?festival=diwali", popular: true },
    { title: "Christmas Cards", icon: <TreePine className="w-8 h-8 text-green-600" />, count: "3 templates", href: "/create?festival=christmas", popular: true },
    { title: "Eid Cards", icon: <Moon className="w-8 h-8 text-blue-600" />, count: "2 templates", href: "/create?festival=eid" },
    { title: "New Year Cards", icon: <PartyPopper className="w-8 h-8 text-purple-600" />, count: "2 templates", href: "/create?festival=newyear" }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create':
        window.location.href = '/create';
        break;
      case 'popular':
        window.location.href = '/templates';
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Tyohaarify - Festival Greeting Maker',
            text: 'Create beautiful festival greeting cards!',
            url: window.location.href
          });
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('App link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <div className="absolute top-10 left-5 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary-300 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-10 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 bg-purple-300 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-16 sm:left-32 w-16 h-16 sm:w-24 sm:h-24 bg-pink-300 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 right-5 sm:right-10 w-10 h-10 sm:w-16 sm:h-16 bg-indigo-300 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Hero Title - Mobile First */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Celebrate
              </span>
              <br />
              <span className="text-gray-800">Every Festival</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Create beautiful, personalized greeting cards for all your favorite festivals. 
              Choose from stunning templates, add your personal touch, and spread joy to your loved ones.
            </p>

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
              <Link
                href="/create"
                className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-bounce-gentle flex items-center justify-center mobile-touch"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Creating Now
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto border-2 border-primary-500 text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-primary-50 transition-all duration-300 flex items-center justify-center mobile-touch"
              >
                View Templates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Features Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInScale border border-pink-100 mobile-card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-2 sm:mb-4 mx-auto`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats - Mobile Grid */}
            <div className="grid grid-cols-2 sm:flex sm:justify-center sm:items-center gap-4 sm:gap-8 lg:gap-12 text-center max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm">
                  <div className={`flex items-center justify-center mb-1 sm:mb-2 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Festivals Section - Enhanced with Images */}
      <section className="py-8 sm:py-16 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Popular Festivals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrate your favorite festivals with our stunning card templates
            </p>
          </div>
          
          {/* Enhanced Festival Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Diwali Card */}
            <Link
              href="/festival/diwali"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  Popular
                </span>
              </div>
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/diwali/diwali1.jpeg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <Lamp className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-xl font-bold">Diwali</h3>
                  </div>
                  <p className="text-sm opacity-90">3 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Festival of Lights</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Christmas Card */}
            <Link
              href="/festival/christmas"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute top-3 right-3 z-10">
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  Popular
                </span>
              </div>
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/christmas/christmas1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <TreePine className="w-6 h-6 text-green-400 mr-2" />
                    <h3 className="text-xl font-bold">Christmas</h3>
                  </div>
                  <p className="text-sm opacity-90">3 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Season of Joy</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Eid Card */}
            <Link
              href="/festival/eid"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/eid/eid1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <Moon className="w-6 h-6 text-blue-400 mr-2" />
                    <h3 className="text-xl font-bold">Eid</h3>
                  </div>
                  <p className="text-sm opacity-90">2 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Blessed Celebration</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* New Year Card */}
            <Link
              href="/festival/newyear"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/newyear/newyear1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <PartyPopper className="w-6 h-6 text-purple-400 mr-2" />
                    <h3 className="text-xl font-bold">New Year</h3>
                  </div>
                  <p className="text-sm opacity-90">2 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Fresh Beginnings</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* Second Row - More Festivals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
            {/* Holi Card */}
            <Link
              href="/festival/holi"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/holi/holi1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <Palette className="w-6 h-6 text-pink-400 mr-2" />
                    <h3 className="text-xl font-bold">Holi</h3>
                  </div>
                  <p className="text-sm opacity-90">2 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Festival of Colors</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Easter Card */}
            <Link
              href="/festival/easter"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/easter/easter1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <Gift className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="text-xl font-bold">Easter</h3>
                  </div>
                  <p className="text-sm opacity-90">2 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Season of Renewal</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Ganesh Chaturthi Card */}
            <Link
              href="/festival/ganeshchaturthi"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/ganeshchaturthi/ganeshchaturthi1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <Heart className="w-6 h-6 text-orange-400 mr-2" />
                    <h3 className="text-xl font-bold">Ganesh Chaturthi</h3>
                  </div>
                  <p className="text-sm opacity-90">2 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Lord of Beginnings</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Chinese New Year Card */}
            <Link
              href="/festival/chinesenewyear"
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/chinesenewyear/chinesenewyear1.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center mb-2">
                    <Sparkles className="w-6 h-6 text-red-400 mr-2" />
                    <h3 className="text-xl font-bold">Chinese New Year</h3>
                  </div>
                  <p className="text-sm opacity-90">2 templates</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">Lunar Celebration</p>
                <div className="flex items-center mt-2 text-primary-600">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>

          {/* View All Festivals Button */}
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/templates"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-lg border border-primary-200"
            >
              Explore All Festivals
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Festivals Section */}
      <section className="py-8 sm:py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4">
              <CalendarDays className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Upcoming Festivals
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plan ahead and create beautiful cards for upcoming celebrations
            </p>
          </div>

          {/* Festival Timeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextFestivals.map((festival, index) => (
              <Link
                key={festival.name}
                href={festival.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                {/* Countdown Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className={`bg-gradient-to-r ${festival.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                    {festival.daysUntil === 0 ? 'Today!' : 
                     festival.daysUntil === 1 ? 'Tomorrow' : 
                     `${festival.daysUntil} days`}
                  </div>
                </div>

                {/* Festival Image */}
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${festival.image}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Festival Details */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${festival.color} text-white mr-3`}>
                      {festival.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{festival.name}</h3>
                      <p className="text-sm text-gray-600">{festival.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-primary-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">
                        {formatDate(festival.upcomingDate)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Festival Calendar CTA */}
          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-primary-100">
              <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Never Miss a Celebration
              </h3>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                Stay prepared with our festival calendar and create stunning cards in advance
              </p>
              <Link
                href="/templates"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
              >
                Browse All Templates
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-8 sm:py-16 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-indigo-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Ready to Create Your 
            <span className="block sm:inline text-primary-600"> Perfect Festival Card?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have created beautiful, personalized greeting cards for their loved ones.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
              href="/create"
              className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-purple-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center mobile-touch animate-pulseGlow"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Start Creating Now
            </Link>
            <Link
              href="/templates"
              className="w-full sm:w-auto border-2 border-primary-500 text-primary-600 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg hover:bg-primary-50 transition-all duration-300 flex items-center justify-center mobile-touch"
            >
              Browse Templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Components */}
      <FloatingActionButton
        onCreateCard={() => window.location.href = '/create'}
        onQuickTemplate={() => setShowQuickActions(true)}
      />

      <MobileQuickActions
        isVisible={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        onAction={handleQuickAction}
      />

      {/* Modals */}
      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
      
      {showTemplateGallery && (
        <TemplateGallery onClose={() => setShowTemplateGallery(false)} />
      )}
      
      {showShareModal && (
        <SocialShare 
          cardImageUrl="/api/placeholder/400/300"
          cardTitle="Tyohaarify Festival Card"
          cardMessage="Check out this amazing festival greeting maker!"
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-40 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </div>
  );
}