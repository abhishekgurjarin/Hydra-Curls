import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AIChatWidget from './components/AIChatWidget';
import { ShoppingBag, User } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00C9E8] to-[#6B3FA0] flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Hydra Curls Shop</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-[#00C9E8] transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-[#00C9E8] transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6B3FA0] rounded-full border border-white"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col relative">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        <AIChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
