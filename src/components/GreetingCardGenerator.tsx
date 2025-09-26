'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Festival, getFestivalById, getAllFestivals } from '@/data/festivals';
import { shareOnSocialMedia, generateEmailBody, printCard, copyToClipboard } from '@/utils/cardUtils';
import { Palette, Eye, Share2, Download, Copy, Mail, Printer, ExternalLink, MessageCircle, Facebook, Twitter, Send } from 'lucide-react';
import {
  classicElegantTemplate,
  modernMinimalistTemplate,
  festiveCollageTemplate,
  vintagePostcardTemplate,
  socialMediaTemplate,
  blackShadowTemplate,
  whiteShadowTemplate,
  darkGradientTemplate,
  lightGradientTemplate,
  glassMorphismTemplate,
  neonGlowTemplate,
  paperCutTemplate,
  watercolorTemplate,
  floating3DTemplate,
  holographicTemplate
} from '@/templates/cardTemplates';

// Import enhanced components
import ImageUpload from './ImageUpload';
import AISuggestions from './AISuggestions';
import AdvancedExport from './AdvancedExport';
import Snackbar from './Snackbar';

const templates = [
  { 
    id: 'classic', 
    name: 'Classic Elegant', 
    func: classicElegantTemplate, 
    description: 'Perfect for formal occasions and email sharing',
    category: 'elegant',
    icon: '👑'
  },
  { 
    id: 'modern', 
    name: 'Modern Minimalist', 
    func: modernMinimalistTemplate, 
    description: 'Clean design ideal for professional sharing',
    category: 'minimal',
    icon: '✨'
  },
  { 
    id: 'collage', 
    name: 'Festive Collage', 
    func: festiveCollageTemplate, 
    description: 'Colorful and fun, great for social media',
    category: 'festive',
    icon: '🎊'
  },
  { 
    id: 'vintage', 
    name: 'Vintage Postcard', 
    func: vintagePostcardTemplate, 
    description: 'Traditional style perfect for printing',
    category: 'classic',
    icon: '📜'
  },
  { 
    id: 'social', 
    name: 'Social Media Ready', 
    func: socialMediaTemplate, 
    description: 'Square format optimized for Instagram and Facebook',
    category: 'modern',
    icon: '🚀'
  },
  { 
    id: 'blackshadow', 
    name: 'Black Shadow Overlay', 
    func: blackShadowTemplate, 
    description: 'Dramatic dark overlay with bold text on top',
    category: 'dramatic',
    icon: '🖤'
  },
  { 
    id: 'whiteshadow', 
    name: 'White Shadow Overlay', 
    func: whiteShadowTemplate, 
    description: 'Light elegant overlay with soft text styling',
    category: 'elegant',
    icon: '🤍'
  },
  { 
    id: 'darkgradient', 
    name: 'Dark Gradient', 
    func: darkGradientTemplate, 
    description: 'Rich dark gradient perfect for evening celebrations',
    category: 'dramatic',
    icon: '🌃'
  },
  { 
    id: 'lightgradient', 
    name: 'Light Gradient', 
    func: lightGradientTemplate, 
    description: 'Bright airy gradient with floating elements',
    category: 'modern',
    icon: '☀️'
  },
  { 
    id: 'glassmorphism', 
    name: 'Glass Morphism', 
    func: glassMorphismTemplate, 
    description: 'Modern frosted glass effect with stunning backdrop',
    category: 'premium',
    icon: '💎'
  },
  { 
    id: 'neonglow', 
    name: 'Neon Glow', 
    func: neonGlowTemplate, 
    description: 'Futuristic neon effects perfect for vibrant celebrations',
    category: 'premium',
    icon: '⚡'
  },
  { 
    id: 'papercut', 
    name: 'Paper Cut Art', 
    func: paperCutTemplate, 
    description: 'Elegant paper craft inspired design with ornate details',
    category: 'premium',
    icon: '📄'
  },
  { 
    id: 'watercolor', 
    name: 'Watercolor Dream', 
    func: watercolorTemplate, 
    description: 'Artistic watercolor effects with flowing paint splashes',
    category: 'premium',
    icon: '✨'
  },
  { 
    id: 'floating3d', 
    name: '3D Floating', 
    func: floating3DTemplate, 
    description: '3D floating card with depth and dynamic lighting',
    category: 'premium',
    icon: '🌟'
  },
  { 
    id: 'holographic', 
    name: 'Holographic', 
    func: holographicTemplate, 
    description: 'Stunning holographic effects with rainbow animations',
    category: 'premium',
    icon: '🌈'
  }
];

export default function GreetingCardGenerator() {
  const searchParams = useSearchParams();
  const previewRef = useRef<HTMLIFrameElement>(null);
  const festivals = getAllFestivals();
  
  // Core state
  const [selectedFestival, setSelectedFestival] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [customImage, setCustomImage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('Guest');
  const [generatedHTML, setGeneratedHTML] = useState<string>('');
  
  // UI state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showAdvancedExport, setShowAdvancedExport] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'customize' | 'preview' | 'share'>('customize');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showTemplateSelected, setShowTemplateSelected] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [nameInputTimer, setNameInputTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Analytics state
  const [analytics, setAnalytics] = useState({
    views: 0,
    shares: 0,
    downloads: 0
  });
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  });
  
  const currentFestival = getFestivalById(selectedFestival);

  // Helper function to show snackbar
  const showSnackbar = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setSnackbar({ isVisible: true, message, type });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (nameInputTimer) {
        clearTimeout(nameInputTimer);
      }
    };
  }, [nameInputTimer]);

  // Initialize from URL parameters only
  useEffect(() => {
    const festival = searchParams.get('festival');
    const template = searchParams.get('template');
    
    if (festival && festivals.find(f => f.id === festival)) {
      setSelectedFestival(festival);
    }
    
    if (template && templates.find(t => t.id === template)) {
      setSelectedTemplate(template);
      setShowTemplateSelected(true);
      // Hide notification after 3 seconds
      setTimeout(() => setShowTemplateSelected(false), 3000);
    }
  }, [searchParams, festivals]);

  // Initialize message and image when festival changes
  useEffect(() => {
    if (currentFestival) {
      setMessage(currentFestival.defaultMessage);
      if (currentFestival.images.length > 0) {
        setSelectedImage(currentFestival.images[0]);
      }
      setCustomImage(''); // Reset custom image when festival changes
      setGeneratedHTML(''); // Reset generated HTML when festival changes
    }
  }, [selectedFestival, currentFestival]);

  // Auto-generate preview when any parameter changes (name is optional)
  useEffect(() => {
    if (currentFestival && selectedTemplate && (selectedImage || customImage) && message) {
      // Small delay to ensure UI updates are complete
      const timer = setTimeout(() => {
        generateCard();
        // Auto-switch to preview tab when card is generated (only on desktop)
        if (!isMobile) {
          setActiveTab('preview');
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentFestival, selectedTemplate, selectedImage, customImage, message, senderName, isMobile]);

  const generateCard = async () => {
    if (!currentFestival) return;
    
    setIsGenerating(true);
    
    try {
      const template = templates.find(t => t.id === selectedTemplate);
      if (!template) return;

      const finalImage = customImage || selectedImage;
      const html = template.func(
        currentFestival.name,
        finalImage,
        message || currentFestival.defaultMessage,
        senderName || 'Anonymous'
      );

      setGeneratedHTML(html);
      
      // Update preview iframe
      if (previewRef.current) {
        const doc = previewRef.current.contentDocument;
        if (doc) {
          doc.open();
          // Write the full HTML directly without modification
          doc.write(html);
          doc.close();
          
          // Add custom CSS to the document to prevent scrollbars and ensure proper scaling
          const style = doc.createElement('style');
          style.textContent = `
            body {
              margin: 0;
              padding: 8px;
              overflow: hidden;
              transform: scale(0.65);
              transform-origin: top left;
              width: 153.85%;
              height: 153.85%;
              box-sizing: border-box;
            }
            * {
              box-sizing: border-box;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            .card {
              max-width: 600px !important;
              width: 100% !important;
              margin: 0 auto !important;
              box-shadow: 0 8px 20px rgba(0,0,0,0.12) !important;
            }
            
            @media (max-width: 640px) {
              body {
                transform: scale(0.55);
                width: 181.82%;
                height: 181.82%;
                padding: 6px;
              }
            }
          `;
          doc.head.appendChild(style);
        }
      }

      // Update analytics
      setAnalytics(prev => ({ ...prev, views: prev.views + 1 }));
      
      // Auto-switch to preview tab only on desktop/tablet, not on mobile
      if (!isMobile) {
        setActiveTab('preview');
      }
      
    } catch (error) {
      console.error('Error generating card:', error);
      showSnackbar('Failed to generate card. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCustomImage(result);
      setSelectedImage(''); // Clear festival image selection
    };
    reader.readAsDataURL(file);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setCustomImage(''); // Clear custom image
  };

  const generateCardImage = async (): Promise<string | null> => {
    if (!previewRef.current || !generatedHTML) return null;
    
    try {
      // Create a temporary iframe to render the card at full size
      const tempIframe = document.createElement('iframe');
      tempIframe.style.position = 'absolute';
      tempIframe.style.left = '-9999px';
      tempIframe.style.top = '-9999px';
      tempIframe.style.width = selectedTemplate === 'vintage' ? '700px' : '600px';
      tempIframe.style.height = selectedTemplate === 'vintage' ? '450px' : '700px';
      tempIframe.style.border = 'none';
      document.body.appendChild(tempIframe);

      const iframeDoc = tempIframe.contentDocument;
      if (!iframeDoc) {
        document.body.removeChild(tempIframe);
        return null;
      }

      // Write the HTML content
      iframeDoc.open();
      iframeDoc.write(generatedHTML);
      iframeDoc.close();

      // Add CSS to ensure proper rendering
      const style = iframeDoc.createElement('style');
      style.textContent = `
        body {
          margin: 0;
          padding: 0;
          background: transparent;
          font-family: inherit;
        }
        .card {
          margin: 0 auto;
          display: block;
        }
        * {
          box-sizing: border-box;
        }
      `;
      iframeDoc.head.appendChild(style);

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use html2canvas to capture just the card
      const html2canvas = await import('html2canvas');
      const cardElement = iframeDoc.querySelector('.card') || iframeDoc.body;
      
      const canvas = await html2canvas.default(cardElement as HTMLElement, {
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      document.body.removeChild(tempIframe);
      return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
      console.error('Error generating card image:', error);
      
      // Fallback: Create canvas from HTML directly
      try {
        return await generateImageFromHTML();
      } catch (fallbackError) {
        console.error('Fallback image generation failed:', fallbackError);
        return null;
      }
    }
  };

  const generateImageFromHTML = async (): Promise<string> => {
    // Create an off-screen div with the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generatedHTML;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = selectedTemplate === 'vintage' ? '700px' : '600px';
    tempDiv.style.height = selectedTemplate === 'vintage' ? '450px' : '700px';
    tempDiv.style.background = 'transparent';
    document.body.appendChild(tempDiv);

    try {
      const html2canvas = await import('html2canvas');
      const cardElement = tempDiv.querySelector('.card') || tempDiv;
      
      const canvas = await html2canvas.default(cardElement as HTMLElement, {
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      return canvas.toDataURL('image/png', 1.0);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  const downloadAsImage = async () => {
    if (!generatedHTML) return;
    
    try {
      const imageDataUrl = await generateCardImage();
      if (!imageDataUrl) {
        showSnackbar('Failed to generate image. Please try again.', 'error');
        return;
      }

      const link = document.createElement('a');
      link.download = `${currentFestival?.name}-greeting-card.png`;
      link.href = imageDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update analytics
      setAnalytics(prev => ({ ...prev, downloads: prev.downloads + 1 }));
      showSnackbar('Image downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading image:', error);
      showSnackbar('Failed to download image. Please try again.', 'error');
    }
  };

  const copyHTML = async () => {
    if (!generatedHTML) return;
    
    const success = await copyToClipboard(generatedHTML);
    if (success) {
      showSnackbar('HTML code copied to clipboard!', 'success');
    } else {
      showSnackbar('Failed to copy HTML. Please try again.', 'error');
    }
  };

  const shareCard = async (platform: string) => {
    if (!generatedHTML) {
      showSnackbar('Please generate a card first!', 'warning');
      return;
    }

    try {
      const imageDataUrl = await generateCardImage();
      if (!imageDataUrl) {
        showSnackbar('Failed to generate image for sharing. Please try again.', 'error');
        return;
      }

      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], `${currentFestival?.name}-greeting-card.png`, { type: 'image/png' });

      // Check if Web Share API is supported and can share files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `${currentFestival?.name} Greetings`,
            text: `Check out this beautiful ${currentFestival?.name} greeting card I created!`,
            files: [file]
          });
          
          // Update analytics
          setAnalytics(prev => ({ ...prev, shares: prev.shares + 1 }));
          return;
        } catch (shareError) {
          console.log('Native sharing cancelled or failed, falling back to platform-specific sharing');
        }
      }

      // Fallback to platform-specific sharing with image download
      const cardMessage = `Check out this beautiful ${currentFestival?.name} greeting card I created!`;
      
      switch (platform.toLowerCase()) {
        case 'whatsapp':
          // For WhatsApp, we'll download the image and provide instructions
          downloadImageForSharing(imageDataUrl, 'WhatsApp');
          break;
        case 'facebook':
          downloadImageForSharing(imageDataUrl, 'Facebook');
          break;
        case 'twitter':
          downloadImageForSharing(imageDataUrl, 'Twitter');
          break;
        case 'telegram':
          downloadImageForSharing(imageDataUrl, 'Telegram');
          break;
        default:
          // Generic sharing fallback
          shareOnSocialMedia(platform, window.location.href, cardMessage);
      }
      
      // Update analytics
      setAnalytics(prev => ({ ...prev, shares: prev.shares + 1 }));
    } catch (error) {
      console.error('Error sharing card:', error);
      showSnackbar('Failed to share card. Please try again.', 'error');
    }
  };

  const downloadImageForSharing = (imageDataUrl: string, platform: string) => {
    const link = document.createElement('a');
    link.download = `${currentFestival?.name}-greeting-card-${platform.toLowerCase()}.png`;
    link.href = imageDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show instructions to user
    setTimeout(() => {
      showSnackbar(`Image downloaded! You can now upload it to ${platform} and share with your friends.`, 'success');
    }, 500);
  };

  const generateEmailVersion = () => {
    if (!generatedHTML) return;

    const emailBody = generateEmailBody(generatedHTML);
    const subject = `${currentFestival?.name} Greetings from ${senderName || 'Someone Special'}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
  };

  const printCardNow = () => {
    if (!generatedHTML) return;
    printCard(generatedHTML);
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Template Selection Notification */}
        {showTemplateSelected && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
          >
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>
            <div>
              <p className="text-green-800 font-medium">
                Template Selected! 
                <span className="ml-2 text-green-600">
                  "{templates.find(t => t.id === selectedTemplate)?.name}" is now active
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Enhanced Mobile Tab Navigation */}
        <div className="lg:hidden mb-6">
          <div className="flex bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-2 shadow-inner border border-gray-200">
            <button
              onClick={() => setActiveTab('customize')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation flex items-center justify-center gap-2 ${
                activeTab === 'customize' 
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Palette className="w-5 h-5" />
              <span className="font-bold">Customize</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation flex items-center justify-center gap-2 ${
                activeTab === 'preview' 
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span className="font-bold">Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-300 touch-manipulation flex items-center justify-center gap-2 ${
                activeTab === 'share' 
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Share2 className="w-5 h-5" />
              <span className="font-bold">Share</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Controls Panel */}
          <div className={`lg:col-span-2 ${activeTab === 'customize' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 p-4 sm:p-6 lg:p-8">
              
              {/* Festival Selection - Mobile Optimized with Background Images */}
              {!selectedFestival ? (
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={false}
                  animate={{
                    backgroundColor: 'rgba(231, 115, 180, 0.05)',
                    borderRadius: '1rem',
                    padding: '1rem'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      🎉 Choose Your Festival
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Select a festival to start creating your greeting card
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {festivals.map(festival => (
                      <button
                        key={festival.id}
                        onClick={() => {
                          setSelectedFestival(festival.id);
                          setSelectedTemplate('classic'); // Set default template
                          setActiveStep(2); // Move to next step
                        }}
                        className="relative h-20 sm:h-24 rounded-xl overflow-hidden transition-all hover:scale-105 border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-lg mobile-card-hover"
                      >
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${festival.images[0]})` 
                          }}
                        />
                        
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
                        
                        {/* Festival Name */}
                        <div className="absolute inset-0 flex items-end justify-center p-2">
                          <div className="text-white font-semibold text-xs sm:text-sm text-center leading-tight drop-shadow-lg">
                            {festival.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={false}
                  animate={{
                    backgroundColor: activeStep === 1 ? 'rgba(231, 115, 180, 0.05)' : 'rgba(231, 115, 180, 0)',
                    borderRadius: '1rem',
                    padding: activeStep === 1 ? '1rem' : '0.5rem'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
                    className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all mobile-touch"
                  >
                    <div className="flex items-center">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 sm:mr-3">1</span>
                      <div className="flex-1">
                        <span className="font-semibold">Choose Your Festival</span>
                        {activeStep !== 1 && selectedFestival && (
                          <div className="text-sm text-gray-600 mt-0.5">
                            Selected: {currentFestival?.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeStep === 1 ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                          {festivals.map(festival => (
                            <button
                              key={festival.id}
                              onClick={() => {
                                setSelectedFestival(festival.id);
                                setSelectedTemplate('classic'); // Set default template
                                setActiveStep(2); // Move to next step
                              }}
                              className={`relative h-20 sm:h-24 rounded-xl overflow-hidden transition-all hover:scale-105 border-2 mobile-card-hover ${
                                selectedFestival === festival.id
                                  ? 'border-primary-500 ring-2 ring-primary-200 shadow-lg transform scale-105'
                                  : 'border-gray-200 hover:border-primary-300 shadow-md hover:shadow-lg'
                              }`}
                            >
                              {/* Background Image */}
                              <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ 
                                  backgroundImage: `url(${festival.images[0]})` 
                                }}
                              />
                              
                              {/* Dark Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
                              
                              {/* Festival Name */}
                              <div className="absolute inset-0 flex items-end justify-center p-2">
                                <div className="text-white font-semibold text-xs sm:text-sm text-center leading-tight drop-shadow-lg">
                                  {festival.name}
                                </div>
                              </div>

                              {/* Selection Indicator */}
                              {selectedFestival === festival.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Template Selection - Desktop Only (moved to Preview tab on mobile) */}
              {selectedFestival && (
                <motion.div 
                className="mb-4 sm:mb-6 hidden lg:block"
                initial={false}
                animate={{
                  backgroundColor: activeStep === 2 ? 'rgba(231, 115, 180, 0.05)' : 'rgba(231, 115, 180, 0)',
                  borderRadius: '1rem',
                  padding: activeStep === 2 ? '1rem' : '0.5rem'
                }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
                  className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all mobile-touch"
                >
                  <div className="flex items-center">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 sm:mr-3">2</span>
                    <div className="flex-1">
                      <span className="font-semibold">Select Template Style</span>
                      {activeStep !== 2 && selectedTemplate && (
                        <div className="text-sm text-gray-600 mt-0.5">
                          Selected: {templates.find(t => t.id === selectedTemplate)?.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeStep === 2 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {templates.map(template => (
                          <button
                            key={template.id}
                            onClick={() => {
                              setSelectedTemplate(template.id);
                              setActiveStep(3); // Move to next step
                            }}
                            className={`p-3 sm:p-4 text-left rounded-xl border-2 transition-all hover:scale-105 mobile-card-hover ${
                              selectedTemplate === template.id
                                ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-purple-50 shadow-lg transform scale-105'
                                : 'border-gray-200 hover:border-primary-300 bg-white hover:bg-gradient-to-br hover:from-primary-25 hover:to-purple-25'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <div className="text-sm sm:text-base font-semibold text-gray-800 truncate">{template.name}</div>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 line-clamp-2">{template.description}</div>
                            <div className="mt-2">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                template.category === 'elegant' ? 'bg-purple-100 text-purple-800' :
                                template.category === 'minimal' ? 'bg-blue-100 text-blue-800' :
                                template.category === 'festive' ? 'bg-pink-100 text-pink-800' :
                                template.category === 'classic' ? 'bg-amber-100 text-amber-800' :
                                template.category === 'dramatic' ? 'bg-gray-100 text-gray-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {template.category}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              )}

              {/* Image Selection - Mobile Optimized and Collapsible */}
              {currentFestival && (
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={false}
                  animate={{
                    backgroundColor: activeStep === 3 ? 'rgba(231, 115, 180, 0.05)' : 'rgba(231, 115, 180, 0)',
                    borderRadius: '1rem',
                    padding: activeStep === 3 ? '1rem' : '0.5rem'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
                    className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all mobile-touch"
                  >
                    <div className="flex items-center">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 sm:mr-3">3</span>
                      <div className="flex-1">
                        <span className="font-semibold">Choose or Upload Image</span>
                        <span className="text-sm text-gray-500 ml-1">({currentFestival.images.length} available)</span>
                        {activeStep !== 3 && (selectedImage || customImage) && (
                          <div className="text-sm text-gray-600 mt-0.5">
                            {customImage ? 'Custom image uploaded' : 'Festival image selected'}
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeStep === 3 ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {activeStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {/* Image Upload and Selection Section */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-dashed border-purple-200">
                          <ImageUpload 
                            onImageUpload={handleImageUpload}
                            onImageSelect={(imageUrl: string) => {
                              setSelectedImage(imageUrl);
                              setCustomImage(''); // Clear custom image if festival image selected
                              setActiveStep(4); // Move to next step when image is selected
                            }}
                            currentImage={customImage}
                            festivalImages={currentFestival?.images || []}
                            festivalName={currentFestival?.name || ''}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Message and Name Inputs - Mobile Stacked and Collapsible */}
              {selectedFestival && (
                <motion.div 
                className="mb-4 sm:mb-6"
                initial={false}
                animate={{
                  backgroundColor: activeStep === 4 ? 'rgba(231, 115, 180, 0.05)' : 'rgba(231, 115, 180, 0)',
                  borderRadius: '1rem',
                  padding: activeStep === 4 ? '1rem' : '0.5rem'
                }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setActiveStep(activeStep === 4 ? 0 : 4)}
                  className="w-full flex items-center justify-between text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all mobile-touch"
                >
                  <div className="flex items-center">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2 sm:mr-3">4</span>
                    <div className="flex-1">
                      <span className="font-semibold">Personalize Your Card</span>
                      {activeStep !== 4 && (message || senderName) && (
                        <div className="text-sm text-gray-600 mt-0.5">
                          {senderName && `From: ${senderName}`}
                          {senderName && message && ' • '}
                          {message && `Message: ${message.length > 30 ? message.substring(0, 30) + '...' : message}`}
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeStep === 4 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {activeStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                            Personal Message
                          </label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={currentFestival?.defaultMessage}
                            className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all h-24 sm:h-32 resize-none text-gray-800 bg-white placeholder-gray-500 text-sm sm:text-base"
                            maxLength={500}
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">{message.length}/500 characters</span>
                            <AISuggestions 
                              festivalName={currentFestival?.name || ''}
                              onSelectSuggestion={(suggestion: string) => setMessage(suggestion)}
                              currentMessage={message}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={senderName}
                            onChange={(e) => {
                              setSenderName(e.target.value);
                              
                              // Auto-switch to preview on mobile when name is entered (with debouncing)
                              if (isMobile && currentFestival && selectedTemplate && message) {
                                // Clear existing timer
                                if (nameInputTimer) {
                                  clearTimeout(nameInputTimer);
                                }
                                
                                // Set new timer - switch to preview after user stops typing
                                if (e.target.value.length > 0) {
                                  const timer = setTimeout(() => {
                                    setActiveTab('preview');
                                  }, 1500); // 1.5 second delay
                                  setNameInputTimer(timer);
                                }
                              }
                            }}
                            placeholder="Enter your name"
                            className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all text-gray-800 bg-white placeholder-gray-500 text-sm sm:text-base"
                            maxLength={50}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              )}
            </div>
          </div>

          {/* Preview Panel - Mobile Optimized */}
          <div className={`lg:col-span-1 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="hidden lg:block text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 text-center">Live Preview</h3>
              
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <iframe
                  ref={previewRef}
                  className="w-full border-none h-80 sm:h-96 lg:h-96 xl:h-[500px]"
                  title="Card Preview"
                />
                {!generatedHTML && (
                  <div className="flex items-center justify-center text-gray-500 h-80 sm:h-96 lg:h-96 xl:h-[500px]">
                    <div className="text-center p-4 sm:p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Preview Ready</p>
                      <p className="text-sm text-gray-600 leading-relaxed px-2">Select a festival to see your beautiful card</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Template Thumbnails - Mobile Only in Preview Tab */}
              <div className="lg:hidden mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">Try Different Styles</h4>
                  <span className="text-xs text-gray-500">{templates.length} styles</span>
                </div>
                
                {/* Horizontal scroll container with 2 rows */}
                <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                  <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
                    {/* Split templates into 2 rows */}
                    <div className="flex flex-col gap-2">
                      {/* First row */}
                      <div className="flex gap-2">
                        {templates.slice(0, Math.ceil(templates.length / 2)).map((template) => (
                          <button
                            key={`row1-${template.id}`}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`flex-shrink-0 w-20 h-14 rounded-lg border-2 transition-all duration-200 touch-manipulation ${
                              selectedTemplate === template.id
                                ? 'border-primary-500 bg-primary-50 shadow-md transform scale-105'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 relative">
                              <div className="text-[8px] font-semibold text-gray-700 text-center leading-tight w-full line-clamp-2">
                                {template.name}
                              </div>
                              {selectedTemplate === template.id && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-[7px]">✓</span>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Second row */}
                      <div className="flex gap-2">
                        {templates.slice(Math.ceil(templates.length / 2)).map((template) => (
                          <button
                            key={`row2-${template.id}`}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`flex-shrink-0 w-20 h-14 rounded-lg border-2 transition-all duration-200 touch-manipulation ${
                              selectedTemplate === template.id
                                ? 'border-primary-500 bg-primary-50 shadow-md transform scale-105'
                                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-2 relative">
                              <div className="text-[8px] font-semibold text-gray-700 text-center leading-tight w-full line-clamp-2">
                                {template.name}
                              </div>
                              {selectedTemplate === template.id && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-[7px]">✓</span>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scroll indicator */}
                <div className="flex justify-center mt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>←</span>
                    <span>Swipe to try more styles</span>
                    <span>→</span>
                  </div>
                </div>
              </div>

              {/* Share Options - Always visible when card is generated */}
              {generatedHTML && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 space-y-4 ${activeTab === 'preview' ? 'block lg:block' : 'hidden lg:block'}`}
                >
                  {/* Primary Action Buttons */}
                  <div className="grid grid-cols-5 gap-1.5 mb-4">
                    <button
                      onClick={downloadAsImage}
                      title="Download as Image"
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={copyHTML}
                      title="Copy HTML Code"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={generateEmailVersion}
                      title="Share via Email"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={printCardNow}
                      title="Print Card"
                      className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowAdvancedExport(true)}
                      title="Advanced Export Options"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Social Media Sharing */}
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-100">
                    <h4 className="font-semibold text-gray-800 mb-2 text-center text-sm">Share on Social Media</h4>
                    <div className="grid grid-cols-4 gap-1.5">
                      <button
                        onClick={() => shareCard('whatsapp')}
                        title="Share on WhatsApp"
                        className="bg-green-600 text-white p-1 rounded-md font-medium hover:bg-green-700 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareCard('facebook')}
                        title="Share on Facebook"
                        className="bg-blue-600 text-white p-1 rounded-md font-medium hover:bg-blue-700 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareCard('twitter')}
                        title="Share on Twitter"
                        className="bg-sky-500 text-white p-1 rounded-md font-medium hover:bg-sky-600 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => shareCard('telegram')}
                        title="Share on Telegram"
                        className="bg-blue-500 text-white p-1 rounded-md font-medium hover:bg-blue-600 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mobile Share Panel - Step 5 Content moved here */}
              <div className={`lg:hidden mt-4 ${activeTab === 'share' ? 'block' : 'hidden'}`}>
                {generatedHTML ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Primary Action Buttons */}
                    <div className="grid grid-cols-4 gap-1.5 mb-4">
                      <button
                        onClick={downloadAsImage}
                        title="Download as Image"
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square touch-manipulation"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={copyHTML}
                        title="Copy HTML Code"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square touch-manipulation"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={generateEmailVersion}
                        title="Share via Email"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square touch-manipulation"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button
                        onClick={printCardNow}
                        title="Print Card"
                        className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-1 rounded-md font-semibold hover:shadow-lg hover:scale-110 transition-all flex items-center justify-center aspect-square touch-manipulation"
                      >
                        <Printer className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Advanced Export */}
                    <div className="mb-3">
                      <button
                        onClick={() => setShowAdvancedExport(true)}
                        title="Advanced Export Options"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-0.5 px-2 rounded-md font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5 touch-manipulation"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs">Advanced Export</span>
                      </button>
                    </div>

                    {/* Social Media Sharing */}
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-3 border border-pink-100">
                      <h4 className="font-semibold text-gray-800 mb-2 text-center text-sm">Share on Social Media</h4>
                      <div className="grid grid-cols-4 gap-1.5">
                        <button
                          onClick={() => shareCard('whatsapp')}
                          title="Share on WhatsApp"
                          className="bg-green-600 text-white p-1 rounded-md font-medium hover:bg-green-700 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square touch-manipulation"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => shareCard('facebook')}
                          title="Share on Facebook"
                          className="bg-blue-600 text-white p-1 rounded-md font-medium hover:bg-blue-700 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square touch-manipulation"
                        >
                          <Facebook className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => shareCard('twitter')}
                          title="Share on Twitter"
                          className="bg-sky-500 text-white p-1 rounded-md font-medium hover:bg-sky-600 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square touch-manipulation"
                        >
                          <Twitter className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => shareCard('telegram')}
                          title="Share on Telegram"
                          className="bg-blue-500 text-white p-1 rounded-md font-medium hover:bg-blue-600 hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center aspect-square touch-manipulation"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Generate your card first</p>
                    <p className="text-sm text-gray-500">Then you can share and download it</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Export Modal */}
        <AnimatePresence>
          {showAdvancedExport && (
            <AdvancedExport
              htmlContent={generatedHTML}
              festivalName={currentFestival?.name || ''}
              isVisible={showAdvancedExport}
              onClose={() => setShowAdvancedExport(false)}
            />
          )}
        </AnimatePresence>

        {/* Snackbar */}
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          isVisible={snackbar.isVisible}
          onClose={hideSnackbar}
        />
      </div>
    </div>
  );
}