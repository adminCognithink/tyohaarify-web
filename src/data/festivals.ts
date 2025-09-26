export interface Festival {
  id: string;
  name: string;
  emoji: string;
  description: string;
  defaultMessage: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  images: string[];
}

export const festivals: Festival[] = [
  {
    id: 'diwali',
    name: 'Diwali',
    emoji: '🪔',
    description: 'Festival of Lights',
    defaultMessage: 'May this Diwali bring joy, prosperity, and countless blessings to your home. Let the lights of Diwali illuminate your path to happiness and success!',
    colors: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F'
    },
    images: [
      '/images/diwali/diwali1.jpeg',
      '/images/diwali/diwali2.jpeg',
      '/images/diwali/diwali3.jpg',
      '/images/diwali/diwali4.jpg',
      '/images/diwali/diwali5.jpg',
      '/images/diwali/diwal6.jpg'
    ]
  },
  {
    id: 'christmas',
    name: 'Christmas',
    emoji: '🎄',
    description: 'Season of Joy',
    defaultMessage: 'Wishing you and your loved ones a Christmas filled with joy, peace, and wonderful memories. May the magic of Christmas bring you happiness throughout the year!',
    colors: {
      primary: '#C41E3A',
      secondary: '#228B22',
      accent: '#FFD700'
    },
    images: [
      '/images/christmas/christmas1.jpg',
      '/images/christmas/christmas2.jpg',
      '/images/christmas/christmas3.jpeg',
      '/images/christmas/christmas4.jpg',
      '/images/christmas/christmas5.jpeg',
      '/images/christmas/christmas6.jpg'
    ]
  },
  {
    id: 'holi',
    name: 'Holi',
    emoji: '🎨',
    description: 'Festival of Colors',
    defaultMessage: 'Let the colors of Holi spread happiness, love, and joy in your life. May this festival of colors paint your life with bright and beautiful moments!',
    colors: {
      primary: '#FF1493',
      secondary: '#00CED1',
      accent: '#FFD700'
    },
    images: [
      '/images/holi/holi1.jpg',
      '/images/holi/holi2.jpg',
      '/images/holi/holi3.jpg',
      '/images/holi/holi4.jpg',
      '/images/holi/holi5.jpg',
      '/images/holi/holi6.jpg'
    ]
  },
  {
    id: 'eid',
    name: 'Eid',
    emoji: '🌙',
    description: 'Festival of Celebration',
    defaultMessage: 'Eid Mubarak! May this blessed occasion bring peace, happiness, and prosperity to you and your family. Wishing you joy and countless blessings!',
    colors: {
      primary: '#2E8B57',
      secondary: '#DAA520',
      accent: '#F0F8FF'
    },
    images: [
      '/images/eid/eid1.jpg',
      '/images/eid/eid2.jpg',
      '/images/eid/eid3.jpg',
      '/images/eid/eid4.jpg',
      '/images/eid/eid5.jpg',
      '/images/eid/eid6.jpg'
    ]
  },
  {
    id: 'ganeshchaturthi',
    name: 'Ganesh Chaturthi',
    emoji: '🐘',
    description: 'Celebration of Lord Ganesha',
    defaultMessage: 'Ganpati Bappa Morya! May Lord Ganesha remove all obstacles from your path and bless you with wisdom, prosperity, and happiness!',
    colors: {
      primary: '#FF4500',
      secondary: '#FFD700',
      accent: '#FFA500'
    },
    images: [
      '/images/ganeshchaturthi/ganeshchaturthi1.jpg',
      '/images/ganeshchaturthi/ganeshchaturthi2.jpg',
      '/images/ganeshchaturthi/ganeshchaturthi3.jpg',
      '/images/ganeshchaturthi/ganeshchaturthi4.jpg',
      '/images/ganeshchaturthi/ganeshchaturthi5.jpg',
      '/images/ganeshchaturthi/ganeshchaturthi6.jpg'
    ]
  },
  {
    id: 'dussehra',
    name: 'Dussehra',
    emoji: '🏹',
    description: 'Victory of Good over Evil',
    defaultMessage: 'May this Dussehra mark the victory of good over evil in your life. Wishing you strength, courage, and success in all your endeavors!',
    colors: {
      primary: '#DC143C',
      secondary: '#FFD700',
      accent: '#FF8C00'
    },
    images: [
      '/images/dussehra/dussehra1.jpg',
      '/images/dussehra/dussehra2.jpg',
      '/images/dussehra/dussehra3.jpg',
      '/images/dussehra/dussehra4.jpg',
      '/images/dussehra/dussehra5.jpg',
      '/images/dussehra/dussehra6.jpg'
    ]
  },
  {
    id: 'newyear',
    name: 'New Year',
    emoji: '🎆',
    description: 'Fresh Beginnings',
    defaultMessage: 'Happy New Year! May this year bring you new opportunities, wonderful experiences, and endless happiness. Here\'s to a bright and prosperous year ahead!',
    colors: {
      primary: '#4B0082',
      secondary: '#FFD700',
      accent: '#FF69B4'
    },
    images: [
      '/images/newyear/newyear1.jpg',
      '/images/newyear/newyear2.jpg',
      '/images/newyear/newyear3.jpg',
      '/images/newyear/newyear4.jpg'
    ]
  },
  {
    id: 'chinesenewyear',
    name: 'Chinese New Year',
    emoji: '🧧',
    description: 'Lunar New Year Celebration',
    defaultMessage: 'Kung Hei Fat Choy! Wishing you prosperity, good health, and abundant happiness in the new lunar year. May all your dreams come true!',
    colors: {
      primary: '#DC143C',
      secondary: '#FFD700',
      accent: '#FF6347'
    },
    images: [
      '/images/chinesenewyear/chinesenewyear1.jpg',
      '/images/chinesenewyear/chinesenewyear2.jpg',
      '/images/chinesenewyear/chinesenewyear3.jpg',
      '/images/chinesenewyear/chinesenewyear4.jpg',
      '/images/chinesenewyear/chinesenewyear5.jpg',
      '/images/chinesenewyear/chinesenewyear6.jpg'
    ]
  },
  {
    id: 'easter',
    name: 'Easter',
    emoji: '🐰',
    description: 'Celebration of Renewal',
    defaultMessage: 'Happy Easter! May this beautiful spring festival bring you hope, joy, and renewal. Wishing you and your family a blessed Easter celebration!',
    colors: {
      primary: '#FF1493',
      secondary: '#32CD32',
      accent: '#FFD700'
    },
    images: [
      '/images/easter/easter1.jpg',
      '/images/easter/easter2.jpg',
      '/images/easter/easter3.jpeg',
      '/images/easter/easter4.jpg',
      '/images/easter/easter5.jpg',
      '/images/easter/easter6.jpg'
    ]
  }
];

export const getRandomImage = (festivalId: string): string => {
  const festival = festivals.find(f => f.id === festivalId);
  if (!festival || !festival.images.length) return '';
  
  const randomIndex = Math.floor(Math.random() * festival.images.length);
  return festival.images[randomIndex];
};

export const getFestivalById = (id: string): Festival | undefined => {
  return festivals.find(f => f.id === id);
};

export const getAllFestivals = (): Festival[] => {
  return festivals;
};