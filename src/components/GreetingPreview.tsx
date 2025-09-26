import React, { useState } from 'react';

interface GeneratedGreeting {
  content: string;
  festival: string;
  recipient: string;
  style: string;
  language: string;
  timestamp: string;
}

interface GreetingPreviewProps {
  greeting: GeneratedGreeting | null;
  isLoading: boolean;
}

export const GreetingPreview: React.FC<GreetingPreviewProps> = ({ greeting, isLoading }) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const handleCopyToClipboard = async () => {
    if (greeting?.content) {
      try {
        await navigator.clipboard.writeText(greeting.content);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleShare = async () => {
    if (greeting?.content) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${greeting.festival} Greeting`,
            text: greeting.content,
          });
        } catch (err) {
          console.error('Failed to share:', err);
        }
      } else {
        handleCopyToClipboard();
      }
    }
  };

  const handleDownload = () => {
    if (greeting?.content) {
      const element = document.createElement('a');
      const file = new Blob([greeting.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${greeting.festival}_greeting_${greeting.recipient}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4">Generating your personalized greeting...</p>
      </div>
    );
  }

  if (!greeting) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Create</h3>
        <p className="text-gray-600">
          Fill out the form to generate your personalized festival greeting. 
          Your greeting will appear here with formatting, cultural context, and sharing options.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-gray-500">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">📱</span>
            <span>Social Media Ready</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">🌍</span>
            <span>Multi-Language</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">🎨</span>
            <span>Multiple Styles</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Your Festival Greeting</h3>
            <p className="text-purple-100 text-sm">
              {greeting.festival || 'Unknown'} • {greeting.style || 'Unknown'} style • {greeting.language || 'Unknown'}
            </p>
          </div>
          <div className="text-3xl">
            {greeting.festival?.toLowerCase() === 'diwali' ? '🪔' :
             greeting.festival?.toLowerCase() === 'holi' ? '🎨' :
             greeting.festival?.toLowerCase() === 'christmas' ? '🎄' :
             greeting.festival?.toLowerCase() === 'eid' ? '🌙' : '🎉'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
            {greeting.content || 'No content available'}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copiedToClipboard ? (
              <>
                <span className="mr-2">✅</span>
                Copied!
              </>
            ) : (
              <>
                <span className="mr-2">📋</span>
                Copy
              </>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="mr-2">📤</span>
            Share
          </button>
          
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span className="mr-2">💾</span>
            Download
          </button>
          
          <button
            onClick={() => window.open(`mailto:?subject=${encodeURIComponent((greeting?.festival || 'Festival') + ' Greeting')}&body=${encodeURIComponent(greeting?.content || 'No content available')}`)}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <span className="mr-2">📧</span>
            Email
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Recipient: {greeting?.recipient || 'Unknown'}</span>
            <span>Generated: {greeting?.timestamp ? new Date(greeting.timestamp).toLocaleString() : 'Unknown'}</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border-t p-4">
        <h4 className="font-medium text-blue-800 mb-2">💡 Sharing Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Perfect for WhatsApp, social media, or email</li>
          <li>• Add emojis for digital platforms</li>
          <li>• Consider local customs when sharing</li>
          <li>• Save as a template for future use</li>
        </ul>
      </div>
    </div>
  );
};