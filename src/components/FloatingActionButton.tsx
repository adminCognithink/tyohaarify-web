'use client';

import { useState, useEffect } from 'react';
import { Zap, X, Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingActionButtonProps {
  onCreateCard: () => void;
  onQuickTemplate: () => void;
}

export default function FloatingActionButton({ onCreateCard, onQuickTemplate }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isScrolled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 sm:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 space-y-2"
          >
            <button
              onClick={() => {
                onCreateCard();
                setIsOpen(false);
              }}
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation"
            >
              <Sparkles className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => {
                onQuickTemplate();
                setIsOpen(false);
              }}
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation"
            >
              <Zap className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation ${
          isOpen 
            ? 'bg-gray-500 rotate-45' 
            : 'bg-gradient-to-r from-[#e773b4] to-purple-600'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Plus className="w-7 h-7" />
        )}
      </motion.button>
    </div>
  );
}