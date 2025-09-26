import { useState } from 'react';
import { Share2, Twitter, Facebook, Instagram, MessageCircle, Mail, Copy, Download, QrCode, Link2 } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';
import QRCode from 'qrcode';

interface SocialShareProps {
  cardImageUrl: string;
  cardTitle: string;
  cardMessage: string;
  onClose: () => void;
}

interface SharePlatform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  url: (params: ShareParams) => string;
  supportsImage: boolean;
}

interface ShareParams {
  url: string;
  title: string;
  text: string;
  imageUrl?: string;
}

const SHARE_PLATFORMS: SharePlatform[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'bg-blue-500 hover:bg-blue-600',
    url: ({ url, text }) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    supportsImage: false
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600 hover:bg-blue-700',
    url: ({ url, title }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    supportsImage: false
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500 hover:bg-green-600',
    url: ({ text, url }) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    supportsImage: false
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: MessageCircle,
    color: 'bg-blue-500 hover:bg-blue-600',
    url: ({ text, url }) => `https://t.me/share/url?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    supportsImage: false
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'bg-gray-600 hover:bg-gray-700',
    url: ({ title, text, url }) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
    supportsImage: false
  }
];

export default function SocialShareModal({ cardImageUrl, cardTitle, cardMessage, onClose }: SocialShareProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareStats, setShareStats] = useState({
    views: 0,
    shares: 0
  });
  
  const { track } = useAnalytics();

  // Generate share URL and QR code
  useState(() => {
    const generateShareUrl = async () => {
      // In a real app, you'd upload the card image and get a shareable URL
      // For now, we'll create a mock URL
      const baseUrl = window.location.origin;
      const cardId = `card_${Date.now()}`;
      const url = `${baseUrl}/shared/${cardId}`;
      
      setShareUrl(url);
      
      // Generate QR Code
      try {
        const qrUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
      
      // Simulate loading share stats
      setTimeout(() => {
        setShareStats({
          views: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 20)
        });
      }, 1000);
    };
    
    generateShareUrl();
  });

  const handleShare = async (platform: SharePlatform) => {
    const shareParams: ShareParams = {
      url: shareUrl,
      title: cardTitle,
      text: cardMessage,
      imageUrl: cardImageUrl
    };

    // Track analytics
    track({
      event: 'card_shared',
      category: 'social',
      properties: {
        platform: platform.id,
        cardTitle,
        shareUrl
      }
    });

    if (platform.id === 'instagram') {
      // Instagram sharing requires special handling
      handleInstagramShare();
      return;
    }

    // Open share URL
    const url = platform.url(shareParams);
    window.open(url, '_blank', 'width=600,height=600');
    
    // Update share stats
    setShareStats(prev => ({
      ...prev,
      shares: prev.shares + 1
    }));
  };

  const handleInstagramShare = () => {
    // Instagram doesn't allow direct URL sharing, so we'll copy the image URL
    navigator.clipboard.writeText(cardImageUrl);
    alert('Image URL copied! You can now paste it when creating an Instagram post.');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: cardTitle,
          text: cardMessage,
          url: shareUrl
        });
        
        track({
          event: 'card_shared',
          category: 'social',
          properties: {
            platform: 'native',
            cardTitle,
            shareUrl
          }
        });
      } catch (error) {
        console.error('Native sharing failed:', error);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      
      track({
        event: 'share_link_copied',
        category: 'social',
        properties: {
          shareUrl
        }
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const downloadCard = async () => {
    try {
      const response = await fetch(cardImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cardTitle.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      track({
        event: 'card_downloaded_from_share',
        category: 'download',
        properties: {
          cardTitle
        }
      });
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share Your Card
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Card Preview */}
          <div className="mb-6">
            <img
              src={cardImageUrl}
              alt={cardTitle}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>

          {/* Share Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{shareStats.views}</div>
              <div className="text-sm text-blue-500">Views</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{shareStats.shares}</div>
              <div className="text-sm text-green-500">Shares</div>
            </div>
          </div>

          {/* Share Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {copied ? (
                  <span className="flex items-center">
                    <Copy className="w-4 h-4 mr-1" />
                    Copied!
                  </span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Share on Social Media</h3>
            <div className="grid grid-cols-2 gap-3">
              {SHARE_PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    onClick={() => handleShare(platform)}
                    className={`${platform.color} text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <QrCode className="w-4 h-4 mr-1" />
                QR Code
              </h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
                <p className="text-xs text-gray-500 mt-2">
                  Scan to view and share this card
                </p>
              </div>
            </div>
          )}

          {/* Additional Actions */}
          <div className="space-y-3">
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Use Device Share</span>
              </button>
            )}
            
            <button
              onClick={downloadCard}
              className="w-full bg-green-100 text-green-700 p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-200 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}