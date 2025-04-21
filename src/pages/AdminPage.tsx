import React, { useState } from 'react';
import { useKitchen } from '../context/KitchenContext';
import { Calendar, Users, Clock, Filter, Search, CheckCircle, XCircle } from 'lucide-react';
import { Booking } from '../types';

const AdminPage: React.FC = () => {
  const { bookings, kitchens } = useKitchen();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const kitchen = kitchens.find(k => k.id === booking.kitchenId);
    const kitchenName = kitchen?.name.toLowerCase() || '';
    const searchMatch = kitchenName.includes(searchTerm.toLowerCase());
    
    if (selectedStatus === 'all') {
      return searchMatch;
    }
    
    return booking.status === selectedStatus && searchMatch;
  });

  const getKitchenById = (id: string) => {
    return kitchens.find(kitchen => kitchen.id === id) || null;
  };

  const handleApproveBooking = (id: string) => {
    // In a real app, this would update the booking status in the database
    console.log(`Approving booking ${id}`);
  };

  const handleRejectBooking = (id: string) => {
    // In a real app, this would update the booking status in the database
    console.log(`Rejecting booking ${id}`);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-lg text-gray-600">
                Manage kitchen bookings and availability
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                Add New Kitchen
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Booking Requests</h2>
            </div>

            <div className="p-4 border-b bg-gray-50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by kitchen name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kitchen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking) => {
                      const kitchen = getKitchenById(booking.kitchenId);
                      if (!kitchen) return null;
                      
                      return (
                        <BookingRow 
                          key={booking.id}
                          booking={booking}
                          kitchen={kitchen}
                          onApprove={() => handleApproveBooking(booking.id)}
                          onReject={() => handleRejectBooking(booking.id)}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Total Bookings"
              value={bookings.length}
              icon={<Calendar className="h-8 w-8 text-emerald-600" />}
              change="+12% from last month"
              positive
            />
            <StatCard 
              title="Active Users"
              value={15}
              icon={<Users className="h-8 w-8 text-emerald-600" />}
              change="+5% from last month"
              positive
            />
            <StatCard 
              title="Average Booking Time"
              value="3.2h"
              icon={<Clock className="h-8 w-8 text-emerald-600" />}
              change="-0.5h from last month"
              positive={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookingRowProps {
  booking: Booking;
  kitchen: any;
  onApprove: () => void;
  onReject: () => void;
}

const BookingRow: React.FC<BookingRowProps> = ({ booking, kitchen, onApprove, onReject }) => {
  const bookingDate = new Date(booking.date);
  const startTime = new Date(booking.timeSlots[0].startTime);
  const endTime = new Date(booking.timeSlots[booking.timeSlots.length - 1].endTime);
  
  const formattedDate = bookingDate.toLocaleDateString('en-US', {
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

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmed</span>;
      case 'pending':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Pending</span>;
      case 'cancelled':
        return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">User #{booking.userId}</div>
        <div className="text-sm text-gray-500">{booking.purpose}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{kitchen.name}</div>
        <div className="text-sm text-gray-500">{kitchen.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formattedDate}</div>
        <div className="text-sm text-gray-500">{formattedTime}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(booking.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {booking.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={onApprove}
              className="text-emerald-600 hover:text-emerald-900"
            >
              Approve
            </button>
            <button
              onClick={onReject}
              className="text-red-600 hover:text-red-900"
            >
              Reject
            </button>
          </div>
        )}
        {booking.status === 'confirmed' && (
          <button
            onClick={onReject}
            className="text-red-600 hover:text-red-900"
          >
            Cancel
          </button>
        )}
        {booking.status === 'cancelled' && (
          <span className="text-gray-400">No action</span>
        )}
      </td>
    </tr>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className="bg-emerald-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <div className={`mt-2 flex items-center text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? (
          <CheckCircle size={16} className="mr-1" />
        ) : (
          <XCircle size={16} className="mr-1" />
        )}
        <span>{change}</span>
      </div>
    </div>
  );
};

export default AdminPage;