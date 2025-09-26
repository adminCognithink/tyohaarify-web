'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Eye, Download, Heart, Share2, ArrowRight } from 'lucide-react';
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
import { getAllFestivals } from '@/data/festivals';

const templates = [
  { 
    id: 'classic', 
    name: 'Classic Elegant', 
    func: classicElegantTemplate, 
    description: 'Perfect for formal occasions and email sharing',
    category: 'elegant',
    icon: '👑',
    color: 'purple',
    features: ['Formal Design', 'Email Ready', 'Print Friendly']
  },
  { 
    id: 'modern', 
    name: 'Modern Minimalist', 
    func: modernMinimalistTemplate, 
    description: 'Clean design ideal for professional sharing',
    category: 'minimal',
    icon: '✨',
    color: 'blue',
    features: ['Clean Layout', 'Professional', 'Responsive']
  },
  { 
    id: 'collage', 
    name: 'Festive Collage', 
    func: festiveCollageTemplate, 
    description: 'Colorful and fun, great for social media',
    category: 'festive',
    icon: '🎊',
    color: 'pink',
    features: ['Vibrant Colors', 'Social Media Ready', 'Fun Design']
  },
  { 
    id: 'vintage', 
    name: 'Vintage Postcard', 
    func: vintagePostcardTemplate, 
    description: 'Traditional style perfect for printing',
    category: 'classic',
    icon: '📜',
    color: 'amber',
    features: ['Traditional Look', 'Print Optimized', 'Nostalgic Feel']
  },
  { 
    id: 'social', 
    name: 'Social Media Ready', 
    func: socialMediaTemplate, 
    description: 'Square format optimized for Instagram and Facebook',
    category: 'modern',
    icon: '🚀',
    color: 'green',
    features: ['Square Format', 'Instagram Ready', 'Facebook Optimized']
  },
  { 
    id: 'blackshadow', 
    name: 'Black Shadow Overlay', 
    func: blackShadowTemplate, 
    description: 'Dramatic dark overlay with bold text on top',
    category: 'dramatic',
    icon: '🖤',
    color: 'gray',
    features: ['Dramatic Effect', 'Bold Typography', 'High Contrast']
  },
  { 
    id: 'whiteshadow', 
    name: 'White Shadow Overlay', 
    func: whiteShadowTemplate, 
    description: 'Light elegant overlay with soft text styling',
    category: 'elegant',
    icon: '🤍',
    color: 'slate',
    features: ['Soft Elegance', 'Light Overlay', 'Readable Text']
  },
  { 
    id: 'darkgradient', 
    name: 'Dark Gradient', 
    func: darkGradientTemplate, 
    description: 'Rich dark gradient perfect for evening celebrations',
    category: 'dramatic',
    icon: '🌃',
    color: 'indigo',
    features: ['Evening Theme', 'Rich Colors', 'Premium Look']
  },
  { 
    id: 'lightgradient', 
    name: 'Light Gradient', 
    func: lightGradientTemplate, 
    description: 'Bright airy gradient with floating elements',
    category: 'modern',
    icon: '☀️',
    color: 'yellow',
    features: ['Bright Design', 'Floating Effects', 'Cheerful Mood']
  },
  { 
    id: 'glassmorphism', 
    name: 'Glass Morphism', 
    func: glassMorphismTemplate, 
    description: 'Modern frosted glass effect with stunning backdrop',
    category: 'premium',
    icon: '💎',
    color: 'cyan',
    features: ['Glass Effect', 'Premium Design', 'Modern UI']
  },
  { 
    id: 'neonglow', 
    name: 'Neon Glow', 
    func: neonGlowTemplate, 
    description: 'Futuristic neon effects perfect for vibrant celebrations',
    category: 'premium',
    icon: '⚡',
    color: 'purple',
    features: ['Neon Effects', 'Futuristic', 'Eye-catching']
  },
  { 
    id: 'papercut', 
    name: 'Paper Cut Art', 
    func: paperCutTemplate, 
    description: 'Elegant paper craft inspired design with ornate details',
    category: 'premium',
    icon: '📄',
    color: 'amber',
    features: ['Handcrafted Look', 'Ornate Details', 'Premium Feel']
  },
  { 
    id: 'watercolor', 
    name: 'Watercolor Dream', 
    func: watercolorTemplate, 
    description: 'Artistic watercolor effects with flowing paint splashes',
    category: 'premium',
    icon: '🎨',
    color: 'pink',
    features: ['Artistic Style', 'Flowing Effects', 'Creative Design']
  },
  { 
    id: 'floating3d', 
    name: '3D Floating', 
    func: floating3DTemplate, 
    description: '3D floating card with depth and dynamic lighting',
    category: 'premium',
    icon: '🌟',
    color: 'blue',
    features: ['3D Effects', 'Dynamic Light', 'Floating Animation']
  },
  { 
    id: 'holographic', 
    name: 'Holographic', 
    func: holographicTemplate, 
    description: 'Stunning holographic effects with rainbow animations',
    category: 'premium',
    icon: '🌈',
    color: 'gradient',
    features: ['Holographic', 'Rainbow Effects', 'Stunning Visuals']
  }
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewFestival, setPreviewFestival] = useState('diwali');
  const festivals = getAllFestivals();

  const generatePreview = (templateFunc: Function, templateId: string) => {
    const festival = festivals.find(f => f.id === previewFestival);
    if (!festival) return '';

    return templateFunc(
      festival.name,
      festival.images[0],
      festival.defaultMessage,
      'Preview User'
    );
  };

  const downloadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    const html = generatePreview(template.func, templateId);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}-template.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'elegant': return 'from-purple-500 to-indigo-600';
      case 'minimal': return 'from-blue-500 to-cyan-600';
      case 'festive': return 'from-pink-500 to-red-600';
      case 'classic': return 'from-amber-500 to-orange-600';
      case 'modern': return 'from-green-500 to-emerald-600';
      case 'dramatic': return 'from-gray-800 to-slate-900';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-Optimized Header */}
        <div className="mb-6 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mobile-touch w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Generator</span>
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="text-sm font-medium text-gray-700">Preview with:</label>
              <select
                value={previewFestival}
                onChange={(e) => setPreviewFestival(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm sm:text-base text-gray-900 bg-white mobile-touch"
              >
                {festivals.map(festival => (
                  <option key={festival.id} value={festival.id}>
                    {festival.emoji} {festival.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Template 
              <span className="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent"> Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates. 
              Each template is crafted for different occasions and sharing preferences.
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Template Preview */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <iframe
                  srcDoc={generatePreview(template.func, template.id)}
                  className="w-full h-full border-none transform scale-50 origin-top-left"
                  style={{ width: '200%', height: '200%' }}
                  title={`${template.name} Preview`}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedTemplate(template.id)}
                      className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                      title="Preview Template"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                    <Link
                      href={`/create?template=${template.id}`}
                      className="bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                      title="Use This Template"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </Link>
                    <button
                      onClick={() => downloadTemplate(template.id)}
                      className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                      title="Download Template"
                    >
                      <Download className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{template.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 text-xs rounded-full border border-primary-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
                    className="flex-1 bg-gradient-to-r from-primary-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <Link
                    href={`/create?template=${template.id}`}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Use Template</span>
                  </Link>
                  <button
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Add to Favorites"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Share Template"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Create Your Card?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose your favorite template and start creating beautiful festival greeting cards
          </p>
          <Link
            href="/#create"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <span>Start Creating Now</span>
            <span>🎨</span>
          </Link>
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {templates.find(t => t.id === selectedTemplate)?.name}
                    </h3>
                    <p className="text-gray-600">
                      {templates.find(t => t.id === selectedTemplate)?.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6">
                <iframe
                  srcDoc={generatePreview(
                    templates.find(t => t.id === selectedTemplate)?.func || (() => ''),
                    selectedTemplate
                  )}
                  className="w-full h-96 border border-gray-300 rounded-lg"
                  title="Template Preview"
                />
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => downloadTemplate(selectedTemplate)}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <Link
                    href={`/create?template=${selectedTemplate}`}
                    className="bg-gradient-to-r from-primary-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                  >
                    <span>Use This Template</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}