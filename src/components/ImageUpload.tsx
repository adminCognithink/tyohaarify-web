'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
  festivalImages?: string[];
  festivalName?: string;
}

export default function ImageUpload({ 
  onImageUpload, 
  onImageSelect, 
  currentImage, 
  festivalImages = [], 
  festivalName = '' 
}: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'festival' | 'upload' | 'recent'>('festival');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    for (const file of acceptedFiles) {
      try {
        // Validate file
        if (!file.type.startsWith('image/')) {
          alert('Please upload only image files');
          continue;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert('File size should be less than 5MB');
          continue;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setUploadedImages(prev => [...prev, previewUrl]);
        
        // Call the upload handler
        onImageUpload(file);
        
        // Auto-select the uploaded image
        onImageSelect(previewUrl);
        
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
    
    setIsUploading(false);
  }, [onImageUpload, onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true,
    maxFiles: 5
  });

  const tabs = [
    { id: 'festival', name: `${festivalName} Images`, count: festivalImages.length },
    { id: 'upload', name: 'Upload Custom', count: uploadedImages.length },
    { id: 'recent', name: 'Recent Uploads', count: 0 }
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              selectedTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.name}
            {tab.count > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-600 bg-blue-100 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Festival Images Tab */}
        {selectedTab === 'festival' && (
          <motion.div
            key="festival"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-3 gap-3"
          >
            {festivalImages.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onImageSelect(image)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentImage === image
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${festivalName} ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {currentImage === image && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center"
                  >
                    <span className="text-blue-600 text-xl font-bold">✓</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Upload Tab */}
        {selectedTab === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Drag & Drop Zone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-3">
                <div className="text-4xl">📸</div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {isDragActive ? 'Drop your images here' : 'Upload Custom Images'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Drag & drop or click to select • Max 5MB each • JPG, PNG, GIF, WebP
                  </p>
                </div>
                {isUploading && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-blue-600">Uploading...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Uploaded Images Grid */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {uploadedImages.map((image, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onImageSelect(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === image
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {currentImage === image && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center"
                      >
                        <span className="text-blue-600 text-xl font-bold">✓</span>
                      </motion.div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedImages(prev => prev.filter((_, i) => i !== index));
                        if (currentImage === image) {
                          onImageSelect('');
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Upload Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">💡 Upload Tips:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use high-resolution images for better quality</li>
                <li>• Square images work best for social media formats</li>
                <li>• Avoid images with too much text for better readability</li>
                <li>• Consider the festival theme when selecting images</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Recent Tab */}
        {selectedTab === 'recent' && (
          <motion.div
            key="recent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">📷</div>
            <p className="text-gray-500">Recent uploads will appear here</p>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to save and access your uploaded images across sessions
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}