import React, { useState, useEffect, useCallback } from 'react';

interface TemplateCustomizerProps {
  festival: string;
  initialTemplate?: string;
  onCustomizeCall: (tool: string, args: any) => Promise<any>;
  onTemplateChange: (customizedTemplate: string) => void;
}

interface CustomizationOptions {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  fonts: {
    title: string;
    body: string;
  };
  layout: 'centered' | 'banner' | 'card';
  elements: {
    border: boolean;
    background_image: boolean;
    decorative_elements: boolean;
    greeting_animation: boolean;
  };
}

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  festival,
  initialTemplate,
  onCustomizeCall,
  onTemplateChange,
}) => {
  const [customizations, setCustomizations] = useState<CustomizationOptions>({
    colors: {
      primary: '#6B46C1',
      secondary: '#EC4899',
      background: '#FFFFFF',
    },
    fonts: {
      title: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    layout: 'centered',
    elements: {
      border: true,
      background_image: true,
      decorative_elements: true,
      greeting_animation: false,
    },
  });

  const [customizedTemplate, setCustomizedTemplate] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'layout' | 'elements'>('colors');

  const colorPresets = [
    { name: 'Royal Purple', primary: '#6B46C1', secondary: '#EC4899', background: '#FFFFFF' },
    { name: 'Festival Gold', primary: '#F59E0B', secondary: '#EF4444', background: '#FEF3C7' },
    { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#06B6D4', background: '#F0F9FF' },
    { name: 'Forest Green', primary: '#059669', secondary: '#10B981', background: '#F0FDF4' },
    { name: 'Sunset Orange', primary: '#EA580C', secondary: '#F97316', background: '#FFF7ED' },
    { name: 'Cherry Blossom', primary: '#EC4899', secondary: '#F472B6', background: '#FDF2F8' },
  ];

  const fontOptions = [
    'Inter, sans-serif',
    'Poppins, sans-serif',
    'Roboto, sans-serif',
    'Playfair Display, serif',
    'Crimson Text, serif',
    'Dancing Script, cursive',
    'Great Vibes, cursive',
    'Montserrat, sans-serif',
  ];

  const layoutOptions = [
    { value: 'centered', label: 'Centered', icon: '📱', description: 'Classic centered layout' },
    { value: 'banner', label: 'Banner', icon: '🖼️', description: 'Wide banner style' },
    { value: 'card', label: 'Card', icon: '🎴', description: 'Modern card design' },
  ];

  const applyCustomizations = useCallback(async () => {
    setIsProcessing(true);
    try {
      const result = await onCustomizeCall('customize_template', {
        festival,
        template: initialTemplate || '',
        customizations: {
          colors: customizations.colors,
          fonts: customizations.fonts,
          layout: customizations.layout,
          elements: customizations.elements,
        },
      });
      setCustomizedTemplate(result.template);
      onTemplateChange(result.template);
    } catch (error) {
      console.error('Failed to customize template:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [onCustomizeCall, festival, initialTemplate, customizations, onTemplateChange]);

  useEffect(() => {
    if (festival && initialTemplate) {
      applyCustomizations();
    }
  }, [festival, initialTemplate, customizations]);

  const updateColor = (type: keyof CustomizationOptions['colors'], color: string) => {
    setCustomizations(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [type]: color,
      },
    }));
  };

  const updateFont = (type: keyof CustomizationOptions['fonts'], font: string) => {
    setCustomizations(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [type]: font,
      },
    }));
  };

  const updateLayout = (layout: CustomizationOptions['layout']) => {
    setCustomizations(prev => ({
      ...prev,
      layout,
    }));
  };

  const toggleElement = (element: keyof CustomizationOptions['elements']) => {
    setCustomizations(prev => ({
      ...prev,
      elements: {
        ...prev.elements,
        [element]: !prev.elements[element],
      },
    }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setCustomizations(prev => ({
      ...prev,
      colors: {
        primary: preset.primary,
        secondary: preset.secondary,
        background: preset.background,
      },
    }));
  };

  const renderColorsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Color Presets</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyColorPreset(preset)}
              className="p-3 rounded-lg border-2 border-transparent hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex space-x-1 mb-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.primary }}
                ></div>
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.secondary }}
                ></div>
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: preset.background }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Custom Colors</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={customizations.colors.primary}
              onChange={(e) => updateColor('primary', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={customizations.colors.primary}
              onChange={(e) => updateColor('primary', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secondary Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={customizations.colors.secondary}
              onChange={(e) => updateColor('secondary', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={customizations.colors.secondary}
              onChange={(e) => updateColor('secondary', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={customizations.colors.background}
              onChange={(e) => updateColor('background', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={customizations.colors.background}
              onChange={(e) => updateColor('background', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFontsTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Title Font
        </label>
        <select
          value={customizations.fonts.title}
          onChange={(e) => updateFont('title', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font.split(',')[0]}
            </option>
          ))}
        </select>
        <div
          className="mt-3 p-4 bg-gray-50 rounded-lg text-2xl font-bold"
          style={{ fontFamily: customizations.fonts.title }}
        >
          Happy {festival}!
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Body Font
        </label>
        <select
          value={customizations.fonts.body}
          onChange={(e) => updateFont('body', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font.split(',')[0]}
            </option>
          ))}
        </select>
        <div
          className="mt-3 p-4 bg-gray-50 rounded-lg"
          style={{ fontFamily: customizations.fonts.body }}
        >
          Wishing you joy, happiness, and prosperity on this special occasion.
        </div>
      </div>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Layout Style</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {layoutOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateLayout(option.value as CustomizationOptions['layout'])}
            className={`p-6 rounded-lg border-2 transition-all duration-200 ${
              customizations.layout === option.value
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-3xl mb-3">{option.icon}</div>
            <h4 className="font-semibold text-gray-800">{option.label}</h4>
            <p className="text-sm text-gray-600">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderElementsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Design Elements</h3>
      <div className="space-y-4">
        {[
          { key: 'border', label: 'Decorative Border', icon: '🔲' },
          { key: 'background_image', label: 'Background Image', icon: '🖼️' },
          { key: 'decorative_elements', label: 'Decorative Elements', icon: '✨' },
          { key: 'greeting_animation', label: 'Greeting Animation', icon: '🎬' },
        ].map((element) => (
          <div
            key={element.key}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{element.icon}</span>
              <span className="font-medium text-gray-800">{element.label}</span>
            </div>
            <button
              onClick={() => toggleElement(element.key as keyof CustomizationOptions['elements'])}
              className={`w-12 h-6 rounded-full transition-all duration-200 ${
                customizations.elements[element.key as keyof CustomizationOptions['elements']]
                  ? 'bg-purple-600'
                  : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                  customizations.elements[element.key as keyof CustomizationOptions['elements']]
                    ? 'translate-x-6'
                    : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Template Customizer Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Template Customizer</h2>
        <p className="text-gray-600">
          Customize your {festival} greeting template with personalized colors, fonts, and layouts.
        </p>
      </div>

      {/* Customization Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'colors', label: 'Colors', icon: '🎨' },
              { id: 'fonts', label: 'Fonts', icon: '📝' },
              { id: 'layout', label: 'Layout', icon: '📐' },
              { id: 'elements', label: 'Elements', icon: '✨' },
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
          {activeTab === 'colors' && renderColorsTab()}
          {activeTab === 'fonts' && renderFontsTab()}
          {activeTab === 'layout' && renderLayoutTab()}
          {activeTab === 'elements' && renderElementsTab()}
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Applying customizations...</p>
        </div>
      )}

      {/* Live Preview */}
      {customizedTemplate && !isProcessing && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
          <div
            className="p-6 rounded-lg border-2 border-dashed border-gray-300 text-center"
            style={{
              backgroundColor: customizations.colors.background,
              color: customizations.colors.primary,
              fontFamily: customizations.fonts.body,
            }}
          >
            <h4
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: customizations.fonts.title }}
            >
              Happy {festival}!
            </h4>
            <div
              className="prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: customizedTemplate }}
            />
          </div>
        </div>
      )}
    </div>
  );
};