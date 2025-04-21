import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKitchen } from '../context/KitchenContext';
import { Kitchen, TimeSlot, BookingPurpose } from '../types';
import Calendar from '../components/booking/Calendar';
import TimeSlotSelector from '../components/booking/TimeSlotSelector';
import BookingForm from '../components/booking/BookingForm';
import { CheckCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { kitchens, addBooking } = useKitchen();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [bookingPurpose, setBookingPurpose] = useState<BookingPurpose | ''>('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleKitchenSelection = (kitchen: Kitchen) => {
    setSelectedKitchen(kitchen);
    setCurrentStep(2);
  };

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlots([]);
    setCurrentStep(3);
  };

  const handleTimeSlotSelection = (selected: TimeSlot[]) => {
    setSelectedTimeSlots(selected);
    if (selected.length > 0) {
      setCurrentStep(4);
    } else {
      setCurrentStep(3);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedKitchen || selectedTimeSlots.length === 0 || !bookingPurpose) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      const newBooking = {
        id: uuidv4(),
        kitchenId: selectedKitchen.id,
        userId: 'user123', // This would come from auth in a real app
        timeSlots: selectedTimeSlots,
        date: selectedDate,
        purpose: bookingPurpose as BookingPurpose,
        notes: additionalNotes,
        status: 'pending',
        createdAt: new Date()
      };

      addBooking(newBooking);
      setIsSubmitting(false);
      setIsComplete(true);

      // After showing success state, redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book a Kitchen</h1>
          <p className="text-lg text-gray-600 mb-8">
            Follow the steps below to reserve your kitchen time
          </p>

          {/* Booking Steps */}
          <div className="mb-8">
            <BookingSteps currentStep={currentStep} />
          </div>

          {isComplete ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Complete!</h2>
              <p className="text-lg text-gray-600 mb-4">
                Your kitchen booking has been received and is pending approval. 
                You'll receive a confirmation email shortly.
              </p>
              <p className="text-gray-500">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {currentStep === 1 && (
                <KitchenSelection 
                  kitchens={kitchens} 
                  onSelect={handleKitchenSelection} 
                />
              )}
              
              {currentStep === 2 && (
                <DateSelection 
                  selectedDate={selectedDate} 
                  onSelect={handleDateSelection} 
                  onBack={() => setCurrentStep(1)}
                />
              )}
              
              {currentStep === 3 && (
                <TimeSelection 
                  selectedDate={selectedDate}
                  selectedSlots={selectedTimeSlots}
                  onSelect={handleTimeSlotSelection}
                  onBack={() => setCurrentStep(2)}
                />
              )}
              
              {currentStep === 4 && (
                <BookingFormSection
                  bookingPurpose={bookingPurpose}
                  setBookingPurpose={setBookingPurpose}
                  additionalNotes={additionalNotes}
                  setAdditionalNotes={setAdditionalNotes}
                  selectedKitchen={selectedKitchen}
                  selectedDate={selectedDate}
                  selectedTimeSlots={selectedTimeSlots}
                  isSubmitting={isSubmitting}
                  onSubmit={handleFormSubmit}
                  onBack={() => setCurrentStep(3)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingSteps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Select Kitchen' },
    { number: 2, label: 'Choose Date' },
    { number: 3, label: 'Select Time' },
    { number: 4, label: 'Confirm Details' },
  ];

  return (
    <div className="flex justify-between">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col items-center">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step.number === currentStep 
                ? 'bg-emerald-500 text-white'
                : step.number < currentStep
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step.number}
          </div>
          <span className="text-sm text-gray-600">{step.label}</span>
        </div>
      ))}
    </div>
  );
};

interface KitchenSelectionProps {
  kitchens: Kitchen[];
  onSelect: (kitchen: Kitchen) => void;
}

const KitchenSelection: React.FC<KitchenSelectionProps> = ({ kitchens, onSelect }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select a Kitchen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kitchens.map(kitchen => (
          <div 
            key={kitchen.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-emerald-500 transition-all duration-300"
            onClick={() => onSelect(kitchen)}
          >
            <img 
              src={kitchen.images[0]} 
              alt={kitchen.name} 
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="font-semibold text-lg">{kitchen.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{kitchen.location}</p>
            <p className="text-emerald-600 font-medium">${kitchen.pricePerHour}/hour</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface DateSelectionProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  onBack: () => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ selectedDate, onSelect, onBack }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
      <Calendar selectedDate={selectedDate} onSelectDate={onSelect} />
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button 
          onClick={() => onSelect(selectedDate)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

interface TimeSelectionProps {
  selectedDate: Date;
  selectedSlots: TimeSlot[];
  onSelect: (slots: TimeSlot[]) => void;
  onBack: () => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({ 
  selectedDate, 
  selectedSlots,
  onSelect,
  onBack 
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Select Time Slots</h2>
      <p className="text-gray-600 mb-4">
        {selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
      
      <TimeSlotSelector 
        date={selectedDate}
        selectedSlots={selectedSlots}
        onChange={onSelect}
      />
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button 
          onClick={() => onSelect(selectedSlots)}
          disabled={selectedSlots.length === 0}
          className={`px-4 py-2 rounded-md ${
            selectedSlots.length > 0
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

interface BookingFormSectionProps {
  bookingPurpose: BookingPurpose | '';
  setBookingPurpose: React.Dispatch<React.SetStateAction<BookingPurpose | ''>>;
  additionalNotes: string;
  setAdditionalNotes: React.Dispatch<React.SetStateAction<string>>;
  selectedKitchen: Kitchen | null;
  selectedDate: Date;
  selectedTimeSlots: TimeSlot[];
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const BookingFormSection: React.FC<BookingFormSectionProps> = ({
  bookingPurpose,
  setBookingPurpose,
  additionalNotes,
  setAdditionalNotes,
  selectedKitchen,
  selectedDate,
  selectedTimeSlots,
  isSubmitting,
  onSubmit,
  onBack
}) => {
  // Calculate total price
  const totalHours = selectedTimeSlots.length;
  const hourlyRate = selectedKitchen?.pricePerHour || 0;
  const totalPrice = totalHours * hourlyRate;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Confirm Booking Details</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-medium mb-2">Booking Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Kitchen:</p>
            <p className="font-medium">{selectedKitchen?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Date:</p>
            <p className="font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Time:</p>
            <p className="font-medium">
              {selectedTimeSlots.length > 0 && (
                <>
                  {new Date(selectedTimeSlots[0].startTime).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit'
                  })} - 
                  {new Date(selectedTimeSlots[selectedTimeSlots.length - 1].endTime).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit'
                  })}
                </>
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Duration:</p>
            <p className="font-medium">{totalHours} hour{totalHours !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <BookingForm 
        bookingPurpose={bookingPurpose}
        setBookingPurpose={setBookingPurpose}
        additionalNotes={additionalNotes}
        setAdditionalNotes={setAdditionalNotes}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onBack={onBack}
      />
    </div>
  );
};

export default BookingPage;