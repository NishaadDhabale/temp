// src/components/Banner.jsx
import { Leaf, TrendingUp, Shield } from 'lucide-react';

// The Banner component displays promotional information about the carbon credit marketplace.
export default function Banner() {
  return (
    <div className="bg-green-600 text-white py-12 mb-6 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Heading and Tagline */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Invest in Our Planet's Future
          </h2>
           <p className="text-lg md:text-xl text-white opacity-90 max-w-3xl mx-auto font-light">
            Trade verified blue carbon credits from coastal ecosystems worldwide. Make a real impact on climate change today.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Feature 1: Verified Projects */}
          <div className="bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm rounded-xl p-8 text-center border border-white/30 shadow-lg">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Leaf className="w-7 h-7 text-green-700" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-xl mb-2">Verified Projects</h3>
             <p className="text-base text-white opacity-80">
              100% certified carbon offset programs supporting blue ecosystems.
            </p>
          </div>

          {/* Feature 2: Real Impact */}
          <div className="bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm rounded-xl p-8 text-center border border-white/30 shadow-lg">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <TrendingUp className="w-7 h-7 text-green-700" strokeWidth={2.5} />
            </div>
             <h3 className="font-bold text-xl mb-2">Real Impact</h3>
            <p className="text-base text-white opacity-80">
              Direct support for coastal restoration, measurable biodiversity gains.
            </p>
          </div>

          {/* Feature 3: Secure Trading */}
          <div className="bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm rounded-xl p-8 text-center border border-white/30 shadow-lg">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <Shield className="w-7 h-7 text-green-700" strokeWidth={2.5} />
            </div>
             <h3 className="font-bold text-xl mb-2">Secure Trading</h3>
            <p className="text-base text-white opacity-80">
              Transparent, blockchain-verified marketplace for trusted transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}