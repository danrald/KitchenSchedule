import React from 'react';
import { BookingPurpose } from '../../types';

interface BookingFormProps {
  bookingPurpose: BookingPurpose | '';
  setBookingPurpose: React.Dispatch<React.SetStateAction<BookingPurpose | ''>>;
  additionalNotes: string;
  setAdditionalNotes: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  bookingPurpose,
  setBookingPurpose,
  additionalNotes,
  setAdditionalNotes,
  isSubmitting,
  onSubmit,
  onBack
}) => {
  const bookingPurposes: BookingPurpose[] = [
    'Cooking',
    'Baking',
    'Meal Prep',
    'Catering',
    'Food Photography',
    'Recipe Testing',
    'Teaching/Workshop',
    'Other'
  ];

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Purpose of Booking*
        </label>
        <select
          value={bookingPurpose}
          onChange={(e) => setBookingPurpose(e.target.value as BookingPurpose)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">Select purpose</option>
          {bookingPurposes.map(purpose => (
            <option key={purpose} value={purpose}>{purpose}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Additional Notes
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={4}
          placeholder="Any specific requirements or information you would like us to know"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            required
            className="h-5 w-5 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="ml-2 text-gray-700">
            I agree to the <a href="#" className="text-emerald-600 hover:underline">terms and conditions</a>*
          </span>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button 
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        
        <button 
          type="submit"
          disabled={isSubmitting || !bookingPurpose}
          className={`px-6 py-2 rounded-md ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : !bookingPurpose
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Complete Booking'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;