import { Link } from 'react-router-dom';
import { Waves, Shield, ShoppingCart, ListPlus, UserCheck } from 'lucide-react';

export default function Navbar({ walletAddress, connectWallet }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Waves className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Oxyver MRV</h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="hover:text-blue-200 transition-colors font-medium flex items-center space-x-1">
                <ShoppingCart className="w-4 h-4" />
                <span>Marketplace</span>
            </Link>
            <Link to="/signin" className="hover:text-blue-200 transition-colors font-medium flex items-center space-x-1">
                <ListPlus className="w-4 h-4" />
                <span>Register Project</span>
            </Link>
            <Link to="/signinn" className="hover:text-blue-200 transition-colors font-medium flex items-center space-x-1">
                <UserCheck className="w-4 h-4" />
                <span>NCCR Admin</span>
            </Link>
            {walletAddress ? (
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">
                    {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                </span>
              </div>
            ) : (
                <button onClick={connectWallet} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Connect Wallet
                </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}