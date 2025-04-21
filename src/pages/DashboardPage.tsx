import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import { Clock, CalendarCheck, CalendarX, MoreVertical, X, Info } from 'lucide-react';
import { Booking } from '../types';

const DashboardPage: React.FC = () => {
  const { bookings, kitchens, cancelBooking } = useKitchen();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancellationId, setCancellationId] = useState<string | null>(null);

  const now = new Date();
  
  const upcomingBookings = bookings.filter(booking => {
    const lastTimeSlot = booking.timeSlots[booking.timeSlots.length - 1];
    return new Date(lastTimeSlot.endTime) > now;
  });
  
  const pastBookings = bookings.filter(booking => {
    const lastTimeSlot = booking.timeSlots[booking.timeSlots.length - 1];
    return new Date(lastTimeSlot.endTime) <= now;
  });

  const getKitchenById = (id: string) => {
    return kitchens.find(kitchen => kitchen.id === id) || null;
  };

  const handleCancelBooking = (id: string) => {
    cancelBooking(id);
    setCancellationId(null);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage and view your kitchen reservations
          </p>

          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === 'upcoming'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              <div className="flex items-center">
                <CalendarCheck size={18} className="mr-2" />
                Upcoming Bookings
                {upcomingBookings.length > 0 && (
                  <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {upcomingBookings.length}
                  </span>
                )}
              </div>
            </button>
            <button
              className={`pb-3 px-4 font-medium ${
                activeTab === 'past'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('past')}
            >
              <div className="flex items-center">
                <CalendarX size={18} className="mr-2" />
                Past Bookings
                {pastBookings.length > 0 && (
                  <span className="ml-2 bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    {pastBookings.length}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Booking List */}
          <div>
            {activeTab === 'upcoming' && (
              <>
                {upcomingBookings.length === 0 ? (
                  <EmptyState message="You don't have any upcoming bookings" />
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map(booking => (
                      <BookingCard 
                        key={booking.id}
                        booking={booking}
                        kitchen={getKitchenById(booking.kitchenId)}
                        onCancelClick={() => setCancellationId(booking.id)}
                        isPast={false}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'past' && (
              <>
                {pastBookings.length === 0 ? (
                  <EmptyState message="You don't have any past bookings" />
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map(booking => (
                      <BookingCard 
                        key={booking.id}
                        booking={booking}
                        kitchen={getKitchenById(booking.kitchenId)}
                        onCancelClick={() => {}}
                        isPast={true}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {cancellationId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Cancel Booking</h3>
              <button 
                onClick={() => setCancellationId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              <div className="bg-amber-50 p-3 rounded-md flex items-start">
                <Info size={18} className="text-amber-500 mr-2 mt-0.5" />
                <p className="text-sm text-amber-700">
                  Cancellations made less than 24 hours before the booking time may be subject to our cancellation policy.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setCancellationId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Keep Booking
              </button>
              <button 
                onClick={() => handleCancelBooking(cancellationId)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  kitchen: any;
  onCancelClick: () => void;
  isPast: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  kitchen, 
  onCancelClick,
  isPast
}) => {
  const [showMenu, setShowMenu] = useState(false);

  if (!kitchen) return null;

  const bookingDate = new Date(booking.date);
  const startTime = new Date(booking.timeSlots[0].startTime);
  const endTime = new Date(booking.timeSlots[booking.timeSlots.length - 1].endTime);
  
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  
  const formattedTime = `${startTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit'
  })} - ${endTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit'
  })}`;

  const statusBadge = () => {
    switch(booking.status) {
      case 'confirmed':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmed</span>;
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Pending</span>;
      case 'cancelled':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{kitchen.name}</h3>
              {statusBadge()}
            </div>
            <p className="text-gray-500 text-sm">{kitchen.location}</p>
          </div>
          
          {!isPast && booking.status !== 'cancelled' && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10">
                  <button
                    onClick={() => {
                      onCancelClick();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md">
            <Clock size={18} className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm font-medium">{formattedDate}</p>
              <p className="text-xs text-gray-500">{formattedTime}</p>
            </div>
          </div>
          
          <div className="bg-gray-100 px-3 py-1.5 rounded-md">
            <p className="text-sm"><span className="font-medium">Purpose:</span> {booking.purpose}</p>
          </div>
        </div>
        
        {booking.notes && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">{booking.notes}</p>
          </div>
        )}
        
        {!isPast && booking.status !== 'cancelled' && (
          <div className="pt-3 border-t">
            <button
              onClick={onCancelClick}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <CalendarX size={24} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-500 mb-4">
        Browse our kitchens and make a reservation today.
      </p>
      <a
        href="/book"
        className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        Book a Kitchen
      </a>
    </div>
  );
};

export default DashboardPage;