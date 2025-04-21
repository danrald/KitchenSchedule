import React from 'react';
import { Link } from 'react-router-dom';
import { Kitchen } from '../../types';
import { Star, Clock, Users, ChefHat } from 'lucide-react';

interface KitchenCardProps {
  kitchen: Kitchen;
}

const KitchenCard: React.FC<KitchenCardProps> = ({ kitchen }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={kitchen.images[0]} 
          alt={kitchen.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium text-emerald-700">
          ${kitchen.pricePerHour}/hour
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-1">{kitchen.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{kitchen.location}</p>
        
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-amber-400 mr-1" />
          <span className="text-sm font-medium">{kitchen.rating}</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm text-gray-500">{kitchen.reviews} reviews</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {kitchen.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {kitchen.amenities.length > 3 && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              +{kitchen.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>Capacity: {kitchen.capacity}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Min booking: {kitchen.minHours}h</span>
          </div>
          <div className="flex items-center">
            <ChefHat size={16} className="mr-1" />
            <span>{kitchen.type}</span>
          </div>
        </div>
        
        <Link 
          to={`/kitchen/${kitchen.id}`}
          className="block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default KitchenCard;