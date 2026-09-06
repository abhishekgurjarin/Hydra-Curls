import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>;
  if (error || !product) return <div className="p-12 text-center text-red-500">{error || 'Product not found'}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Product Image */}
        <div className="w-full md:w-1/2 h-96 bg-gray-50 rounded-2xl overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <Link to="/" className="text-sm text-[#00C9E8] font-bold hover:underline mb-4 uppercase tracking-wider">
            &larr; Back to Shop
          </Link>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{product.category}</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-[#6B3FA0] mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">{product.description}</p>
          
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-4 bg-gray-900 hover:bg-[#6B3FA0] text-white font-bold text-lg rounded-2xl transition-colors shadow-lg active:scale-95"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
