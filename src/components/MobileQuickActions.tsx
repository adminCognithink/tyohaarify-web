'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share, Download, Copy, Star, Palette } from 'lucide-react';

interface MobileQuickActionsProps {
  isVisible: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function MobileQuickActions({ isVisible, onClose, onAction }: MobileQuickActionsProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'create',
      name: 'Quick Create',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-600',
      description: 'Create a card in 30 seconds'
    },
    {
      id: 'popular',
      name: 'Popular Templates',
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600',
      description: 'Browse trending designs'
    },
    {
      id: 'favorites',
      name: 'My Favorites',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600',
      description: 'Your saved templates'
    },
    {
      id: 'share',
      name: 'Share App',
      icon: <Share className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      description: 'Tell friends about Tyohaarify'
    },
    {
      id: 'download',
      name: 'Offline Mode',
      icon: <Download className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      description: 'Save templates for offline use'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: <Copy className="w-6 h-6" />,
      color: 'from-gray-500 to-slate-600',
      description: 'Copy app link to clipboard'
    }
  ];

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId);
    setTimeout(() => {
      onAction(actionId);
      setSelectedAction(null);
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 sm:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 pb-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-gray-600">Choose an action to get started quickly</p>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionClick(action.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-200 touch-manipulation ${
                    selectedAction === action.id
                      ? 'border-purple-500 bg-purple-50 scale-95'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-3 mx-auto`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{action.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{action.description}</p>

                  {selectedAction === action.id && (
                    <div className="absolute inset-0 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 touch-manipulation"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}