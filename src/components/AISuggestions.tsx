'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIService, MessageSuggestion } from '@/lib/ai-service';

interface AISuggestionsProps {
  festivalName: string;
  onSelectSuggestion: (message: string) => void;
  currentMessage: string;
}

export default function AISuggestions({ 
  festivalName, 
  onSelectSuggestion, 
  currentMessage 
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<MessageSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'formal' | 'casual' | 'heartfelt' | 'playful' | 'traditional'>('heartfelt');
  const [selectedRelationship, setSelectedRelationship] = useState<'family' | 'friends' | 'colleagues' | 'general'>('general');
  const [isExpanded, setIsExpanded] = useState(false);

  const tones = [
    { id: 'heartfelt', name: 'Heartfelt', emoji: '❤️', description: 'Warm and sincere' },
    { id: 'formal', name: 'Formal', emoji: '🎩', description: 'Professional and respectful' },
    { id: 'casual', name: 'Casual', emoji: '😊', description: 'Friendly and relaxed' },
    { id: 'playful', name: 'Playful', emoji: '🎉', description: 'Fun and energetic' },
    { id: 'traditional', name: 'Traditional', emoji: '🏛️', description: 'Classic and respectful' }
  ];

  const relationships = [
    { id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'friends', name: 'Friends', emoji: '👫' },
    { id: 'colleagues', name: 'Colleagues', emoji: '💼' },
    { id: 'general', name: 'General', emoji: '🌍' }
  ];

  const generateSuggestions = async () => {
    if (!festivalName) return;
    
    setIsLoading(true);
    try {
      const newSuggestions = await AIService.generateMessageSuggestions(
        festivalName,
        selectedRelationship,
        selectedTone
      );
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
      // Fallback to default suggestions
      setSuggestions([
        {
          message: `Wishing you a wonderful ${festivalName} filled with joy and happiness!`,
          tone: selectedTone,
          relationship: selectedRelationship
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      generateSuggestions();
    }
  }, [festivalName, selectedTone, selectedRelationship, isExpanded]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="font-semibold text-gray-800 flex items-center">
              AI Message Suggestions
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                Demo
              </span>
            </h3>
            <p className="text-sm text-gray-600">Get personalized greeting ideas</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Tone Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Message Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id as any)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedTone === tone.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{tone.emoji}</span>
                        <div>
                          <div className="font-medium text-sm">{tone.name}</div>
                          <div className="text-xs text-gray-500">{tone.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Relationship Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Relationship
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {relationships.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => setSelectedRelationship(rel.id as any)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        selectedRelationship === rel.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-900'
                      }`}
                    >
                      <div className="text-lg mb-1">{rel.emoji}</div>
                      <div className="font-medium text-sm">{rel.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateSuggestions}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating ideas...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Generate New Suggestions</span>
                  </>
                )}
              </button>

              {/* Suggestions List */}
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      currentMessage === suggestion.message
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => onSelectSuggestion(suggestion.message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        {suggestion.tone} • {suggestion.relationship}
                      </span>
                      {currentMessage === suggestion.message && (
                        <span className="text-green-500 text-sm font-medium">Selected ✓</span>
                      )}
                    </div>
                    <p className="text-gray-900 leading-relaxed">{suggestion.message}</p>
                  </motion.div>
                ))}
              </div>

              {suggestions.length === 0 && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-3xl mb-2">💭</div>
                  <p>Click "Generate New Suggestions" to get AI-powered message ideas!</p>
                </div>
              )}

              {/* Tips */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">💡 Pro Tips:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Mix and match parts from different suggestions</li>
                  <li>• Add personal touches like names or shared memories</li>
                  <li>• Consider your audience when choosing tone and relationship</li>
                  <li>• Keep cultural context in mind for traditional festivals</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}