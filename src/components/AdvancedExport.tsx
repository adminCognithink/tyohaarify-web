'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExportService, ExportOptions, SocialMediaFormat } from '@/lib/export-service';

interface AdvancedExportProps {
  htmlContent: string;
  festivalName: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function AdvancedExport({ 
  htmlContent, 
  festivalName, 
  isVisible, 
  onClose 
}: AdvancedExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['png']);

  const exportFormats = [
    {
      id: 'png',
      name: 'PNG Image',
      description: 'Best for web and social media',
      icon: '🖼️',
      category: 'image'
    },
    {
      id: 'jpeg',
      name: 'JPEG Image',
      description: 'Smaller file size, good for email',
      icon: '📷',
      category: 'image'
    },
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Perfect for printing',
      icon: '📄',
      category: 'document'
    },
    {
      id: 'webp',
      name: 'WebP Image',
      description: 'Modern format, smaller size',
      icon: '🌐',
      category: 'image'
    }
  ];

  const socialFormats: Array<{
    platform: SocialMediaFormat['platform'];
    name: string;
    description: string;
    dimensions: string;
    icon: string;
  }> = [
    {
      platform: 'instagram-post',
      name: 'Instagram Post',
      description: 'Square format for feed posts',
      dimensions: '1080×1080',
      icon: '📸'
    },
    {
      platform: 'instagram-story',
      name: 'Instagram Story',
      description: 'Vertical format for stories',
      dimensions: '1080×1920',
      icon: '📱'
    },
    {
      platform: 'facebook-post',
      name: 'Facebook Post',
      description: 'Landscape format for posts',
      dimensions: '1200×630',
      icon: '👥'
    },
    {
      platform: 'facebook-cover',
      name: 'Facebook Cover',
      description: 'Cover photo format',
      dimensions: '1200×315',
      icon: '🎭'
    },
    {
      platform: 'twitter-post',
      name: 'Twitter Post',
      description: 'Optimized for Twitter',
      dimensions: '1200×675',
      icon: '🐦'
    },
    {
      platform: 'linkedin-post',
      name: 'LinkedIn Post',
      description: 'Professional format',
      dimensions: '1200×627',
      icon: '💼'
    }
  ];

  const printFormats = [
    { id: 'a4', name: 'A4 (210×297mm)', description: 'Standard paper size' },
    { id: 'a5', name: 'A5 (148×210mm)', description: 'Half of A4' },
    { id: 'letter', name: 'Letter (8.5×11in)', description: 'US standard' },
    { id: 'postcard', name: 'Postcard (6×4in)', description: 'Traditional card size' }
  ];

  const handleExport = async (type: 'single' | 'social' | 'print' | 'all') => {
    if (!htmlContent) {
      alert('No card content to export');
      return;
    }

    setIsExporting(true);
    
    try {
      if (type === 'single') {
        // Export selected formats
        const exports = await Promise.all(
          selectedFormats.map(async (format) => {
            if (format === 'pdf') {
              const blob = await ExportService.exportAsPDF(htmlContent, {
                title: `${festivalName} Greeting Card`
              });
              return { name: format, blob, filename: `${festivalName}-card.pdf` };
            } else {
              const blob = await ExportService.exportAsImage(htmlContent, {
                format: format as ExportOptions['format'],
                width: 1200,
                height: 900,
                quality: 0.9
              });
              return { name: format, blob, filename: `${festivalName}-card.${format}` };
            }
          })
        );

        // Download each file
        exports.forEach(({ blob, filename }) => {
          ExportService.downloadBlob(blob, filename);
        });

      } else if (type === 'social') {
        // Export all social media formats
        const exports = await Promise.all(
          socialFormats.map(async ({ platform, name }) => {
            const blob = await ExportService.exportForSocialMedia(htmlContent, platform);
            return {
              name,
              blob,
              filename: `${festivalName}-${platform}.png`
            };
          })
        );

        // Create and download zip
        const zipBlob = await ExportService.createZipPackage(exports);
        ExportService.downloadBlob(zipBlob, `${festivalName}-social-media-pack.zip`);

      } else if (type === 'print') {
        // Export print-ready versions
        const exports = await Promise.all(
          printFormats.map(async ({ id, name }) => {
            const { pdf, highResPng } = await ExportService.createPrintableVersion(
              htmlContent,
              id as any
            );
            return [
              { name: `${name} PDF`, blob: pdf, filename: `${festivalName}-${id}.pdf` },
              { name: `${name} High-Res PNG`, blob: highResPng, filename: `${festivalName}-${id}.png` }
            ];
          })
        );

        // Flatten and download
        exports.flat().forEach(({ blob, filename }) => {
          ExportService.downloadBlob(blob, filename);
        });

      } else if (type === 'all') {
        alert('Exporting all formats... This may take a moment.');
        
        // Export everything
        await Promise.all([
          handleExport('single'),
          handleExport('social'),
          handleExport('print')
        ]);
      }

    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const toggleFormat = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId)
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📥</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Advanced Export</h2>
              <p className="text-gray-600">Export your {festivalName} card in multiple formats</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => handleExport('single')}
              disabled={isExporting || selectedFormats.length === 0}
              className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-blue-200 transition-all disabled:opacity-50"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium text-blue-800">Quick Export</div>
              <div className="text-xs text-blue-600">Selected formats</div>
            </button>

            <button
              onClick={() => handleExport('social')}
              disabled={isExporting}
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border-2 border-purple-200 transition-all disabled:opacity-50"
            >
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium text-purple-800">Social Media</div>
              <div className="text-xs text-purple-600">All platforms</div>
            </button>

            <button
              onClick={() => handleExport('print')}
              disabled={isExporting}
              className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-all disabled:opacity-50"
            >
              <div className="text-2xl mb-2">🖨️</div>
              <div className="font-medium text-green-800">Print Ready</div>
              <div className="text-xs text-green-600">All sizes</div>
            </button>

            <button
              onClick={() => handleExport('all')}
              disabled={isExporting}
              className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border-2 border-orange-200 transition-all disabled:opacity-50"
            >
              <div className="text-2xl mb-2">📦</div>
              <div className="font-medium text-orange-800">Export All</div>
              <div className="text-xs text-orange-600">Everything</div>
            </button>
          </div>

          {/* Standard Formats */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>🎨</span>
              <span>Standard Formats</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <label
                  key={format.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFormats.includes(format.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFormats.includes(format.id)}
                    onChange={() => toggleFormat(format.id)}
                    className="sr-only"
                  />
                  <span className="text-2xl">{format.icon}</span>
                  <div>
                    <div className="font-medium">{format.name}</div>
                    <div className="text-sm text-gray-600">{format.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Social Media Formats */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>📱</span>
              <span>Social Media Formats</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {socialFormats.map((format) => (
                <div
                  key={format.platform}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xl">{format.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{format.name}</div>
                      <div className="text-xs text-gray-500">{format.dimensions}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{format.description}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Click "Social Media" above to export all social formats at once
            </p>
          </div>

          {/* Print Formats */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>🖨️</span>
              <span>Print Formats</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {printFormats.map((format) => (
                <div
                  key={format.id}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="font-medium">{format.name}</div>
                  <div className="text-sm text-gray-600">{format.description}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Click "Print Ready" above to export all print formats (PDF + High-Res PNG)
            </p>
          </div>

          {/* Export Status */}
          {isExporting && (
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 font-medium">Exporting your card...</span>
              </div>
              <p className="text-sm text-blue-600">
                This may take a few moments depending on the number of formats selected
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}