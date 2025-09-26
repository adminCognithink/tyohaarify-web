import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, Heart, Sparkles, Clock, Users, Download } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';
import { LoadingSpinner } from '@/components/UIComponents';

interface Template {
  id: string;
  name: string;
  festival: string;
  category: 'premium' | 'basic' | 'trending';
  difficulty: 'easy' | 'medium' | 'advanced';
  tags: string[];
  thumbnail: string;
  popularity: number;
  createdAt: string;
  downloadCount: number;
  rating: number;
  author: string;
  description: string;
}

interface TemplateGalleryProps {
  onClose: () => void;
  onTemplateSelect?: (template: Template) => void;
  selectedFestival?: string;
}

export default function TemplateGallery({ onTemplateSelect, selectedFestival, onClose }: TemplateGalleryProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'recent' | 'rating'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const { track } = useAnalytics();

  useEffect(() => {
    fetchTemplates();
  }, [selectedFestival]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      // Mock templates - replace with actual API call
      const mockTemplates: Template[] = [
        {
          id: '1',
          name: 'Golden Diwali Elegance',
          festival: 'diwali',
          category: 'premium',
          difficulty: 'easy',
          tags: ['elegant', 'golden', 'traditional'],
          thumbnail: '/images/diwali/diwali1.jpeg',
          popularity: 95,
          createdAt: '2024-10-15',
          downloadCount: 1250,
          rating: 4.8,
          author: 'Design Team',
          description: 'Elegant golden theme perfect for traditional Diwali greetings'
        },
        {
          id: '2',
          name: 'Modern Christmas Joy',
          festival: 'christmas',
          category: 'trending',
          difficulty: 'medium',
          tags: ['modern', 'minimalist', 'joy'],
          thumbnail: '/images/christmas/christmas1.jpg',
          popularity: 88,
          createdAt: '2024-11-20',
          downloadCount: 890,
          rating: 4.6,
          author: 'Creative Studio',
          description: 'Contemporary Christmas design with festive elements'
        }
        // Add more mock templates as needed
      ];

      // Filter by festival if specified
      let filteredTemplates = selectedFestival 
        ? mockTemplates.filter(t => t.festival === selectedFestival)
        : mockTemplates;

      setTemplates(filteredTemplates);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      setLoading(false);
    }
  };

  const filteredAndSortedTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const toggleFavorite = (templateId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);
    
    // Store in localStorage
    localStorage.setItem('templateFavorites', JSON.stringify([...newFavorites]));
    
    // Track analytics
    track({
      event: 'template_favorited',
      category: 'engagement',
      label: templateId
    });
  };

  const handleTemplateSelect = (template: Template) => {
    track({
      event: 'template_selected',
      category: 'engagement',
      label: template.id,
      properties: {
        templateName: template.name,
        festival: template.festival,
        category: template.category
      }
    });
    onTemplateSelect?.(template);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading templates...</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Template Gallery</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="premium">Premium</option>
            <option value="basic">Basic</option>
            <option value="trending">Trending</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Most Popular</option>
            <option value="recent">Recently Added</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Template Grid/List */}
      <div className={`grid gap-6 ${viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
      }`}>
        {filteredAndSortedTemplates.map((template) => (
          <div
            key={template.id}
            className={`group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
              viewMode === 'list' ? 'flex items-center space-x-4 p-4' : 'overflow-hidden'
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            {/* Template Image */}
            <div className={`relative ${viewMode === 'list' ? 'w-24 h-20 flex-shrink-0' : 'aspect-[4/3] w-full'}`}>
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(template.id);
                }}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart 
                  className={`w-4 h-4 ${favorites.has(template.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-400'
                  }`} 
                />
              </button>

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  template.category === 'premium' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : template.category === 'trending'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {template.category === 'premium' && <Sparkles className="inline w-3 h-3 mr-1" />}
                  {template.category}
                </span>
              </div>
            </div>

            {/* Template Info */}
            <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{template.description}</p>
              
              {/* Rating and Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    <span>{template.downloadCount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{template.author}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-2">
                {template.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedTemplates.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
}