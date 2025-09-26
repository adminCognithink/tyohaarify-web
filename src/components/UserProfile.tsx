import { useState, useEffect } from 'react';
import { User, Settings, Heart, Download, Share2, Calendar, Bell, Palette, Globe, Moon, Sun } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      updates: boolean;
    };
    defaultFestival?: string;
    downloadFormat: 'png' | 'jpeg' | 'pdf';
    autoSave: boolean;
  };
  stats: {
    cardsCreated: number;
    cardsDownloaded: number;
    cardsShared: number;
    favoriteTemplates: string[];
    joinDate: string;
  };
}

interface UserProfileManagerProps {
  onClose: () => void;
}

export default function UserProfileManager({ onClose }: UserProfileManagerProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'stats'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { track } = useAnalytics();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Mock user profile - replace with actual API call
      const mockProfile: UserProfile = {
        id: 'user_123',
        name: 'Festival Creator',
        email: 'user@example.com',
        avatar: '/api/placeholder/64/64',
        preferences: {
          theme: 'light',
          language: 'en',
          notifications: {
            email: true,
            push: false,
            updates: true
          },
          defaultFestival: 'diwali',
          downloadFormat: 'png',
          autoSave: true
        },
        stats: {
          cardsCreated: 25,
          cardsDownloaded: 18,
          cardsShared: 12,
          favoriteTemplates: ['1', '3', '7'],
          joinDate: '2024-01-15'
        }
      };

      // Load from localStorage if available
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile({ ...mockProfile, ...JSON.parse(savedProfile) });
      } else {
        setProfile(mockProfile);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setLoading(false);
    }
  };

  const saveProfile = async (updatedProfile: UserProfile) => {
    try {
      // Save to localStorage (replace with API call)
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      
      // Track analytics
      track({
        event: 'profile_updated',
        category: 'user',
        properties: {
          userId: updatedProfile.id
        }
      });
      
      // Apply theme changes
      applyTheme(updatedProfile.preferences.theme);
      
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const applyTheme = (theme: 'light' | 'dark' | 'auto') => {
    const root = window.document.documentElement;
    
    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  const updatePreferences = (key: string, value: any) => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        [key]: value
      }
    };
    
    saveProfile(updatedProfile);
  };

  const toggleNotificationSetting = (setting: keyof UserProfile['preferences']['notifications']) => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        notifications: {
          ...profile.preferences.notifications,
          [setting]: !profile.preferences.notifications[setting]
        }
      }
    };
    
    saveProfile(updatedProfile);
  };

  if (loading || !profile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'preferences', label: 'Preferences', icon: Settings },
              { id: 'stats', label: 'Statistics', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={profile.avatar || '/api/placeholder/80/80'}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                    <User className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Your name"
                      />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Your email"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
                      <p className="text-gray-600">{profile.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Member since {new Date(profile.stats.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (isEditing) {
                      saveProfile(profile);
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Theme</span>
                    <select
                      value={profile.preferences.theme}
                      onChange={(e) => updatePreferences('theme', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Language Settings */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Language & Region
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Language</span>
                    <select
                      value={profile.preferences.language}
                      onChange={(e) => updatePreferences('language', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </h4>
                <div className="space-y-3">
                  {Object.entries(profile.preferences.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-700 capitalize">{key} notifications</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => toggleNotificationSetting(key as any)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Default Settings */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Default Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Default Festival</span>
                    <select
                      value={profile.preferences.defaultFestival || ''}
                      onChange={(e) => updatePreferences('defaultFestival', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">No default</option>
                      <option value="diwali">Diwali</option>
                      <option value="christmas">Christmas</option>
                      <option value="eid">Eid</option>
                      <option value="newyear">New Year</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Download Format</span>
                    <select
                      value={profile.preferences.downloadFormat}
                      onChange={(e) => updatePreferences('downloadFormat', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: 'Cards Created', value: profile.stats.cardsCreated, color: 'text-blue-600' },
                  { icon: Download, label: 'Downloads', value: profile.stats.cardsDownloaded, color: 'text-green-600' },
                  { icon: Share2, label: 'Shares', value: profile.stats.cardsShared, color: 'text-purple-600' },
                  { icon: Heart, label: 'Favorites', value: profile.stats.favoriteTemplates.length, color: 'text-red-600' }
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-gray-50 p-4 rounded-lg text-center">
                    <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-gray-800">{value}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </div>
                ))}
              </div>

              {/* Activity Chart Placeholder */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-3">Activity Overview</h4>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Activity chart coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}