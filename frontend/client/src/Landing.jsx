import React, { useState } from 'react';
import {
  Waves,
  Shield,
  Users,
  Smartphone,
  Settings,
  Leaf,
  Database,
  MapPin,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Globe,
  TrendingUp,
  Award,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BlueCarbon MRV</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#solution" className="text-gray-700 hover:text-blue-600 transition-colors">Solution</a>
              <a href="#stakeholders" className="text-gray-700 hover:text-blue-600 transition-colors">Stakeholders</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button onClick={()=>{
                navigate('/block')
              }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Features</a>
              <a href="#solution" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Solution</a>
              <a href="#stakeholders" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Stakeholders</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Contact</a>
              <button onClick={()=>{
                navigate("/block");

              }}className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe className="h-4 w-4" />
                <span>India's Climate Strategy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Blockchain-Powered
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Blue Carbon</span>
                <br />Restoration Registry
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionizing coastal ecosystem restoration through decentralized MRV systems.
                Immutable data storage, tokenized carbon credits, and transparent verification
                for India's blue carbon initiatives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <span onClick={()=>{
                    navigate('/block')
                  }}>Explore Platform</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
                  Watch Demo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Verified Restoration Data</h3>
                      <p className="text-gray-600">Immutable blockchain storage</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Tokenized Carbon Credits</h3>
                      <p className="text-gray-600">Smart contract automation</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Real-time Monitoring</h3>
                      <p className="text-gray-600">Drone & field data integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              The Challenge We're Solving
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Blue carbon ecosystems are crucial for India's climate goals, but lack transparent,
              verifiable monitoring systems for restoration projects and carbon credit generation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-red-50 rounded-2xl">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Eye className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lack of Transparency</h3>
              <p className="text-gray-600">
                Current restoration projects lack verifiable, transparent monitoring systems
                that stakeholders can trust.
              </p>
            </div>

            <div className="text-center p-8 bg-orange-50 rounded-2xl">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Database className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fragmented Data</h3>
              <p className="text-gray-600">
                Restoration data is scattered across different systems, making verification
                and credit generation inefficient.
              </p>
            </div>

            <div className="text-center p-8 bg-yellow-50 rounded-2xl">
              <div className="p-4 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trust Issues</h3>
              <p className="text-gray-600">
                Without immutable records, it's difficult to establish trust between
                stakeholders and verify carbon credit claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section id="solution" className="py-16 bg-gradient-to-r from-blue-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our Blockchain Solution
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              A comprehensive MRV system that ensures transparency, accuracy, and efficient
              carbon credit generation through blockchain technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Immutable Data Storage</h3>
                    <p className="opacity-90">
                      All restoration and plantation data is stored on blockchain,
                      ensuring permanent, tamper-proof records.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Contract Credits</h3>
                    <p className="opacity-90">
                      Automated carbon credit generation and tokenization through
                      verified smart contracts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Multi-Stakeholder Platform</h3>
                    <p className="opacity-90">
                      Seamless onboarding for NGOs, communities, and coastal panchayats
                      with role-based access.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-75">Platform Components</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                      <span className="text-sm">Mobile App</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-green-300" />
                      <span className="text-sm">Admin Panel</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-purple-300" />
                      <span className="text-sm">Smart Contracts</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-orange-300" />
                      <span className="text-sm">Field Integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and features designed for effective blue carbon
              ecosystem monitoring and verification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Registry</h3>
              <p className="text-gray-600">
                Immutable storage of all restoration data with cryptographic verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Credit Tokenization</h3>
              <p className="text-gray-600">
                Automated carbon credit generation through verified smart contracts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Interface</h3>
              <p className="text-gray-600">
                Easy-to-use mobile app for field data collection and uploads.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-orange-100 rounded-lg w-fit mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drone Integration</h3>
              <p className="text-gray-600">
                Seamless integration with drone surveys and aerial monitoring data.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-teal-100 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Stakeholder</h3>
              <p className="text-gray-600">
                Role-based access for NGOs, communities, and government bodies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-red-100 rounded-lg w-fit mb-4">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Tools</h3>
              <p className="text-gray-600">
                Comprehensive administrative tools for NCCR management and oversight.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-indigo-100 rounded-lg w-fit mb-4">
                <Eye className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Live tracking and monitoring of restoration project progress.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="p-3 bg-yellow-100 rounded-lg w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">
                Detailed analytics and reporting for project performance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section id="stakeholders" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Key Stakeholders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform brings together diverse stakeholders in India's blue carbon ecosystem
              restoration efforts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="p-4 bg-blue-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">NGOs & Organizations</h3>
              <p className="text-gray-600 mb-6">
                Environmental organizations leading restoration projects with verified data recording and credit generation.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Project registration and management</li>
                <li>• Data verification and reporting</li>
                <li>• Carbon credit tokenization</li>
              </ul>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="p-4 bg-green-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Coastal Communities</h3>
              <p className="text-gray-600 mb-6">
                Local communities participating in restoration efforts with direct access to monitoring tools.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Community-based restoration</li>
                <li>• Local data collection</li>
                <li>• Benefit sharing mechanisms</li>
              </ul>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <div className="p-4 bg-purple-600 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Settings className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Coastal Panchayats</h3>
              <p className="text-gray-600 mb-6">
                Local governance bodies overseeing restoration initiatives with administrative access.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Administrative oversight</li>
                <li>• Policy implementation</li>
                <li>• Community coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Blue Carbon Restoration?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join India's leading blockchain-powered MRV platform for transparent,
            verifiable coastal ecosystem restoration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center space-x-2 shadow-lg">
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Hectares Monitored</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Active Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">100K+</div>
              <div className="text-blue-100">Carbon Credits Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">BlueCarbon MRV</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing coastal ecosystem restoration through blockchain technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">User Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@bluecarbonmrv.in</li>
                <li>+91-11-1234-5678</li>
                <li>New Delhi, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BlueCarbon MRV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}