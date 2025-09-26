'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const AnimatedCardGenerator = dynamic(
  () => import('@/components/AnimatedCardGenerator'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Animated Card Creator...</p>
        </div>
      </div>
    )
  }
);

export default function CreateAnimatedCardPage() {
  useEffect(() => {
    // Load html2canvas script dynamically
    if (typeof window !== 'undefined' && !(window as any).html2canvas) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return <AnimatedCardGenerator />;
}