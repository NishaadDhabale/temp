// src/components/Header.jsx
import { ShoppingCart, Search, Menu } from 'lucide-react';

/**
 * Header component featuring the brand logo, search bar, and cart icon.
 */
export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-3">
            <Menu className="text-gray-700 w-6 h-6 cursor-pointer md:hidden hover:text-blue-600 transition" />
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-blue-600">Oxy</span><span className="text-green-600">ver</span>
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search carbon credits..."
                aria-label="Search carbon credits"
                className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Actions (Sell Credits and Cart) */}
          <div className="flex items-center gap-6">
            <button className="hidden md:block text-green-600 font-bold hover:text-green-700 transition px-3 py-1 rounded-lg border border-green-600 hover:bg-green-50">
               Sell Credits
            </button>
            <div className="relative cursor-pointer">
              <ShoppingCart className="text-blue-600 w-6 h-6 hover:text-blue-700 transition" />
              {/* Mock Cart Count */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ring-2 ring-white">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (bottom of header) */}
        <div className="md:hidden mt-3">
           <div className="relative w-full">
            <input
              type="text"
              placeholder="Search carbon credits..."
              aria-label="Search carbon credits (mobile)"
              className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
             <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}