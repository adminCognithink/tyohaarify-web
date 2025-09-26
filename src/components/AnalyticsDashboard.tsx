import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Download, Share2, Star, Calendar, Target, Award } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';

interface AnalyticsDashboardProps {
  onClose: () => void;
}

interface AnalyticsData {
  totalCards: number;
  totalDownloads: number;
  totalShares: number;
  averageRating: number;
  topFestivals: { name: string; count: number; color: string }[];
  dailyActivity: { date: string; cards: number; downloads: number; shares: number }[];
  userEngagement: { metric: string; value: number; change: number }[];
  popularTemplates: { name: string; uses: number; rating: number }[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'engagement' | 'templates' | 'users'>('overview');
  
  const { track } = useAnalytics();

  useEffect(() => {
    loadAnalytics();
    track({
      event: 'analytics_dashboard_viewed',
      category: 'dashboard',
      properties: {
        timeRange
      }
    });
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    
    // Mock analytics data - replace with actual API call
    const mockData: AnalyticsData = {
      totalCards: 1247,
      totalDownloads: 892,
      totalShares: 456,
      averageRating: 4.7,
      topFestivals: [
        { name: 'Diwali', count: 420, color: COLORS[0] },
        { name: 'Christmas', count: 315, color: COLORS[1] },
        { name: 'Eid', count: 189, color: COLORS[2] },
        { name: 'New Year', count: 156, color: COLORS[3] },
        { name: 'Holi', count: 167, color: COLORS[4] }
      ],
      dailyActivity: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        cards: Math.floor(Math.random() * 50) + 10,
        downloads: Math.floor(Math.random() * 40) + 5,
        shares: Math.floor(Math.random() * 20) + 2
      })),
      userEngagement: [
        { metric: 'Daily Active Users', value: 234, change: 12.5 },
        { metric: 'Session Duration', value: 8.2, change: -5.3 },
        { metric: 'Bounce Rate', value: 32.1, change: -8.7 },
        { metric: 'Conversion Rate', value: 15.6, change: 23.4 }
      ],
      popularTemplates: [
        { name: 'Elegant Diwali', uses: 156, rating: 4.9 },
        { name: 'Christmas Joy', uses: 134, rating: 4.8 },
        { name: 'Festive Lights', uses: 98, rating: 4.7 },
        { name: 'Golden Celebration', uses: 87, rating: 4.6 },
        { name: 'Traditional Wishes', uses: 76, rating: 4.5 }
      ]
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setData(mockData);
    setLoading(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(1)}%`;
  };

  if (loading || !data) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'engagement', label: 'Engagement', icon: Users },
              { id: 'templates', label: 'Templates', icon: Star },
              { id: 'users', label: 'Users', icon: Target }
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Calendar, label: 'Total Cards', value: data.totalCards, color: 'text-blue-500' },
                  { icon: Download, label: 'Downloads', value: data.totalDownloads, color: 'text-green-500' },
                  { icon: Share2, label: 'Shares', value: data.totalShares, color: 'text-purple-500' },
                  { icon: Star, label: 'Avg Rating', value: data.averageRating, color: 'text-yellow-500', isRating: true }
                ].map(({ icon: Icon, label, value, color, isRating }) => (
                  <div key={label} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-6 h-6 ${color}`} />
                      <span className="text-sm font-medium text-gray-600">{label}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {isRating ? value.toFixed(1) : formatNumber(value)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Daily Activity Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.dailyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cards" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="shares" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Festival Distribution */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Festivals</h3>
                <div className="flex flex-col lg:flex-row items-center">
                  <div className="w-full lg:w-1/2 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.topFestivals}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {data.topFestivals.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full lg:w-1/2 space-y-3">
                    {data.topFestivals.map((festival, index) => (
                      <div key={festival.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: festival.color }}
                          ></div>
                          <span className="font-medium text-gray-700">{festival.name}</span>
                        </div>
                        <span className="text-gray-600">{formatNumber(festival.count)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Engagement Tab */}
          {activeTab === 'engagement' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.userEngagement.map((metric) => (
                  <div key={metric.metric} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-700 mb-2">{metric.metric}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {metric.metric.includes('Rate') || metric.metric.includes('Duration')
                          ? `${metric.value.toFixed(1)}${metric.metric.includes('Duration') ? 'min' : '%'}`
                          : formatNumber(metric.value)
                        }
                      </span>
                      <span className={`text-sm font-medium ${
                        metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatPercentage(metric.change)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Templates</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Template Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Uses</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.popularTemplates.map((template, index) => (
                        <tr key={template.name} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                <Award className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-800">{template.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{formatNumber(template.uses)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-gray-700">{template.rating.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(template.uses / data.popularTemplates[0].uses) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">User Analytics</h3>
                <p className="text-gray-600">Detailed user analytics coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

