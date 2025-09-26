// Utility functions for card generation and sharing

export const generateCardId = (festivalId: string, templateId: string, imageIndex: number): string => {
  return `${festivalId}-${templateId}-${imageIndex}-${Date.now()}`;
};

export const downloadAsImage = async (htmlContent: string, filename: string): Promise<void> => {
  // This function would require html2canvas or similar library
  // For now, we provide instructions to users
  console.log('To download as image:');
  console.log('1. Right-click on the preview');
  console.log('2. Select "Save as image" or take a screenshot');
  console.log('3. Or use browser print function to save as PDF');
};

export const shareOnSocialMedia = (platform: string, cardUrl?: string, message?: string): void => {
  const encodedMessage = encodeURIComponent(message || 'Check out this beautiful festival greeting card!');
  const encodedUrl = encodeURIComponent(cardUrl || window.location.href);

  let shareUrl = '';

  switch (platform.toLowerCase()) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedMessage}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`;
      break;
    default:
      console.log('Unsupported platform:', platform);
      return;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const generateEmailBody = (htmlContent: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Festival Greeting</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto;">
        ${htmlContent}
        <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: white; border-radius: 10px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                Created with ❤️ using <a href="${window.location.origin}" style="color: #007bff; text-decoration: none;">Tyohaarify</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

export const printCard = (htmlContent: string): void => {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
};

// Festival-specific utilities
export const getFestivalEmoji = (festivalId: string): string => {
  const emojiMap: Record<string, string> = {
    diwali: '🪔',
    christmas: '🎄',
    holi: '🎨',
    eid: '🌙',
    ganeshchaturthi: '🐘',
    dussehra: '🏹',
    newyear: '🎆',
    chinesenewyear: '🧧',
    easter: '🐰'
  };
  return emojiMap[festivalId] || '🎉';
};

export const getFestivalColors = (festivalId: string) => {
  const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
    diwali: { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F' },
    christmas: { primary: '#C41E3A', secondary: '#228B22', accent: '#FFD700' },
    holi: { primary: '#FF1493', secondary: '#00CED1', accent: '#FFD700' },
    eid: { primary: '#2E8B57', secondary: '#DAA520', accent: '#F0F8FF' },
    ganeshchaturthi: { primary: '#FF4500', secondary: '#FFD700', accent: '#FFA500' },
    dussehra: { primary: '#DC143C', secondary: '#FFD700', accent: '#FF8C00' },
    newyear: { primary: '#4B0082', secondary: '#FFD700', accent: '#FF69B4' },
    chinesenewyear: { primary: '#DC143C', secondary: '#FFD700', accent: '#FF6347' },
    easter: { primary: '#FF1493', secondary: '#32CD32', accent: '#FFD700' }
  };
  return colorMap[festivalId] || { primary: '#007bff', secondary: '#6c757d', accent: '#28a745' };
};