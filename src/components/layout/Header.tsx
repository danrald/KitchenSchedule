import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, Calendar, User, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-emerald-700 transition-all duration-300"
          >
            <ChefHat className="h-8 w-8" />
            <span>GHOSTLAND</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" icon={<Home size={18} />} label="Home" />
            <NavLink
              to="/book"
              icon={<Calendar size={18} />}
              label="Book Kitchen"
            />
            <NavLink
              to="/dashboard"
              icon={<User size={18} />}
              label="My Bookings"
            />
            <button className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300">
              Login / Sign Up
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-emerald-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 md:hidden ${
          isMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <MobileNavLink to="/" icon={<Home size={20} />} label="Home" />
          <MobileNavLink
            to="/book"
            icon={<Calendar size={20} />}
            label="Book Kitchen"
          />
          <MobileNavLink
            to="/dashboard"
            icon={<User size={20} />}
            label="My Bookings"
          />
          <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-all duration-300 mt-2">
            Login / Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 font-medium transition-all duration-300 ${
        isActive ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-600'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 py-3 px-2 rounded-md font-medium ${
        isActive
          ? 'bg-emerald-50 text-emerald-700'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Header;
