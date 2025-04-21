import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useKitchen } from '../context/KitchenContext';
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Users, ChefHat, Utensils, Check } from 'lucide-react';

const KitchenDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { kitchens } = useKitchen();
  const [activeImage, setActiveImage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the kitchen by id
  const kitchen = kitchens.find(k => k.id === id);

  if (!kitchen) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Kitchen Not Found</h2>
          <p className="text-gray-600 mb-6">The kitchen you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/"
            className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Sticky Booking Bar (visible on scroll) */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 transition-all duration-300 transform ${
          isScrolled ? 'translate-y-0' : 'translate-y-full'
        } z-40`}
      >
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="font-semibold text-lg mr-3">{kitchen.name}</h3>
            <span className="text-gray-600">${kitchen.pricePerHour}/hour</span>
          </div>
          <Link 
            to="/book"
            className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="relative h-[70vh]">
        <div className="absolute top-0 left-0 right-0 z-30 pt-6 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link 
              to="/"
              className="flex items-center gap-2 text-white bg-black bg-opacity-30 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-opacity-40 transition-all"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${kitchen.images[activeImage]})` }}
          />
          <div className="hidden md:grid grid-cols-2 gap-1 p-1">
            {kitchen.images.slice(1, 5).map((img, index) => (
              <div 
                key={index}
                className="w-full h-[35vh] bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => setActiveImage(index + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{kitchen.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin size={18} />
                  <span>{kitchen.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-amber-400 w-5 h-5" />
                  <span className="ml-1 font-medium">{kitchen.rating}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-600">{kitchen.reviews} reviews</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="text-2xl font-bold text-emerald-700 mb-1">${kitchen.pricePerHour}</div>
                <div className="text-gray-500">per hour</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <InfoCard 
                icon={<Clock className="h-5 w-5 text-emerald-600" />}
                label="Min. Booking"
                value={`${kitchen.minHours} hours`}
              />
              <InfoCard 
                icon={<Users className="h-5 w-5 text-emerald-600" />}
                label="Capacity"
                value={`${kitchen.capacity} people`}
              />
              <InfoCard 
                icon={<ChefHat className="h-5 w-5 text-emerald-600" />}
                label="Kitchen Type"
                value={kitchen.type}
              />
              <InfoCard 
                icon={<Utensils className="h-5 w-5 text-emerald-600" />}
                label="Cleanliness"
                value={`${kitchen.cleanlinessRating}/5`}
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Kitchen</h2>
              <p className="text-gray-700 mb-4">
                {kitchen.description || `This ${kitchen.type} kitchen is perfect for ${kitchen.capacity} people, offering a range of professional equipment and amenities. Located in ${kitchen.location}, it's ideal for food entrepreneurs, caterers, and chefs looking for a professional space to cook, bake, or prepare meals.`}
              </p>
              <p className="text-gray-700">
                With a minimum booking of {kitchen.minHours} hours at ${kitchen.pricePerHour}/hour, you'll have access to all the equipment and space you need for your culinary projects.
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities & Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {kitchen.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={18} className="text-emerald-500 mr-3" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(kitchen.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{kitchen.rating} out of 5</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{kitchen.reviews} reviews</span>
              </div>

              <div className="space-y-6">
                <ReviewCard 
                  name="Sarah Johnson"
                  date="October 2023"
                  rating={5}
                  comment="Amazing kitchen with all the equipment I needed for my catering business. Very clean and spacious. Will definitely book again!"
                />
                <ReviewCard 
                  name="Michael Chen"
                  date="September 2023"
                  rating={4}
                  comment="Great space for my baking workshop. The ovens work perfectly and the space is well laid out. Only giving 4 stars because the mixer was a bit difficult to operate."
                />
                <ReviewCard 
                  name="Jessica Williams"
                  date="August 2023"
                  rating={5}
                  comment="Perfect commercial kitchen for my meal prep business. The staff was very helpful and the kitchen had everything I needed. Highly recommend!"
                />
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Reserve this Kitchen</h3>
              
              <div className="mb-4 border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">${kitchen.pricePerHour} x 1 hour</span>
                  <span>${kitchen.pricePerHour}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>$15</span>
                </div>
                <div className="flex justify-between items-center font-medium pt-2">
                  <span>Total</span>
                  <span>${kitchen.pricePerHour + 15}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Select your date and time to see final pricing. 
                Minimum booking: {kitchen.minHours} hours.
              </p>
              
              <Link 
                to="/book"
                className="block w-full py-3 bg-emerald-600 text-center text-white rounded-lg hover:bg-emerald-700"
              >
                Check Availability & Book
              </Link>
              
              <div className="mt-4 text-sm text-center text-gray-500">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center mb-1">
        {icon}
        <span className="text-sm text-gray-500 ml-2">{label}</span>
      </div>
      <div className="font-medium">{value}</div>
    </div>
  );
};

interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, date, rating, comment }) => {
  return (
    <div className="border-t pt-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16}
              className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default KitchenDetailsPage;