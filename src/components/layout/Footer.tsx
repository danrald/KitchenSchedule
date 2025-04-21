import React from 'react';
import { ChefHat, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">KitchenTime</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional kitchen spaces available to rent by the hour. Perfect for chefs, bakers, caterers, and food entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Mail size={20} />} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/book">Book Kitchen</FooterLink>
              <FooterLink to="/dashboard">My Bookings</FooterLink>
              <FooterLink to="/kitchen/1">Kitchen Details</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/terms">Terms & Conditions</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p>123 Culinary Street</p>
              <p>Foodie District</p>
              <p>Gastronomia, GA 12345</p>
              <p className="mt-2">Email: info@kitchentime.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} KitchenTime. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon: React.FC<{icon: React.ReactNode}> = ({ icon }) => (
  <a 
    href="#" 
    className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
  >
    {icon}
  </a>
);

export default Footer;