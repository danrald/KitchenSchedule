import { Kitchen, TimeSlot } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const kitchens: Kitchen[] = [
  {
    id: '1',
    name: 'Urban Chef Kitchen',
    location: 'Downtown, New York',
    type: 'Commercial',
    capacity: 8,
    pricePerHour: 75,
    minHours: 2,
    rating: 4.8,
    cleanlinessRating: 5,
    reviews: 42,
    amenities: [
      'Commercial Oven', 
      'Stand Mixer', 
      'Walk-in Refrigerator', 
      'Gas Range', 
      'Dishwasher', 
      'Prep Tables', 
      'Storage Space',
      'Wifi',
      'Utensils & Cookware'
    ],
    images: [
      'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      'https://images.pexels.com/photos/3926135/pexels-photo-3926135.jpeg',
      'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg',
      'https://images.pexels.com/photos/6958527/pexels-photo-6958527.jpeg'
    ]
  },
  {
    id: '2',
    name: 'Bakery Studio',
    location: 'Brooklyn, New York',
    type: 'Bakery',
    capacity: 4,
    pricePerHour: 60,
    minHours: 3,
    rating: 4.6,
    cleanlinessRating: 4.8,
    reviews: 27,
    amenities: [
      'Convection Oven', 
      'Proofing Cabinet', 
      'Stand Mixer', 
      'Cooling Racks', 
      'Sheeter', 
      'Refrigerator',
      'Baking Tools',
      'Dishwasher'
    ],
    images: [
      'https://images.pexels.com/photos/3218467/pexels-photo-3218467.jpeg',
      'https://images.pexels.com/photos/2180875/pexels-photo-2180875.jpeg',
      'https://images.pexels.com/photos/5435029/pexels-photo-5435029.jpeg',
      'https://images.pexels.com/photos/6291267/pexels-photo-6291267.jpeg',
      'https://images.pexels.com/photos/4873669/pexels-photo-4873669.jpeg'
    ]
  },
  {
    id: '3',
    name: 'Culinary Workspace',
    location: 'Queens, New York',
    type: 'Shared',
    capacity: 12,
    pricePerHour: 85,
    minHours: 2,
    rating: 4.5,
    cleanlinessRating: 4.6,
    reviews: 35,
    amenities: [
      'Multiple Cooking Stations', 
      'Commercial Ovens', 
      'Deep Fryers', 
      'Prep Area', 
      'Blast Chiller', 
      'Storage Space',
      'Dish Sanitizer',
      'Loading Dock',
      'Dry Storage'
    ],
    images: [
      'https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg',
      'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg',
      'https://images.pexels.com/photos/6210967/pexels-photo-6210967.jpeg',
      'https://images.pexels.com/photos/6306421/pexels-photo-6306421.jpeg',
      'https://images.pexels.com/photos/6210966/pexels-photo-6210966.jpeg'
    ]
  },
  {
    id: '4',
    name: 'Gourmet Test Kitchen',
    location: 'Manhattan, New York',
    type: 'Restaurant',
    capacity: 6,
    pricePerHour: 95,
    minHours: 4,
    rating: 4.9,
    cleanlinessRating: 5,
    reviews: 18,
    amenities: [
      'Professional Range', 
      'Sous Vide Equipment', 
      'Salamander', 
      'Wine Refrigerator', 
      'Specialty Cookware', 
      'Plating Area',
      'Camera Setup',
      'Lighting Equipment'
    ],
    images: [
      'https://images.pexels.com/photos/2454533/pexels-photo-2454533.jpeg',
      'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg',
      'https://images.pexels.com/photos/3992132/pexels-photo-3992132.jpeg',
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
      'https://images.pexels.com/photos/3434523/pexels-photo-3434523.jpeg'
    ]
  }
];

// Generate time slots for the next 7 days
export const availableTimeSlots: TimeSlot[] = generateTimeSlots();

function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + day);
    
    // Create slots from 8AM to 10PM
    for (let hour = 8; hour < 22; hour++) {
      const startTime = new Date(currentDate);
      startTime.setHours(hour, 0, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(hour + 1, 0, 0, 0);
      
      // Randomly mark some slots as unavailable
      const isAvailable = Math.random() > 0.3;
      
      slots.push({
        id: uuidv4(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        isAvailable
      });
    }
  }
  
  return slots;
}