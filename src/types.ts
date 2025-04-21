export type KitchenType = 'Commercial' | 'Bakery' | 'Catering' | 'Restaurant' | 'Shared';

export interface Kitchen {
  id: string;
  name: string;
  description?: string;
  location: string;
  type: KitchenType;
  capacity: number;
  pricePerHour: number;
  minHours: number;
  rating: number;
  cleanlinessRating: number;
  reviews: number;
  amenities: string[];
  images: string[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export type BookingPurpose = 'Cooking' | 'Baking' | 'Meal Prep' | 'Catering' | 'Food Photography' | 'Recipe Testing' | 'Teaching/Workshop' | 'Other';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  kitchenId: string;
  userId: string; 
  timeSlots: TimeSlot[];
  date: Date;
  purpose: BookingPurpose;
  notes?: string;
  status: BookingStatus;
  createdAt: Date;
}