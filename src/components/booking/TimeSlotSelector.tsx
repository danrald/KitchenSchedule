import React from 'react';
import { useKitchen } from '../../context/KitchenContext';
import { TimeSlot } from '../../types';
import { Clock } from 'lucide-react';

interface TimeSlotSelectorProps {
  date: Date;
  selectedSlots: TimeSlot[];
  onChange: (slots: TimeSlot[]) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ date, selectedSlots, onChange }) => {
  const { getAvailableSlots } = useKitchen();
  const availableSlots = getAvailableSlots(date);

  const isSlotSelected = (slot: TimeSlot) => {
    return selectedSlots.some(s => s.id === slot.id);
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (isSlotSelected(slot)) {
      onChange(selectedSlots.filter(s => s.id !== slot.id));
    } else {
      // If adding a new slot, ensure they're contiguous
      // First, create a list including the new slot
      const newSelection = [...selectedSlots, slot].sort((a, b) => 
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
      
      // Check if slots are contiguous
      let isContiguous = true;
      for (let i = 0; i < newSelection.length - 1; i++) {
        if (newSelection[i].endTime !== newSelection[i + 1].startTime) {
          isContiguous = false;
          break;
        }
      }
      
      if (isContiguous) {
        onChange(newSelection);
      } else {
        // If not contiguous, start a new selection with just this slot
        onChange([slot]);
      }
    }
  };

  // Group available slots by morning, afternoon, evening
  const morningSlots = availableSlots.filter(slot => {
    const hour = new Date(slot.startTime).getHours();
    return hour >= 6 && hour < 12;
  });
  
  const afternoonSlots = availableSlots.filter(slot => {
    const hour = new Date(slot.startTime).getHours();
    return hour >= 12 && hour < 17;
  });
  
  const eveningSlots = availableSlots.filter(slot => {
    const hour = new Date(slot.startTime).getHours();
    return hour >= 17 && hour < 24;
  });

  const renderTimeSlots = (slots: TimeSlot[], title: string) => (
    <div className="mb-6">
      <h3 className="font-medium text-gray-700 mb-3 flex items-center">
        <Clock size={16} className="mr-2" />
        {title}
      </h3>
      
      {slots.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No available time slots</p>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {slots.map(slot => (
            <button
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              className={`py-2 px-3 rounded text-center text-sm transition-all duration-200 ${
                isSlotSelected(slot)
                  ? 'bg-emerald-500 text-white'
                  : slot.isAvailable
                    ? 'bg-white border border-gray-200 hover:border-emerald-500 text-gray-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!slot.isAvailable}
            >
              {new Date(slot.startTime).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
              })}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {renderTimeSlots(morningSlots, 'Morning')}
      {renderTimeSlots(afternoonSlots, 'Afternoon')}
      {renderTimeSlots(eveningSlots, 'Evening')}
      
      {selectedSlots.length > 0 && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
          <h3 className="font-medium text-emerald-700 mb-2">Selected Time Slots</h3>
          <p className="text-emerald-600">
            {new Date(selectedSlots[0].startTime).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit'
            })} - 
            {new Date(selectedSlots[selectedSlots.length - 1].endTime).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit'
            })}
            <span className="text-gray-500 ml-2">
              ({selectedSlots.length} hour{selectedSlots.length !== 1 ? 's' : ''})
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;