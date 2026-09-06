import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Hydra<span className="text-[#00C9E8]">Curls</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#6B3FA0] font-medium transition-colors">Shop</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user?.is_admin && (
                  <Link to="/admin" className="text-sm font-medium text-[#00C9E8] hover:text-[#00B0CC] transition-colors">Admin</Link>
                )}
                <Link to="/orders" className="text-sm font-medium text-gray-700 hover:text-[#6B3FA0] transition-colors">Orders</Link>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Hi, {user?.full_name || 'User'}</span>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-red-500 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-[#6B3FA0] font-medium transition-colors">
                Login
              </Link>
            )}
            
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-[#00C9E8] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#6B3FA0] rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
