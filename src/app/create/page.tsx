'use client';

import GreetingCardGenerator from '@/components/GreetingCardGenerator';
import FloatingActionButton from '@/components/FloatingActionButton';
import MobileQuickActions from '@/components/MobileQuickActions';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Sparkles, Palette, Share2, Download, Zap } from 'lucide-react';

export default function CreatePage() {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'popular':
        window.location.href = '/templates';
        break;
      case 'home':
        window.location.href = '/';
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

  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI-Powered",
      description: "Smart suggestions"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "15+ Templates",
      description: "Premium designs"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Create",
      description: "Ready in seconds"
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: "Easy Share",
      description: "Multiple formats"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact App Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Card</h1>
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Compact Features Strip */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div className="text-xs font-medium text-gray-700">{feature.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Generator Section */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <GreetingCardGenerator />
        </div>
      </section>

      {/* Mobile Components */}
      <FloatingActionButton
        onCreateCard={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onQuickTemplate={() => setShowQuickActions(true)}
      />

      <MobileQuickActions
        isVisible={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        onAction={handleQuickAction}
      />
    </div>
  );
}