export interface PackageItem {
  id: string;
  title: string;
  category: 'Explorer' | 'Culture' | 'Classic' | 'Nature' | 'Romance' | 'Group';
  duration: string;
  priceInr: string;
  destinations: string[];
  tag: string;
  image: string;
  highlights: string[];
  isVegetarianGuaranteed: boolean;
}

export const POPULAR_PACKAGES: PackageItem[] = [
  {
    id: 'golden-route',
    title: 'The Grand Golden Route',
    category: 'Classic',
    duration: '8 Days / 7 Nights',
    priceInr: '₹1,85,000',
    destinations: ['Tokyo', 'Mt. Fuji & Hakone', 'Kyoto', 'Osaka'],
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Bullet Train (Shinkansen) Experience',
      'Hakone Ropeway & Lake Ashi Cruise',
      'Fushimi Inari 10,000 Torii Shrine',
      'Pre-booked Indian / Jain Dinners Every Evening'
    ],
    isVegetarianGuaranteed: true,
  },
  {
    id: 'tokyo-explorer',
    title: 'Tokyo Neon & Modern Wonders',
    category: 'Explorer',
    duration: '5 Days / 4 Nights',
    priceInr: '₹1,25,000',
    destinations: ['Shibuya', 'Shinjuku', 'Asakusa', 'Akihabara', 'Ginza'],
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'teamLab Planets Immersive Digital Art',
      'Senso-ji Ancient Temple & Kimono Walk',
      'Shibuya Sky 360° Rooftop Observatory',
      'Dedicated Hindi & English Speaking Coordinator'
    ],
    isVegetarianGuaranteed: true,
  },
  {
    id: 'kyoto-osaka-culture',
    title: 'Kyoto & Osaka Heritage Immersion',
    category: 'Culture',
    duration: '6 Days / 5 Nights',
    priceInr: '₹1,48,000',
    destinations: ['Kyoto', 'Nara Deer Park', 'Osaka Castle', 'Dotonbori'],
    tag: 'Cultural Highlight',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Arashiyama Bamboo Forest & Sagano Train',
      'Feed Friendly Free-Roaming Nara Sika Deers',
      'Traditional Green Tea Ceremony in Gion',
      'Indian Chef-Curated Meals in Dotonbori'
    ],
    isVegetarianGuaranteed: true,
  },
  {
    id: 'mt-fuji-nature',
    title: 'Mt. Fuji & Five Lakes Nature Retreat',
    category: 'Nature',
    duration: '4 Days / 3 Nights',
    priceInr: '₹98,000',
    destinations: ['Lake Kawaguchiko', 'Chureito Pagoda', 'Oshino Hakkai', 'Onsen Spa'],
    tag: 'Scenic Escape',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Chureito Pagoda Icon View with Sakura / Autumn foliage',
      'Private Ryokan with Healing Hot Spring Onsen',
      'Oshino Hakkai Crystal Spring Ponds from Fuji snowmelt',
      'Private Chauffeur & Luggage Concierge'
    ],
    isVegetarianGuaranteed: true,
  },
  {
    id: 'japan-honeymoon',
    title: 'Romantic Blossom Japan Honeymoon',
    category: 'Romance',
    duration: '9 Days / 8 Nights',
    priceInr: '₹2,65,000',
    destinations: ['Tokyo', 'Hakone Ryokan', 'Kyoto', 'Nara', 'Osaka'],
    tag: 'Luxury Honeymoon',
    image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Private Onsen Ryokan Suite with Mt. Fuji View',
      'Romantic Sunset Helicopter Flight over Tokyo Bay',
      'Exclusive Couple Photoshoot in Traditional Kimonos',
      'Michelin Vegetarian & Candlelight Dining Experience'
    ],
    isVegetarianGuaranteed: true,
  },
  {
    id: 'cherry-blossom-special',
    title: 'Sakura Cherry Blossom Exclusive',
    category: 'Group',
    duration: '7 Days / 6 Nights',
    priceInr: '₹1,75,000',
    destinations: ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'],
    tag: 'Seasonal Special',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop',
    highlights: [
      'Prime Hanami Cherry Blossom Viewing Spots',
      'Shinjuku Gyoen & Ueno Park Sakura Stroll',
      'Sumida River Cherry Blossom Cruise',
      '100% Indian & Jain Pure Veg Kitchen Tie-ups'
    ],
    isVegetarianGuaranteed: true,
  }
];

export const SAMPLE_ITINERARY = [
  {
    day: 'Day 1',
    title: 'Arrival in Tokyo — Land of the Rising Sun',
    details: 'Airport meet & greet at Haneda/Narita by our Hindi/English-speaking tour concierge. Private luxury coach transfer to your downtown hotel. Evening walking tour of Shinjuku neon district followed by welcome Indian dinner.',
    meals: 'Dinner (Pure Veg / Jain Available)'
  },
  {
    day: 'Day 2',
    title: 'Modern Tokyo — Shibuya Sky & Digital Art Realm',
    details: 'Ascend Shibuya Sky for a 360-degree panoramic view of the world’s busiest scramble crossing. Visit Meiji Jingu Shrine and dive into teamLab Planets multi-sensory interactive digital art museum.',
    meals: 'Breakfast & Indian Dinner'
  },
  {
    day: 'Day 3',
    title: 'Mount Fuji, Lake Ashi & Hakone Alpine Cruise',
    details: 'Scenic drive to Mount Fuji 5th Station. Enjoy the Hakone Ropeway cable car soaring over volcanic sulfur valleys, followed by a pirate ship cruise on Lake Ashi with views of Fuji towering over torii gates.',
    meals: 'Breakfast & Indian Lunch/Dinner'
  },
  {
    day: 'Day 4',
    title: 'Bullet Train Shinkansen to Cultural Kyoto',
    details: 'Board Japan’s lightning-fast 320 km/h Shinkansen bullet train to Kyoto. Visit Kinkaku-ji (The Golden Pavilion) and wander through the magical Arashiyama Bamboo Grove. Evening Gion geisha district walk.',
    meals: 'Breakfast & Special Kyoto Indian Dinner'
  },
  {
    day: 'Day 5',
    title: '10,000 Torii Gates & Nara Sika Deer Park',
    details: 'Walk through thousands of vermilion torii gates at Fushimi Inari Taisha. Continue to historic Nara to meet and hand-feed holy bow-legged deer in the park and marvel at Todai-ji Temple’s Giant Buddha.',
    meals: 'Breakfast & Indian Dinner'
  },
  {
    day: 'Day 6',
    title: 'Osaka Heritage, Castle & Vibrant Dotonbori',
    details: 'Transfer to Osaka. Tour the grand 16th-century Osaka Castle surrounded by moats and cherry orchards. Evening exploration of vibrant Dotonbori canal, Glico Man billboard, and tax-free luxury shopping in Shinsaibashi.',
    meals: 'Breakfast & Farewell Celebration Dinner'
  },
  {
    day: 'Day 7',
    title: 'Souvenir Shopping & Flight Back to India',
    details: 'Leisurely morning for last-minute matcha sweets, electronics, and Japanese handicraft shopping. Private assisted transfer to Kansai / Narita International Airport with luggage assistance for your return flight to India.',
    meals: 'Breakfast'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh & Sunita Mehra',
    city: 'Mumbai',
    tour: '8 Days Golden Route',
    rating: 5,
    review: 'Being strict Jains, we were genuinely terrified about food in Japan. AllWayRound arranged freshly prepared Jain meals with zero onion and garlic at every single city! The Hindi-speaking guide Amit made our parents feel right at home.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    date: 'Travelled April 2026'
  },
  {
    name: 'Vikram & Ananya Sharma',
    city: 'New Delhi',
    tour: '9 Days Japan Honeymoon',
    rating: 5,
    review: 'Our honeymoon was nothing short of a fairy tale. The private ryokan suite facing Mt. Fuji and the bullet train passes were seamlessly organized. The e-visa assistance took just 4 working days without any Embassy stress.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    date: 'Travelled May 2026'
  },
  {
    name: 'Dr. Ramesh Patel & Family',
    city: 'Ahmedabad',
    tour: '7 Days Sakura Blossom Tour',
    rating: 5,
    review: 'We were a group of 8 including senior citizens. The wheelchair accessibility, private Mercedes Sprinter, and polite Japanese-Indian coordination made this the best international vacation we have ever experienced.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    date: 'Travelled March 2026'
  }
];

export const GALLERY_IMAGES = [
  {
    title: 'Mount Fuji & Chureito Pagoda',
    caption: 'Iconic panoramic vista overlooking Fujiyoshida',
    url: 'https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Senso-ji Temple, Asakusa',
    caption: 'Tokyo’s oldest and most sacred Buddhist sanctuary',
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Arashiyama Bamboo Forest',
    caption: 'Soaring emerald groves whispering in the Kyoto breeze',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Gion Traditional Teahouses',
    caption: 'Preserved geisha heritage alleys in old Kyoto',
    url: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Tokyo Tower & Neon Skyline',
    caption: 'Vibrant futuristic nightlife pulsing through Roppongi',
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Sakura Blossoms at Imperial Castle',
    caption: 'Spring cherry blossoms draping ancient stone moats',
    url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=800&auto=format&fit=crop'
  }
];

export const FAQS = [
  {
    q: 'Do Indian passport holders need a visa for Japan, and how do you help?',
    a: 'Yes, Indian citizens need a tourist visa. AllWayRound provides end-to-end Japan tourist visa (both eVisa and physical sticker) support. We supply the official Japan Ministry of Foreign Affairs (MOFA) verified itinerary, hotel vouchers, cover letters, and verify your financial documents. Our visa success rate for Indian travelers is 99.4%.'
  },
  {
    q: 'Can we get pure vegetarian and Jain food in Japan?',
    a: 'Absolutely! We specialize exclusively in Indian travelers. Every AllWayRound package includes pre-vetted Indian restaurants and certified Japanese vegetarian kitchens serving pure vegetarian meals without eggs, meat, fish dashi, or animal gelatin. For Jain travelers, we arrange 100% onion-and-garlic-free meals prepared on separate utensils.'
  },
  {
    q: 'When is the best time for Indians to visit Japan?',
    a: 'Spring (Late March – Early May) is ideal for cherry blossoms and pleasant 15–22°C temperatures, aligning with Indian school vacations. Autumn (October – November) brings fiery red maple foliage and crisp golden weather. Winter (December – February) offers snow at Mt. Fuji and world-class skiing in Hokkaido.'
  },
  {
    q: 'Will there be a Hindi-speaking tour guide or coordinator?',
    a: 'Yes! All our group departures feature full-time bilingual guides fluent in Hindi and English alongside native Japanese. For private custom tours, you receive a dedicated 24/7 WhatsApp concierge in India and Tokyo for real-time translation, metro assistance, and recommendations.'
  },
  {
    q: 'What is included in the package price?',
    a: 'Our comprehensive packages include 4★/5★ centrally located hotel accommodations, all intercity Bullet Train (Shinkansen) tickets or private luxury coaches, airport meet & greet transfers, sightseeing entrance tickets, daily breakfast and curated Indian/Jain dinners, and complete Japan visa documentation.'
  },
  {
    q: 'How do international payments, currency, and SIM cards work in Japan?',
    a: 'We provide every traveler with a pre-activated Japanese high-speed Unlimited Data eSIM before you board your flight in India. Major Indian credit/forex cards (Niyo, HDFC, ICICI, Amex) work smoothly at 7-Eleven ATMs across Japan for dispensing Japanese Yen (JPY).'
  }
];
