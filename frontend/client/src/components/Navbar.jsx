import { Waves, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Waves className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Blue Carbon MRV</h1>
              <p className="text-xs text-blue-100">National Centre for Coastal Research</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-blue-200 transition-colors font-medium">Dashboard</a>
            <a href="#" className="hover:text-blue-200 transition-colors font-medium">Projects</a>
            <a href="#" className="hover:text-blue-200 transition-colors font-medium">Analytics</a>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}