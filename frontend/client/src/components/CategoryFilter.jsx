// src/components/CategoryFilter.jsx
import { Leaf, Waves, Trees, Globe } from 'lucide-react';

// Define the categories and their associated icons
const categories = [
  { id: 'all', label: 'All', icon: Globe },
  { id: 'mangrove', label: 'Mangroves', icon: Trees },
  { id: 'seagrass', label: 'Seagrass', icon: Waves },
  { id: 'wetland', label: 'Wetlands', icon: Leaf },
  { id: 'mixed', label: 'Mixed', icon: Globe }
];

/**
 * CategoryFilter component allows users to select a carbon credit category.
 * @param {object} props
 * @param {string} props.selectedCategory - The currently active category ID.
 * @param {function} props.onSelectCategory - Callback function to set the new category.
 */
export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 mb-8 border border-gray-100">
      <h3 className="font-bold text-xl text-gray-800 mb-3">Filter Blue Carbon Projects</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          // Icon component is dynamically assigned here
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                flex items-center gap-2 px-5 py-2 rounded-full text-base font-semibold transition-all duration-300 transform
                ${
                  isActive
                    ? 'bg-green-600 text-white shadow-lg shadow-green-300/50 scale-[1.02]'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:shadow-sm'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}