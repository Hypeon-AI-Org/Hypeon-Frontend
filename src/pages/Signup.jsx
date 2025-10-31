import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.address || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }
    
    // Mock signup - navigate to dashboard
    toast({
      title: 'Account Created',
      description: 'Welcome to Hypeon AI!'
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#200042] via-purple-900 to-[#d41fa6] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              hypeon.ai
            </div>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-gradient-to-br from-purple-900/60 to-purple-950/60 backdrop-blur-lg border border-pink-700/30 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Sign up to hypeon.ai</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm">
            Hypeon AI analyzes millions of data points to predict the next big product trends,
            viral keywords, and winning creative angles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
