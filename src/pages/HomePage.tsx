import React from 'react';
import { Link } from 'react-router-dom';
import { useKitchen } from '../context/KitchenContext';
import { Clock, Utensils, DollarSign, Star, ArrowRight } from 'lucide-react';
import KitchenCard from '../components/kitchen/KitchenCard';
import TestimonialCard from '../components/testimonials/TestimonialCard';

const HomePage: React.FC = () => {
  const { kitchens } = useKitchen();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg" 
            alt="Modern kitchen" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Your <span className="text-amber-400">Professional Kitchen</span> Away From Home
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Book professional kitchen space by the hour. Perfect for chefs, bakers, caterers, and food entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/book" 
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white font-medium transition-all duration-300 text-center"
              >
                Book Now
              </Link>
              <Link 
                to="/kitchen/1" 
                className="px-8 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-300 text-center"
              >
                View Kitchens
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose KitchenTime?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide fully equipped professional kitchens for rent by the hour with all the amenities you need to create culinary masterpieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-emerald-600" />}
              title="Flexible Scheduling"
              description="Book kitchen time by the hour, day, or week. Only pay for the time you need with no long-term commitments."
            />
            <FeatureCard 
              icon={<Utensils className="h-10 w-10 text-emerald-600" />}
              title="Professional Equipment"
              description="Access commercial-grade appliances, utensils, and workspaces that meet health department standards."
            />
            <FeatureCard 
              icon={<DollarSign className="h-10 w-10 text-emerald-600" />}
              title="Cost Effective"
              description="Save thousands on equipment and space rental. Perfect for testing new concepts or scaling your food business."
            />
          </div>
        </div>
      </section>

      {/* Kitchen Spaces Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Kitchen Spaces</h2>
              <p className="text-lg text-gray-600">
                Explore our variety of professional kitchens available for booking
              </p>
            </div>
            <Link 
              to="/kitchens" 
              className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700"
            >
              View All Kitchens <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kitchens.slice(0, 3).map(kitchen => (
              <KitchenCard key={kitchen.id} kitchen={kitchen} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from chefs and food entrepreneurs who have used our kitchen spaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sophia Chen"
              role="Pastry Chef"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              quote="KitchenTime has been a game-changer for my bakery business. The professional equipment and flexible hours allowed me to scale production without the overhead costs."
              rating={5}
            />
            <TestimonialCard 
              name="Marcus Johnson"
              role="Catering Business Owner"
              image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              quote="I've been using KitchenTime for my catering business for over a year now. The spaces are always immaculate and the booking process is seamless."
              rating={4}
            />
            <TestimonialCard 
              name="Olivia Martinez"
              role="Food Entrepreneur"
              image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              quote="As a startup food business, KitchenTime provided the perfect solution for production without the huge initial investment. Highly recommend!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Kitchen Time?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join chefs, bakers, and food entrepreneurs who are growing their businesses with our professional kitchen spaces.
          </p>
          <Link 
            to="/book" 
            className="inline-block px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-full font-medium transition-all duration-300"
          >
            Book a Kitchen Now
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;