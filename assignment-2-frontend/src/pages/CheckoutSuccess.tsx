import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart upon successful checkout
    clearCart();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
      <p className="text-xl text-gray-600 mb-8">Thank you for your order. Your premium Hydra Curls products are on their way.</p>
      
      <div className="flex justify-center gap-4">
        <Link 
          to="/orders" 
          className="px-8 py-3 bg-white text-[#6B3FA0] font-bold rounded-xl border-2 border-[#6B3FA0] hover:bg-gray-50 transition-colors"
        >
          View Order History
        </Link>
        <Link 
          to="/" 
          className="px-8 py-3 bg-[#6B3FA0] text-white font-bold rounded-xl hover:bg-[#5a3487] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
