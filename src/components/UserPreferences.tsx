import React, { useState, useEffect } from 'react';

interface UserPreference {
  favorite_festivals: string[];
  preferred_languages: string[];
  greeting_styles: string[];
  color_themes: string[];
  notification_settings: {
    festival_reminders: boolean;
    new_templates: boolean;
    seasonal_suggestions: boolean;
  };
}

interface UserPreferencesProps {
  onPreferenceChange: (preferences: UserPreference) => void;
  initialPreferences?: UserPreference;
}

const defaultPreferences: UserPreference = {
  favorite_festivals: [],
  preferred_languages: ['English'],
  greeting_styles: ['Traditional'],
  color_themes: ['Royal Purple'],
  notification_settings: {
    festival_reminders: true,
    new_templates: false,
    seasonal_suggestions: true,
  },
};

export const UserPreferences: React.FC<UserPreferencesProps> = ({
  onPreferenceChange,
  initialPreferences = defaultPreferences,
}) => {
  const [preferences, setPreferences] = useState<UserPreference>(initialPreferences);
  const [activeTab, setActiveTab] = useState<'festivals' | 'appearance' | 'notifications'>('festivals');
  const [hasChanges, setHasChanges] = useState(false);

  const availableFestivals = [
    { name: 'Diwali', emoji: '🪔', region: 'India' },
    { name: 'Holi', emoji: '🌈', region: 'India' },
    { name: 'Christmas', emoji: '🎄', region: 'Global' },
    { name: 'New Year', emoji: '🎊', region: 'Global' },
    { name: 'Dussehra', emoji: '🏹', region: 'India' },
    { name: 'Eid', emoji: '🌙', region: 'Islamic' },
    { name: 'Easter', emoji: '🐰', region: 'Christian' },
    { name: 'Thanksgiving', emoji: '🦃', region: 'USA' },
    { name: 'Chinese New Year', emoji: '🧧', region: 'China' },
    { name: 'Ganesh Chaturthi', emoji: '🐘', region: 'India' },
    { name: 'Karva Chauth', emoji: '🌕', region: 'India' },
    { name: 'Raksha Bandhan', emoji: '🎀', region: 'India' },
  ];

  const availableLanguages = [
    { code: 'English', name: 'English', flag: '🇺🇸' },
    { code: 'Hindi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'Spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'French', name: 'Français', flag: '🇫🇷' },
    { code: 'German', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'Italian', name: 'Italiano', flag: '🇮🇹' },
    { code: 'Portuguese', name: 'Português', flag: '🇵🇹' },
    { code: 'Chinese', name: '中文', flag: '🇨🇳' },
    { code: 'Japanese', name: '日本語', flag: '🇯🇵' },
    { code: 'Korean', name: '한국어', flag: '🇰🇷' },
  ];

  const greetingStyles = [
    { name: 'Traditional', description: 'Classic, formal greetings', icon: '📜' },
    { name: 'Modern', description: 'Contemporary, casual style', icon: '✨' },
    { name: 'Poetic', description: 'Artistic, poetic expressions', icon: '🎭' },
    { name: 'Humorous', description: 'Light-hearted, funny greetings', icon: '😄' },
    { name: 'Spiritual', description: 'Religious, spiritual messages', icon: '🙏' },
    { name: 'Minimalist', description: 'Simple, clean messages', icon: '⚡' },
  ];

  const colorThemes = [
    { name: 'Royal Purple', primary: '#6B46C1', secondary: '#EC4899' },
    { name: 'Festival Gold', primary: '#F59E0B', secondary: '#EF4444' },
    { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#06B6D4' },
    { name: 'Forest Green', primary: '#059669', secondary: '#10B981' },
    { name: 'Sunset Orange', primary: '#EA580C', secondary: '#F97316' },
    { name: 'Cherry Blossom', primary: '#EC4899', secondary: '#F472B6' },
  ];

  useEffect(() => {
    onPreferenceChange(preferences);
  }, [preferences, onPreferenceChange]);

  const updatePreferences = (updates: Partial<UserPreference>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const toggleFestival = (festival: string) => {
    const currentFavorites = preferences.favorite_festivals;
    const updatedFavorites = currentFavorites.includes(festival)
      ? currentFavorites.filter(f => f !== festival)
      : [...currentFavorites, festival];
    
    updatePreferences({ favorite_festivals: updatedFavorites });
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = preferences.preferred_languages;
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(l => l !== language)
      : [...currentLanguages, language];
    
    updatePreferences({ preferred_languages: updatedLanguages });
  };

  const toggleStyle = (style: string) => {
    const currentStyles = preferences.greeting_styles;
    const updatedStyles = currentStyles.includes(style)
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style];
    
    updatePreferences({ greeting_styles: updatedStyles });
  };

  const toggleTheme = (theme: string) => {
    const currentThemes = preferences.color_themes;
    const updatedThemes = currentThemes.includes(theme)
      ? currentThemes.filter(t => t !== theme)
      : [...currentThemes, theme];
    
    updatePreferences({ color_themes: updatedThemes });
  };

  const updateNotificationSetting = (setting: keyof UserPreference['notification_settings'], value: boolean) => {
    updatePreferences({
      notification_settings: {
        ...preferences.notification_settings,
        [setting]: value,
      },
    });
  };

  const savePreferences = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setHasChanges(false);
    alert('Preferences saved successfully!');
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    setHasChanges(true);
  };

  const renderFestivalsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Favorite Festivals</h3>
        <p className="text-sm text-gray-600 mb-6">
          Select your favorite festivals to receive personalized suggestions and reminders.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableFestivals.map((festival) => (
            <button
              key={festival.name}
              onClick={() => toggleFestival(festival.name)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                preferences.favorite_festivals.includes(festival.name)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{festival.emoji}</div>
              <div className="text-sm font-medium text-gray-800">{festival.name}</div>
              <div className="text-xs text-gray-500">{festival.region}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferred Languages</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose languages for greetings. You can select multiple languages.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {availableLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => toggleLanguage(language.code)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                preferences.preferred_languages.includes(language.code)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{language.flag}</div>
              <div className="text-xs font-medium text-gray-800">{language.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Greeting Styles</h3>
        <p className="text-sm text-gray-600 mb-6">
          Select your preferred greeting styles. Multiple selections allowed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {greetingStyles.map((style) => (
            <button
              key={style.name}
              onClick={() => toggleStyle(style.name)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                preferences.greeting_styles.includes(style.name)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{style.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">{style.name}</div>
                  <div className="text-sm text-gray-600">{style.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Themes</h3>
        <p className="text-sm text-gray-600 mb-6">
          Choose your favorite color themes for greeting templates.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => toggleTheme(theme.name)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                preferences.color_themes.includes(theme.name)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex space-x-2 mb-3">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                ></div>
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: theme.secondary }}
                ></div>
              </div>
              <div className="text-sm font-medium text-gray-800">{theme.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
        <p className="text-sm text-gray-600 mb-6">
          Customize when and how you receive notifications about festivals and updates.
        </p>
        
        <div className="space-y-4">
          {[
            {
              key: 'festival_reminders',
              title: 'Festival Reminders',
              description: 'Get notified before your favorite festivals',
              icon: '🔔',
            },
            {
              key: 'new_templates',
              title: 'New Templates',
              description: 'Notifications when new greeting templates are added',
              icon: '🆕',
            },
            {
              key: 'seasonal_suggestions',
              title: 'Seasonal Suggestions',
              description: 'Receive suggestions based on upcoming seasons',
              icon: '🗓️',
            },
          ].map((setting) => (
            <div
              key={setting.key}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{setting.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">{setting.title}</div>
                  <div className="text-sm text-gray-600">{setting.description}</div>
                </div>
              </div>
              <button
                onClick={() => updateNotificationSetting(
                  setting.key as keyof UserPreference['notification_settings'],
                  !preferences.notification_settings[setting.key as keyof UserPreference['notification_settings']]
                )}
                className={`w-12 h-6 rounded-full transition-all duration-200 ${
                  preferences.notification_settings[setting.key as keyof UserPreference['notification_settings']]
                    ? 'bg-purple-600'
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                    preferences.notification_settings[setting.key as keyof UserPreference['notification_settings']]
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-blue-700">
          Enable festival reminders to never miss celebrating your favorite occasions!
          We&apos;ll send you a gentle reminder 2-3 days before each festival.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Preferences</h2>
        <p className="text-gray-600">
          Customize your Tyohaarify experience with personalized settings and preferences.
        </p>
      </div>

      {/* Preference Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'festivals', label: 'Festivals & Languages', icon: '🎉' },
              { id: 'appearance', label: 'Appearance', icon: '🎨' },
              { id: 'notifications', label: 'Notifications', icon: '🔔' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'festivals' && renderFestivalsTab()}
          {activeTab === 'appearance' && renderAppearanceTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {hasChanges && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                You have unsaved changes
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={resetPreferences}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Reset to Defaults
            </button>
            <button
              onClick={savePreferences}
              disabled={!hasChanges}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                hasChanges
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Preferences Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-700 mb-1">Favorite Festivals</div>
            <div className="text-gray-600">
              {preferences.favorite_festivals.length > 0
                ? `${preferences.favorite_festivals.length} selected`
                : 'None selected'}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Languages</div>
            <div className="text-gray-600">
              {preferences.preferred_languages.join(', ')}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Greeting Styles</div>
            <div className="text-gray-600">
              {preferences.greeting_styles.length > 0
                ? `${preferences.greeting_styles.length} selected`
                : 'None selected'}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Color Themes</div>
            <div className="text-gray-600">
              {preferences.color_themes.length > 0
                ? `${preferences.color_themes.length} selected`
                : 'None selected'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};