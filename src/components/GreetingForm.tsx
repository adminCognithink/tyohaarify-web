import React, { useState } from 'react';

interface GreetingFormData {
  festival: string;
  recipientName: string;
  language: string;
  style: string;
  message?: string;
}

interface GreetingFormProps {
  onSubmit: (data: GreetingFormData) => void;
  isLoading: boolean;
}

export const GreetingForm: React.FC<GreetingFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<GreetingFormData>({
    festival: '',
    recipientName: '',
    language: 'english',
    style: 'traditional',
    message: '',
  });

  const festivals = [
    'diwali', 'holi', 'eid', 'christmas', 'chinese-new-year', 
    'thanksgiving', 'dussehra', 'easter', 'karva-chauth', 'navratri'
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi (हिन्दी)' },
    { value: 'spanish', label: 'Español' },
    { value: 'french', label: 'Français' },
    { value: 'german', label: 'Deutsch' },
    { value: 'italian', label: 'Italiano' },
  ];

  const styles = [
    { value: 'traditional', label: 'Traditional', description: 'Classic, respectful language' },
    { value: 'modern', label: 'Modern', description: 'Contemporary with emojis' },
    { value: 'formal', label: 'Formal', description: 'Professional tone' },
    { value: 'casual', label: 'Casual', description: 'Friendly, relaxed' },
    { value: 'funny', label: 'Funny', description: 'Lighthearted and humorous' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.festival && formData.recipientName) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof GreetingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Festival Selection */}
      <div>
        <label htmlFor="festival" className="block text-sm font-medium text-gray-700 mb-2">
          Festival *
        </label>
        <select
          id="festival"
          value={formData.festival}
          onChange={(e) => handleInputChange('festival', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
          required
        >
          <option value="">Select a festival</option>
          {festivals.map((festival) => (
            <option key={festival} value={festival}>
              {festival.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Recipient Name */}
      <div>
        <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
          Recipient Name *
        </label>
        <input
          type="text"
          id="recipientName"
          value={formData.recipientName}
          onChange={(e) => handleInputChange('recipientName', e.target.value)}
          placeholder="e.g., Family, John, Dear Friends"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          required
        />
      </div>

      {/* Language Selection */}
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
          Language
        </label>
        <select
          id="language"
          value={formData.language}
          onChange={(e) => handleInputChange('language', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Greeting Style
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styles.map((style) => (
            <label
              key={style.value}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                formData.style === style.value
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="style"
                value={style.value}
                checked={formData.style === style.value}
                onChange={(e) => handleInputChange('style', e.target.value)}
                className="sr-only"
              />
              <div className="font-medium text-gray-800">{style.label}</div>
              <div className="text-sm text-gray-600">{style.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Custom Message (Optional)
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="Add your personal message..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          This will be included in addition to the generated greeting.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !formData.festival || !formData.recipientName}
        className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Greeting...
          </>
        ) : (
          <>
            <span className="mr-2">✨</span>
            Generate Greeting
          </>
        )}
      </button>
    </form>
  );
};