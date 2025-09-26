'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Heart, Star, Sparkles, Gift, Users, Clock, BookOpen, Camera, Share2 } from 'lucide-react';
import { useState } from 'react';

interface FestivalData {
  name: string;
  subtitle: string;
  description: string;
  history: string;
  significance: string;
  traditions: string[];
  dates: string;
  duration: string;
  regions: string[];
  colors: string[];
  symbols: string[];
  foods: string[];
  activities: string[];
  images: string[];
  funFacts: string[];
  greetings: string[];
  modernCelebration: string;
  cardMessage: string;
}

const festivalsData: Record<string, FestivalData> = {
  diwali: {
    name: "Diwali",
    subtitle: "The Festival of Lights",
    description: "Diwali, also known as Deepavali, is one of the most important Hindu festivals celebrated worldwide. It symbolizes the victory of light over darkness, good over evil, and knowledge over ignorance.",
    history: "Diwali has ancient origins dating back over 2,500 years. The festival celebrates the return of Lord Rama to Ayodhya after 14 years of exile, as described in the epic Ramayana. People lit oil lamps (diyas) to welcome him home, which is why Diwali is called the Festival of Lights.",
    significance: "Diwali represents the triumph of good over evil and light over darkness. It's a time for spiritual renewal, forgiveness, and new beginnings. The festival is also associated with Goddess Lakshmi, the deity of wealth and prosperity.",
    traditions: [
      "Lighting diyas and candles throughout homes",
      "Creating beautiful rangoli patterns at entrances",
      "Bursting fireworks and crackers",
      "Exchanging gifts and sweets with family and friends",
      "Performing Lakshmi Puja (prayer to Goddess Lakshmi)",
      "Cleaning and decorating homes",
      "Wearing new clothes and jewelry"
    ],
    dates: "October/November (varies each year based on lunar calendar)",
    duration: "5 days",
    regions: ["India", "Nepal", "Sri Lanka", "Malaysia", "Singapore", "Mauritius", "Fiji", "Trinidad & Tobago"],
    colors: ["Gold", "Orange", "Red", "Yellow", "Pink"],
    symbols: ["Diyas (oil lamps)", "Lotus flowers", "Elephants", "Om symbol", "Swastika", "Rangoli patterns"],
    foods: ["Mithai (sweets)", "Samosas", "Kaju Katli", "Gulab Jamun", "Barfi", "Laddu", "Chakli"],
    activities: ["Shopping for new clothes", "Home decoration", "Family gatherings", "Temple visits", "Charity and giving"],
    images: [
      "/images/diwali/diwali1.jpeg",
      "/images/diwali/diwali2.jpeg",
      "/images/diwali/diwali3.jpg",
      "/images/diwali/diwali4.jpg",
      "/images/diwali/diwali5.jpg"
    ],
    funFacts: [
      "Diwali is celebrated by over 1 billion people worldwide",
      "It's a national holiday in 15+ countries",
      "The festival lasts for 5 days, each with its own significance",
      "NASA astronauts have celebrated Diwali in space",
      "Leicester, UK hosts one of the largest Diwali celebrations outside India"
    ],
    greetings: ["Happy Diwali!", "Shubh Deepavali!", "May your Diwali be filled with light and joy!", "Wishing you prosperity and happiness!"],
    modernCelebration: "Today, Diwali is celebrated globally with LED lights complementing traditional diyas, eco-friendly fireworks, and virtual celebrations connecting families across continents. Many cities worldwide host public Diwali celebrations and light shows.",
    cardMessage: "Create beautiful Diwali cards featuring traditional diyas, rangoli patterns, and golden colors to share the joy and light of this magnificent festival with your loved ones."
  },
  
  christmas: {
    name: "Christmas",
    subtitle: "The Season of Joy and Giving",
    description: "Christmas is the annual Christian festival celebrating the birth of Jesus Christ. It has evolved into a global celebration of love, generosity, family, and the spirit of giving, transcending religious boundaries.",
    history: "Christmas commemorates the birth of Jesus Christ in Bethlehem over 2,000 years ago. The celebration of December 25th was established by the Roman Catholic Church in the 4th century, though the exact birth date is unknown. Many traditions evolved from various cultures over centuries.",
    significance: "Christmas represents hope, peace, love, and the gift of salvation. It emphasizes themes of generosity, forgiveness, family unity, and goodwill toward all. The holiday brings people together regardless of background or beliefs.",
    traditions: [
      "Decorating Christmas trees with ornaments and lights",
      "Hanging stockings by the fireplace",
      "Exchanging gifts on Christmas Eve or morning",
      "Singing Christmas carols",
      "Attending midnight mass or church services",
      "Preparing and sharing festive meals",
      "Creating nativity scenes",
      "Writing letters to Santa Claus"
    ],
    dates: "December 25th (Western Christianity), January 7th (Eastern Orthodox)",
    duration: "12 days (Christmas season from December 25 to January 6)",
    regions: ["Worldwide", "Europe", "Americas", "Oceania", "Parts of Asia and Africa"],
    colors: ["Red", "Green", "Gold", "Silver", "White"],
    symbols: ["Christmas tree", "Star of Bethlehem", "Angels", "Nativity scene", "Santa Claus", "Reindeer", "Bells", "Holly", "Mistletoe"],
    foods: ["Roast turkey/ham", "Christmas pudding", "Mince pies", "Gingerbread", "Eggnog", "Fruit cake", "Candy canes"],
    activities: ["Gift shopping", "Decorating homes", "Baking cookies", "Ice skating", "Watching Christmas movies", "Volunteering"],
    images: [
      "/images/christmas/christmas1.jpg",
      "/images/christmas/christmas2.jpg",
      "/images/christmas/christmas3.jpeg",
      "/images/christmas/christmas4.jpg",
      "/images/christmas/christmas5.jpeg"
    ],
    funFacts: [
      "Christmas is celebrated by over 2 billion people worldwide",
      "The tradition of Christmas trees originated in Germany",
      "Coca-Cola helped popularize the modern image of Santa Claus",
      "Boxing Day (December 26) is also a holiday in many countries",
      "Christmas Island was named for being discovered on Christmas Day 1643"
    ],
    greetings: ["Merry Christmas!", "Happy Holidays!", "Season's Greetings!", "Peace on Earth!", "Joy to the World!"],
    modernCelebration: "Modern Christmas celebrations include elaborate light displays, online gift shopping, virtual family gatherings, streaming Christmas movies, and social media sharing of holiday moments. Many cities host Christmas markets and festivals.",
    cardMessage: "Send warm Christmas wishes with cards featuring festive trees, twinkling lights, and messages of joy, peace, and love to celebrate this magical season with family and friends."
  },

  eid: {
    name: "Eid",
    subtitle: "The Festival of Breaking the Fast",
    description: "Eid al-Fitr is one of the most important Islamic holidays, marking the end of Ramadan, the holy month of fasting. It's a joyous celebration of faith, community, charity, and gratitude.",
    history: "Eid al-Fitr was established by Prophet Muhammad in the first year of Hijra (622 CE). The celebration marks the successful completion of a month-long fast during Ramadan and emphasizes spiritual purification, self-discipline, and empathy for the less fortunate.",
    significance: "Eid represents spiritual achievement, community unity, and charitable giving. It celebrates the completion of Ramadan's spiritual journey and emphasizes gratitude, forgiveness, and helping those in need through Zakat al-Fitr.",
    traditions: [
      "Starting with Ghusl (ritual purification bath)",
      "Wearing new or finest clothes",
      "Attending special Eid prayers at mosque",
      "Giving Zakat al-Fitr (charity) to the poor",
      "Exchanging 'Eid Mubarak' greetings",
      "Sharing festive meals with family and friends",
      "Visiting relatives and neighbors",
      "Giving gifts, especially to children"
    ],
    dates: "Varies based on lunar calendar (usually May-June)",
    duration: "3 days",
    regions: ["Middle East", "Asia", "Africa", "Europe", "Americas", "Worldwide Muslim communities"],
    colors: ["Green", "Gold", "White", "Blue", "Silver"],
    symbols: ["Crescent moon and star", "Arabic calligraphy", "Mosque silhouettes", "Lanterns", "Geometric patterns"],
    foods: ["Dates", "Biryani", "Kebabs", "Baklava", "Ma'moul", "Sheer khurma", "Samosas", "Sweet dishes"],
    activities: ["Community prayers", "Family gatherings", "Charity giving", "Shopping for gifts", "Preparing special foods", "Visiting friends"],
    images: [
      "/images/eid/eid1.jpg",
      "/images/eid/eid2.jpg",
      "/images/eid/eid3.jpg",
      "/images/eid/eid4.jpg",
      "/images/eid/eid5.jpg"
    ],
    funFacts: [
      "Eid is celebrated by over 1.8 billion Muslims worldwide",
      "The exact date varies by country based on moon sighting",
      "It's a national holiday in 50+ countries",
      "Eid prayers are performed in congregation, preferably outdoors",
      "Children traditionally receive money gifts called 'Eidi'"
    ],
    greetings: ["Eid Mubarak!", "Blessed Eid!", "May Allah bless you!", "Eid Sa'id!", "Taqabbal Allah minna wa minkum!"],
    modernCelebration: "Modern Eid celebrations include virtual family connections for those far from home, online charity donations, social media greetings, and community events that welcome people of all backgrounds to learn about Islamic culture.",
    cardMessage: "Share the blessings of Eid with beautiful cards featuring crescents, stars, and elegant Arabic calligraphy, spreading messages of peace, joy, and unity during this blessed celebration."
  },

  holi: {
    name: "Holi",
    subtitle: "The Festival of Colors and Spring",
    description: "Holi is the vibrant Hindu festival celebrating the arrival of spring, the victory of good over evil, and the joy of forgiveness and new beginnings. Known worldwide for its explosion of colors and joyful celebrations.",
    history: "Holi has ancient origins in Hindu mythology, primarily celebrating the legend of Prahlad and Holika, symbolizing the victory of devotion over evil. It also commemorates the divine love of Radha and Krishna, particularly Krishna's playful nature with colors.",
    significance: "Holi represents the triumph of good over evil, the arrival of spring, forgiveness, and new beginnings. It breaks down social barriers as people of all backgrounds come together to celebrate with colors, creating unity and joy.",
    traditions: [
      "Throwing colored powders (gulal) at each other",
      "Spraying colored water with water guns",
      "Lighting bonfires on Holika Dahan (night before)",
      "Dancing to traditional folk music",
      "Singing Holi songs and bhajans",
      "Preparing and sharing traditional sweets",
      "Visiting friends and family homes",
      "Forgiveness and reconciliation"
    ],
    dates: "March (varies based on lunar calendar)",
    duration: "2-3 days",
    regions: ["India", "Nepal", "Bangladesh", "Pakistan", "Mauritius", "Fiji", "Guyana", "Suriname"],
    colors: ["Red", "Yellow", "Green", "Blue", "Pink", "Orange", "Purple"],
    symbols: ["Colored powders", "Water balloons", "Krishna and Radha", "Lotus flowers", "Bonfire", "Musical instruments"],
    foods: ["Gujiya", "Mathri", "Dahi bhalla", "Puran poli", "Thandai", "Malpua", "Bhang lassi"],
    activities: ["Color throwing", "Water fights", "Dancing", "Music", "Feasting", "Community gatherings", "Photography"],
    images: [
      "/images/holi/holi1.jpg",
      "/images/holi/holi2.jpg",
      "/images/holi/holi3.jpg",
      "/images/holi/holi4.jpg",
      "/images/holi/holi5.jpg"
    ],
    funFacts: [
      "Holi colors were traditionally made from natural sources like turmeric and beetroot",
      "The festival is celebrated in over 20 countries worldwide",
      "Netflix India's headquarters celebrated Holi with 50,000 colors",
      "Mathura and Vrindavan host the most famous Holi celebrations",
      "The phrase 'Holi Hai!' means 'It's Holi!' expressing the festival's joyous spirit"
    ],
    greetings: ["Happy Holi!", "Holi Hai!", "May your life be as colorful as Holi!", "Rang Barse!", "Have a colorful Holi!"],
    modernCelebration: "Today's Holi celebrations include eco-friendly organic colors, music festivals, photography contests, and international Holi events in major cities worldwide, spreading the message of unity and joy globally.",
    cardMessage: "Create vibrant Holi cards with splashes of rainbow colors, playful designs, and joyful messages to capture the spirit of this wonderful festival of colors and friendship."
  },

  newyear: {
    name: "New Year",
    subtitle: "Fresh Beginnings and New Hopes",
    description: "New Year celebrates the beginning of a new calendar year, symbolizing fresh starts, new opportunities, and hope for the future. It's one of the most universally celebrated occasions worldwide.",
    history: "The celebration of January 1st as New Year's Day dates back to 46 BCE when Julius Caesar introduced the Julian calendar. Different cultures have celebrated new year at various times, but the Gregorian calendar established January 1st as the global standard.",
    significance: "New Year represents renewal, hope, goal-setting, and reflection on the past while looking forward to future possibilities. It's a time for resolutions, fresh starts, and celebrating human potential for growth and change.",
    traditions: [
      "Making New Year's resolutions",
      "Countdown celebrations at midnight",
      "Fireworks displays and light shows",
      "Kissing at midnight",
      "Watching the Times Square Ball Drop",
      "Toasting with champagne",
      "Singing 'Auld Lang Syne'",
      "New Year's Day parades"
    ],
    dates: "January 1st (Gregorian calendar)",
    duration: "1-3 days (celebrations often start December 31st)",
    regions: ["Worldwide", "Global celebration"],
    colors: ["Gold", "Silver", "Black", "White", "Blue"],
    symbols: ["Clock striking midnight", "Fireworks", "Champagne glasses", "Baby New Year", "Father Time", "Confetti", "Party hats"],
    foods: ["Champagne", "Black-eyed peas", "Grapes", "Fish", "Pork", "Lentils", "Cabbage", "Party snacks"],
    activities: ["Parties", "Fireworks watching", "Resolution making", "Reflection", "Goal setting", "Parades", "Concert attending"],
    images: [
      "/images/newyear/newyear1.jpg",
      "/images/newyear/newyear2.jpg",
      "/images/newyear/newyear3.jpg",
      "/images/newyear/newyear4.jpg"
    ],
    funFacts: [
      "Times Square Ball Drop has been a tradition since 1907",
      "Sydney, Australia often has the first major New Year celebration each year",
      "The song 'Auld Lang Syne' is sung in multiple languages worldwide",
      "Resolution success rates are typically around 8%",
      "Fireworks displays can be seen from space on New Year's Eve"
    ],
    greetings: ["Happy New Year!", "Cheers to a new year!", "New Year, New Possibilities!", "Here's to fresh starts!", "May this year bring you joy!"],
    modernCelebration: "Modern New Year celebrations include virtual parties, livestreamed events, social media countdowns, digital resolutions tracking, and eco-friendly celebrations with biodegradable confetti and sustainable practices.",
    cardMessage: "Welcome the new year with elegant cards featuring gold accents, clocks, fireworks, and inspiring messages of hope, dreams, and exciting possibilities for the year ahead."
  },

  easter: {
    name: "Easter",
    subtitle: "The Season of Renewal and Rebirth",
    description: "Easter is the most important Christian holiday, celebrating the resurrection of Jesus Christ. It represents hope, renewal, forgiveness, and new life, coinciding with the arrival of spring.",
    history: "Easter commemorates the resurrection of Jesus Christ three days after his crucifixion, as described in the New Testament. The celebration dates back to the early Christian church, with traditions evolving over nearly 2,000 years.",
    significance: "Easter represents the victory of life over death, hope over despair, and God's love for humanity. It's the cornerstone of Christian faith, symbolizing salvation, redemption, and eternal life through Jesus Christ.",
    traditions: [
      "Attending sunrise or special Easter services",
      "Easter egg hunts and decorating",
      "Giving chocolate eggs and bunny gifts",
      "Preparing special Easter meals",
      "Displaying Easter lilies and spring flowers",
      "Easter parades and bonnet competitions",
      "Family gatherings and celebrations",
      "Spring cleaning and home decoration"
    ],
    dates: "Varies (first Sunday after first full moon following spring equinox)",
    duration: "1-8 days (Easter week)",
    regions: ["Worldwide", "Europe", "Americas", "Oceania", "Christian communities globally"],
    colors: ["Pastel pink", "Yellow", "Green", "Purple", "White", "Light blue"],
    symbols: ["Easter eggs", "Easter bunny", "Cross", "Lily flowers", "Lamb", "Chicks", "Butterflies"],
    foods: ["Chocolate eggs", "Hot cross buns", "Easter ham", "Deviled eggs", "Carrot cake", "Lamb", "Spring vegetables"],
    activities: ["Egg decorating", "Easter egg hunts", "Church services", "Family dinners", "Spring gardening", "Bonnet making"],
    images: [
      "/images/easter/easter1.jpg",
      "/images/easter/easter2.jpg",
      "/images/easter/easter3.jpeg",
      "/images/easter/easter4.jpg",
      "/images/easter/easter5.jpg"
    ],
    funFacts: [
      "The Easter Bunny tradition originated in Germany",
      "Americans consume over 16 billion jelly beans at Easter",
      "Easter Island was discovered on Easter Sunday in 1722",
      "The White House Easter Egg Roll has been held since 1878",
      "Easter dates can vary by up to 35 days between years"
    ],
    greetings: ["Happy Easter!", "He is Risen!", "Easter Blessings!", "Celebrate new life!", "Joy and hope this Easter!"],
    modernCelebration: "Contemporary Easter includes virtual church services, online egg hunt activities, eco-friendly celebrations with natural egg dyes, and social media sharing of family traditions and spring activities.",
    cardMessage: "Share Easter joy with cards featuring spring flowers, decorated eggs, soft pastels, and messages of hope, renewal, and the beautiful promise of new beginnings."
  },

  chinesenewyear: {
    name: "Chinese New Year",
    subtitle: "The Spring Festival and Lunar New Year",
    description: "Chinese New Year, also known as the Spring Festival, is the most important traditional Chinese holiday, celebrating the beginning of a new year on the traditional Chinese calendar and welcoming spring.",
    history: "Chinese New Year has over 4,000 years of history, originating from the legend of Nian, a mythical beast. The festival marks the transition from winter to spring and has been celebrated for millennia with family reunions, traditional foods, and cultural customs.",
    significance: "The festival represents new beginnings, family unity, prosperity, and the triumph of good over evil. It's a time for honoring ancestors, strengthening family bonds, and welcoming good fortune for the coming year.",
    traditions: [
      "Family reunion dinners on New Year's Eve",
      "Giving red envelopes (hongbao) with money",
      "Lion and dragon dance performances",
      "Setting off fireworks and firecrackers",
      "Cleaning homes before the new year",
      "Decorating with red lanterns and couplets",
      "Visiting temples and making offerings",
      "Wearing red clothes for good luck"
    ],
    dates: "Late January to mid-February (varies based on lunar calendar)",
    duration: "15 days (ending with Lantern Festival)",
    regions: ["China", "Taiwan", "Hong Kong", "Singapore", "Malaysia", "Indonesia", "Philippines", "Chinatowns worldwide"],
    colors: ["Red", "Gold", "Yellow", "Orange"],
    symbols: ["Dragon", "Lion", "Red lanterns", "Plum blossoms", "Bamboo", "Chinese characters", "Zodiac animals"],
    foods: ["Dumplings", "Fish", "Spring rolls", "Noodles", "Rice cakes", "Tangerines", "Traditional sweets"],
    activities: ["Temple visits", "Family gatherings", "Cultural performances", "Shopping", "Gift giving", "Parades", "Fireworks"],
    images: [
      "/images/chinesenewyear/chinesenewyear1.jpg",
      "/images/chinesenewyear/chinesenewyear2.jpg",
      "/images/chinesenewyear/chinesenewyear3.jpg",
      "/images/chinesenewyear/chinesenewyear4.jpg",
      "/images/chinesenewyear/chinesenewyear5.jpg"
    ],
    funFacts: [
      "It's celebrated by over 1.4 billion people worldwide",
      "Each year is represented by one of 12 zodiac animals",
      "Red is the dominant color as it's believed to ward off evil spirits",
      "The celebration creates the world's largest human migration",
      "Fireworks were invented in China and are essential to the celebration"
    ],
    greetings: ["Gong Xi Fa Cai!", "Happy New Year!", "Xin Nian Kuai Le!", "May you prosper!", "Good fortune and happiness!"],
    modernCelebration: "Modern celebrations include digital red envelopes through mobile apps, virtual family reunions, online cultural performances, and global celebrations in major cities with significant Chinese populations.",
    cardMessage: "Celebrate Chinese New Year with cards featuring golden dragons, red lanterns, prosperity symbols, and wishes for good fortune, happiness, and success in the year ahead."
  },

  ganeshchaturthi: {
    name: "Ganesh Chaturthi",
    subtitle: "Celebration of the Elephant God",
    description: "Ganesh Chaturthi is a vibrant Hindu festival celebrating the birth of Lord Ganesha, the remover of obstacles and patron of arts and sciences. It's one of the most beloved festivals in India, especially in Maharashtra.",
    history: "The festival has ancient roots in Hindu tradition, but the modern public celebration was revived by freedom fighter Bal Gangadhar Tilak in 1893 to unite people during British colonial rule. The 10-day celebration culminates with the immersion of Ganesha idols.",
    significance: "Ganesh Chaturthi celebrates Lord Ganesha as the remover of obstacles, patron of arts and commerce, and the lord of beginnings. The festival emphasizes community unity, devotion, and the importance of overcoming challenges with wisdom and determination.",
    traditions: [
      "Installing Ganesha idols in homes and communities",
      "Daily prayers and aarti ceremonies",
      "Offering modak (sweet dumplings) to Ganesha",
      "Singing devotional songs and bhajans",
      "Cultural programs and competitions",
      "Processions with decorated idols",
      "Visarjan (immersion) ceremony on the final day",
      "Community feasting and celebration"
    ],
    dates: "August/September (varies based on lunar calendar)",
    duration: "10 days (some celebrate for 1, 3, 5, or 7 days)",
    regions: ["India (especially Maharashtra)", "Goa", "Karnataka", "Andhra Pradesh", "Tamil Nadu", "Global Hindu communities"],
    colors: ["Orange", "Red", "Yellow", "Green", "Pink"],
    symbols: ["Elephant", "Lotus", "Modak", "Om", "Trishul", "Mouse (Ganesha's vehicle)", "Swastika"],
    foods: ["Modak", "Laddu", "Puran poli", "Kheer", "Coconut barfi", "Fried snacks", "Prasadam"],
    activities: ["Idol worship", "Cultural performances", "Community celebrations", "Art competitions", "Processions", "Charity work"],
    images: [
      "/images/ganeshchaturthi/ganeshchaturthi1.jpg",
      "/images/ganeshchaturthi/ganeshchaturthi2.jpg",
      "/images/ganeshchaturthi/ganeshchaturthi3.jpg",
      "/images/ganeshchaturthi/ganeshchaturthi4.jpg",
      "/images/ganeshchaturthi/ganeshchaturthi5.jpg"
    ],
    funFacts: [
      "Mumbai's Lalbaugcha Raja receives over 1.5 million visitors during the festival",
      "The largest Ganesh idol can be over 70 feet tall",
      "Eco-friendly clay idols are increasingly popular to protect water bodies",
      "The festival generates significant economic activity in Maharashtra",
      "Ganesh Chaturthi is celebrated in countries like USA, UK, Canada with large Indian populations"
    ],
    greetings: ["Ganpati Bappa Morya!", "Happy Ganesh Chaturthi!", "May Ganesha bless you!", "Vighna Harta Ganesha!", "Gauri Ganpati!"],
    modernCelebration: "Modern celebrations include eco-friendly idols, virtual darshan for those unable to attend physically, social media sharing of celebrations, and awareness campaigns for environmental protection during visarjan.",
    cardMessage: "Honor Lord Ganesha with beautiful cards featuring the beloved elephant god, lotus flowers, and blessings for wisdom, prosperity, and the removal of all obstacles from life's journey."
  },

  dussehra: {
    name: "Dussehra",
    subtitle: "Victory of Good Over Evil",
    description: "Dussehra, also known as Vijayadashami, is a major Hindu festival celebrating the victory of good over evil. It commemorates Lord Rama's victory over the demon king Ravana and Goddess Durga's triumph over the buffalo demon Mahishasura.",
    history: "Dussehra has roots in ancient Hindu epics - the Ramayana and the Mahabharata. The festival celebrates two main victories: Lord Rama's defeat of Ravana after rescuing Sita, and Goddess Durga's victory over Mahishasura after a nine-day battle during Navratri.",
    significance: "The festival symbolizes the eternal victory of righteousness over evil, truth over falsehood, and justice over injustice. It teaches that no matter how powerful evil may seem, good will ultimately prevail through courage, devotion, and divine grace.",
    traditions: [
      "Burning effigies of Ravana, Kumbhakarna, and Indrajit",
      "Ram Lila performances depicting the Ramayana",
      "Worship of weapons and tools (Ayudha Puja)",
      "Goddess Durga idol immersion",
      "Exchanging Apta leaves for gold",
      "Starting new ventures and learning",
      "Participating in cultural programs",
      "Feasting and community celebrations"
    ],
    dates: "September/October (10th day after Navratri)",
    duration: "1 day (preceded by 9 days of Navratri)",
    regions: ["India", "Nepal", "Bangladesh", "Hindu communities worldwide"],
    colors: ["Red", "Orange", "Yellow", "Green", "White"],
    symbols: ["Bow and arrow", "Sword", "Lion", "Lotus", "Apta leaves", "Effigies of Ravana"],
    foods: ["Jalebi", "Samosas", "Kachori", "Sweets", "Seasonal fruits", "Traditional meals"],
    activities: ["Effigy burning", "Ram Lila performances", "Weapon worship", "Cultural events", "Fair visits", "Shopping"],
    images: [
      "/images/dussehra/dussehra1.jpg",
      "/images/dussehra/dussehra2.jpg",
      "/images/dussehra/dussehra3.jpg",
      "/images/dussehra/dussehra4.jpg",
      "/images/dussehra/dussehra5.jpg"
    ],
    funFacts: [
      "The tallest Ravana effigy can be over 100 feet high",
      "Delhi's Ram Lila is a UNESCO Intangible Cultural Heritage",
      "Mysore Dasara is famous for its royal processions with decorated elephants",
      "The festival marks the end of Navratri and beginning of the wedding season",
      "Different regions celebrate different aspects - Rama's victory in North, Durga's victory in East"
    ],
    greetings: ["Happy Dussehra!", "Vijayadashami Greetings!", "May good triumph over evil!", "Victory of righteousness!", "Shubh Dussehra!"],
    modernCelebration: "Contemporary Dussehra includes eco-friendly effigies, LED light shows, social media live streaming of Ram Lila performances, and community awareness programs about the festival's moral teachings.",
    cardMessage: "Celebrate the victory of good over evil with Dussehra cards featuring powerful symbols of triumph, colorful celebrations, and inspiring messages of righteousness and divine justice."
  }
};

export default function FestivalPage() {
  const params = useParams();
  const festivalKey = params.festival as string;
  const festival = festivalsData[festivalKey];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!festival) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Festival Not Found</h1>
          <Link href="/" className="text-primary-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${festival.images[selectedImage]}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/60">/</span>
              <span className="text-white">Festivals</span>
              <span className="text-white/60">/</span>
              <span className="text-white font-medium">{festival.name}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              {festival.name}
            </h1>
            <p className="text-2xl sm:text-3xl text-white/90 mb-8 font-light">
              {festival.subtitle}
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-2xl">
              {festival.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/create?festival=${festivalKey}`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#e773b4] to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Gift className="w-5 h-5 mr-2" />
                Create {festival.name} Card
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                <Camera className="w-5 h-5 mr-2" />
                View Templates
              </Link>
            </div>
          </div>
        </div>
        
        {/* Image Selector */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {festival.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedImage === index
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">When</h3>
              <p className="text-gray-600 text-sm">{festival.dates}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Duration</h3>
              <p className="text-gray-600 text-sm">{festival.duration}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Where</h3>
              <p className="text-gray-600 text-sm">{festival.regions.slice(0, 2).join(', ')}</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600 text-sm">Global celebration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* History & Significance */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">History & Significance</h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Historical Background</h3>
                    <p className="text-gray-600 leading-relaxed">{festival.history}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Cultural Significance</h3>
                    <p className="text-gray-600 leading-relaxed">{festival.significance}</p>
                  </div>
                </div>
              </div>

              {/* Traditions */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-red-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Traditions & Customs</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {festival.traditions.map((tradition, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <Star className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{tradition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Fun Facts</h2>
                </div>
                <div className="space-y-4">
                  {festival.funFacts.map((fact, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Celebration */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Share2 className="w-8 h-8 text-green-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Modern Celebrations</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{festival.modernCelebration}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Colors & Symbols */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Festival Colors</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {festival.colors.map((color, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {color}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">Symbols</h3>
                <div className="space-y-2">
                  {festival.symbols.map((symbol, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full" />
                      <span className="text-gray-600 text-sm">{symbol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Foods */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Traditional Foods</h3>
                <div className="space-y-2">
                  {festival.foods.map((food, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-gray-600 text-sm">{food}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Greetings */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Greetings</h3>
                <div className="space-y-3">
                  {festival.greetings.map((greeting, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <p className="text-gray-700 font-medium">{greeting}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Card CTA */}
              <div className="bg-gradient-to-r from-[#e773b4] to-purple-600 rounded-2xl p-6 text-white text-center">
                <Gift className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Ready to Create?</h3>
                <p className="text-white/90 text-sm mb-4">{festival.cardMessage}</p>
                <Link
                  href={`/create?festival=${festivalKey}`}
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Card Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}