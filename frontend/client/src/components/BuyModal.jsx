// src/components/BuyModal.jsx
import { X, ShoppingBag, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function BuyModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const totalAmount = quantity * product.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-fade-in shadow-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h3>
          <p className="text-gray-600">Your commitment to blue carbon has been recorded. Thank you for supporting coastal restoration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
        <div className="sticky top-0 bg-green-600 text-white p-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-xl font-bold">Complete Your Purchase</h2>
          <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200 shadow-sm">
            <div className="flex gap-4 items-center">
              <img src={product.image_url} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/96x96/60A5FA/ffffff?text=Credit" }} className="w-24 h-24 object-cover rounded-lg shadow-md" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1 text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                  Location: <span className="font-medium text-gray-700">{product.location}</span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{product.carbon_credits.toLocaleString()} credits available</span>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input type="text" required value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow" placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input type="email" required value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Credits *</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 bg-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-300 transition disabled:opacity-50" disabled={quantity <= 1}>-</button>
                  <input type="number" min="1" max={product.carbon_credits} value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(product.carbon_credits, parseInt(e.target.value) || 1)))} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold" />
                  <button type="button" onClick={() => setQuantity(Math.min(product.carbon_credits, quantity + 1))} className="w-10 h-10 bg-gray-200 rounded-lg font-bold text-gray-700 hover:bg-gray-300 transition disabled:opacity-50" disabled={quantity >= product.carbon_credits}>+</button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum available: {product.carbon_credits.toLocaleString()} credits</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Price per credit:</span>
                <span className="font-semibold">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Quantity selected:</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 mt-3 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                <span className="text-3xl font-extrabold text-green-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || quantity < 1 || !buyerName || !buyerEmail}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-extrabold text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Transaction...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  Confirm & Buy {quantity.toLocaleString()} Credit{quantity !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}