import { useState, useEffect } from 'react';
import { Star, Heart, MessageSquare, ThumbsUp, Flag, User, Calendar } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
  isVerified: boolean;
  images?: string[];
}

interface TemplateRatingProps {
  templateId: string;
  currentRating?: number;
  totalReviews?: number;
  onClose: () => void;
}

export default function TemplateRatingSystem({ templateId, currentRating = 0, totalReviews = 0, onClose }: TemplateRatingProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showReportModal, setShowReportModal] = useState<string | null>(null);
  
  const { track } = useAnalytics();

  useEffect(() => {
    loadReviews();
  }, [templateId, sortBy, filterRating]);

  const loadReviews = async () => {
    setLoading(true);
    
    // Mock reviews data - replace with actual API call
    const mockReviews: Review[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Festival Lover',
        userAvatar: '/api/placeholder/40/40',
        rating: 5,
        comment: 'Absolutely beautiful template! Perfect for Diwali celebrations.',
        timestamp: '2024-01-15T10:30:00Z',
        likes: 12,
        isVerified: true,
        images: ['/api/placeholder/300/200']
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Creative Designer',
        userAvatar: '/api/placeholder/40/40',
        rating: 4,
        comment: 'Great design elements, would love more color variations.',
        timestamp: '2024-01-14T15:45:00Z',
        likes: 8,
        isVerified: false
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Family Celebrations',
        userAvatar: '/api/placeholder/40/40',
        rating: 5,
        comment: 'Used this for our family card - everyone loved it! Easy to customize.',
        timestamp: '2024-01-13T08:20:00Z',
        likes: 15,
        isVerified: true
      }
    ];
    
    // Apply sorting
    const sortedReviews = [...mockReviews].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'helpful':
          return b.likes - a.likes;
        case 'recent':
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });
    
    // Apply rating filter
    const filteredReviews = filterRating 
      ? sortedReviews.filter(review => review.rating === filterRating)
      : sortedReviews;
    
    setReviews(filteredReviews);
    setLoading(false);
  };

  const submitReview = async () => {
    if (userRating === 0) return;
    
    setSubmitting(true);
    
    try {
      const newReview: Review = {
        id: `review_${Date.now()}`,
        userId: 'current_user',
        userName: 'You',
        rating: userRating,
        comment: userComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        isVerified: false
      };
      
      // Add to reviews
      setReviews(prev => [newReview, ...prev]);
      
      // Reset form
      setUserRating(0);
      setUserComment('');
      
      // Track analytics
      track({
        event: 'template_reviewed',
        category: 'template',
        properties: {
          templateId,
          rating: userRating,
          hasComment: userComment.length > 0
        }
      });
      
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const likeReview = async (reviewId: string) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
    
    track({
      event: 'review_liked',
      category: 'social',
      properties: {
        reviewId,
        templateId
      }
    });
  };

  const reportReview = async (reviewId: string, reason: string) => {
    // Handle review reporting
    track({
      event: 'review_reported',
      category: 'moderation',
      properties: {
        reviewId,
        templateId,
        reason
      }
    });
    
    setShowReportModal(null);
    alert('Review reported. Thank you for helping maintain our community standards.');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md', interactive = false) => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
    
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizes[size]} ${
              star <= (interactive ? hoverRating || userRating : rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && setUserRating(star)}
          />
        ))}
      </div>
    );
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getRatingDistribution = () => {
    const distribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(review => review.rating === rating).length,
      percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
    }));
    
    return distribution;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Template Reviews
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <div className="flex h-full max-h-[calc(90vh-80px)]">
          {/* Left Panel - Rating Overview */}
          <div className="w-1/3 border-r border-gray-200 p-6">
            {/* Overall Rating */}
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-800 mb-2">{currentRating.toFixed(1)}</div>
              {renderStars(currentRating, 'lg')}
              <p className="text-gray-600 mt-2">{totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3 mb-6">
              {getRatingDistribution().map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>

            {/* Write Review */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-gray-800 mb-3">Write a Review</h3>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                {renderStars(userRating, 'lg', true)}
              </div>
              
              <textarea
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                placeholder="Share your experience with this template..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              
              <button
                onClick={submitReview}
                disabled={userRating === 0 || submitting}
                className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>

          {/* Right Panel - Reviews List */}
          <div className="flex-1 flex flex-col">
            {/* Filters */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                  
                  <select
                    value={filterRating || ''}
                    onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={review.userAvatar || '/api/placeholder/40/40'}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{review.userName}</span>
                            {review.isVerified && (
                              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating, 'sm')}
                            <span className="text-sm text-gray-500">{formatDate(review.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setShowReportModal(review.id)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Report review"
                      >
                        <Flag className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    <p className="text-gray-700 mb-3">{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex space-x-2 mb-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => likeReview(review.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{review.likes}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Report Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Report Review</h3>
              <div className="space-y-3">
                {['Inappropriate content', 'Spam', 'Fake review', 'Harassment', 'Other'].map((reason) => (
                  <button
                    key={reason}
                    onClick={() => reportReview(showReportModal, reason)}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {reason}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowReportModal(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}