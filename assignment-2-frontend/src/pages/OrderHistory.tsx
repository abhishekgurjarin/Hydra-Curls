import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your orders</h2>
        <Link to="/login" className="inline-block bg-[#6B3FA0] text-white px-6 py-3 rounded-xl hover:bg-[#5a3487] transition-colors">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
      
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="text-[#00C9E8] font-bold hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Order Placed</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total</p>
                  <p className="text-sm font-bold text-gray-900">${order.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">Order #</p>
                  <p className="text-sm text-gray-900 font-mono">{order.id}</p>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-400">
                          Img
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">Product ID: {item.product_id}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">${(item.price_at_purchase * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
