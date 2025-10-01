// src/components/ProductCard.jsx
import { Star, MapPin, ShoppingBag, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import BuyModal from './BuyModal';

export default function ProductCard({ product }) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100/50">
        <div className="relative overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x300/60A5FA/ffffff?text=${product.category.toUpperCase()}` }}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.verified && (
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-md">
              <span className="w-2 h-2 bg-white rounded-full block"></span>
              VERIFIED
            </span>
          )}
          <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-tl-lg font-semibold capitalize">
            {product.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-extrabold text-gray-800 text-xl mb-2 line-clamp-2 min-h-[56px]">
            {product.name}
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-bold text-gray-700">{product.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 text-sm truncate">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{product.location}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[60px]">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">
              {product.carbon_credits.toLocaleString()} Credits Available
            </span>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-2 flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">per credit</div>
            </div>
            <button
              onClick={() => setShowBuyModal(true)}
              className="bg-green-600 text-white px-5 py-3 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-green-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-green-400/50 hover:shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {showBuyModal && (
        <BuyModal
          product={product}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </>
  );
}