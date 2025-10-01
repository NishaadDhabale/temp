import React, { useState, useEffect } from 'react';
import { AtSign, Lock, Users, ChevronDown, Leaf, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    accountType: '',
    email: '',
    password: '',
  });
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  const navigate= useNavigate();
  // For the initial fade-in animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const accountTypes = [
    { value: 'nccr', label: 'NCCR (National Committee for Climate Research)' },
    { value: 'ngo', label: 'NGO (Non-Governmental Organization)' },
    { value: 'company', label: 'Company' }
  ];

  const handleVerification = () => {
    setIsVerified(true);
    setErrors(prev => ({ ...prev, verification: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountType) newErrors.accountType = 'Please select an account type';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!isVerified) newErrors.verification = 'Please complete the verification step';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign in attempt:', { ...formData, verified: isVerified });
      alert('Sign in successful!');
      navigate("/block");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedAccountType = accountTypes.find(type => type.value === formData.accountType);

  return (

     <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

      <div
        className={`w-full max-w-md transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-400/10 rounded-full mb-4 ring-2 ring-cyan-400/30">
            <Leaf className="w-10 h-10 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px #22d3ee)' }}/>
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 mb-2">
            BlueCarbon
          </h1>
          <p className="text-slate-400">Carbon Credit Management Platform</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-semibold text-center text-slate-200 mb-6">Secure Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Dropdown */}
            <div className="relative">
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full pl-12 pr-10 py-3 text-left bg-slate-900/50 border-b-2 rounded-t-lg transition-all duration-300 ${
                    errors.accountType ? 'border-red-500' : 'border-slate-600 focus:border-cyan-400'
                  } focus:outline-none`}
                >
                  <span className={selectedAccountType ? 'text-slate-200' : 'text-slate-500'}>
                    {selectedAccountType ? selectedAccountType.label.split('(')[0].trim() : 'Select Account Type'}
                  </span>
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-b-lg shadow-lg max-h-60 overflow-auto">
                    {accountTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          handleInputChange('accountType', type.value);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-slate-300 hover:bg-cyan-500/10 transition-colors duration-200"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.accountType && <p className="text-red-400 text-xs mt-2 pl-1">{errors.accountType}</p>}
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-slate-900/50 border-b-2 rounded-t-lg transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-slate-600 focus:border-cyan-400'
                  } focus:outline-none`}
                  placeholder="Email Address"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-2 pl-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 bg-slate-900/50 border-b-2 rounded-t-lg transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-slate-600 focus:border-cyan-400'
                  } focus:outline-none`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-2 pl-1">{errors.password}</p>}
            </div>

            {/* Human Verification */}
            <div>
              <button
                type="button"
                onClick={handleVerification}
                disabled={isVerified}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 text-sm font-semibold ${
                  isVerified
                    ? 'bg-green-500/20 text-green-400 cursor-default'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                } ${errors.verification ? 'ring-2 ring-red-500' : ''}`}
              >
                <ShieldCheck size={18} />
                {isVerified ? 'Verification Complete' : 'Click to Verify You Are Human'}
              </button>
              {errors.verification && <p className="text-red-400 text-xs mt-2 text-center">{errors.verification}</p>}
            </div>

            {/* Submit Button */}
            <button
            onClick={()=>{
              navigate="/block"
            }}
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-slate-400">
            <a href="#" className="hover:text-cyan-300 transition-colors duration-300">
              Forgot Password?
            </a>
            <span className="mx-2 text-slate-600">•</span>
            <a href="#" className="hover:text-cyan-300 transition-colors duration-300">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}