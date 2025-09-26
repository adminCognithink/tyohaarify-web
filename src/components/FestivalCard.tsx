import React from 'react';

interface Festival {
  name: string;
  region: string;
  type: string;
  description: string;
  templateCount: number;
}

interface FestivalCardProps {
  festival: Festival;
  onSelect: (festivalName: string) => void;
}

export const FestivalCard: React.FC<FestivalCardProps> = ({ festival, onSelect }) => {
  const getFestivalEmoji = (name: string) => {
    switch (name.toLowerCase()) {
      case 'diwali': return '🪔';
      case 'holi': return '🎨';
      case 'christmas': return '🎄';
      case 'eid al-fitr': return '🌙';
      case 'chinese new year': return '🧧';
      case 'thanksgiving': return '🦃';
      case 'easter': return '🐰';
      default: return '🎉';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'religious': return 'bg-blue-100 text-blue-800';
      case 'cultural': return 'bg-green-100 text-green-800';
      case 'traditional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{getFestivalEmoji(festival.name)}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{festival.name}</h3>
              <p className="text-sm text-gray-500">{festival.region}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(festival.type)}`}>
            {festival.type}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {festival.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">📋</span>
            {festival.templateCount} templates
          </div>
          <button
            onClick={() => onSelect(festival.name)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium"
          >
            Create Greeting
          </button>
        </div>
      </div>
    </div>
  );
};