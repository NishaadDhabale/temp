// src/components/Marketplace.jsx
import { useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import { mockProducts } from '../data/mockProducts';

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/*<Header />*/}
      {/*<Banner />*/}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'all' ? 'All Carbon Credits' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Credits`}
          </h2>
          <span className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </span>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <footer className="bg-green-600 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">
            <span className="text-white">Oxy</span><span className="text-blue-200">ver</span>
          </p>
          <p className="text-white opacity-90 text-sm">
            Supporting coastal ecosystem restoration and carbon sequestration worldwide
          </p>
          <p className="text-white opacity-80 text-xs mt-4">
            &copy; 2025 Oxyver. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}