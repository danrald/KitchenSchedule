import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Kitchen, Booking, TimeSlot } from '../types';
import { kitchens, availableTimeSlots } from '../data/mockData';

interface KitchenContextType {
  kitchens: Kitchen[];
  selectedKitchen: Kitchen | null;
  bookings: Booking[];
  availableTimeSlots: TimeSlot[];
  selectKitchen: (id: string) => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
  getAvailableSlots: (date: Date) => TimeSlot[];
}

const KitchenContext = createContext<KitchenContextType | undefined>(undefined);

export const KitchenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const selectKitchen = (id: string) => {
    const kitchen = kitchens.find(k => k.id === id) || null;
    setSelectedKitchen(kitchen);
  };

  const addBooking = (booking: Booking) => {
    setBookings([...bookings, booking]);
  };

  const cancelBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  const getAvailableSlots = (date: Date): TimeSlot[] => {
    // Filter available time slots for the specified date
    // In a real app, this would check against existing bookings
    const dateString = date.toISOString().split('T')[0];
    return availableTimeSlots.filter(slot => {
      const slotDate = new Date(slot.startTime);
      return slotDate.toISOString().split('T')[0] === dateString;
    });
  };

  const value = {
    kitchens,
    selectedKitchen,
    bookings,
    availableTimeSlots,
    selectKitchen,
    addBooking,
    cancelBooking,
    getAvailableSlots,
  };

  return (
    <KitchenContext.Provider value={value}>
      {children}
    </KitchenContext.Provider>
  );
};

export const useKitchen = () => {
  const context = useContext(KitchenContext);
  if (context === undefined) {
    throw new Error('useKitchen must be used within a KitchenProvider');
  }
  return context;
};