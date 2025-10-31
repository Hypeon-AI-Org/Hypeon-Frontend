import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { productCategories, markets, stepCards } from '../utils/mockData';
import { ArrowRight, TrendingUp } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');

  const handleSearch = () => {
    if (selectedCategory && selectedMarket) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#200042] via-purple-900 to-[#d41fa6]">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Know What To Sell
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
              Before It Goes Viral
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            Hypeon AI analyzes millions of data points to predict the next big product trends,
            viral keywords, and winning creative angles before your competition even knows they exist.
          </p>

          <SearchBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMarket={selectedMarket}
            setSelectedMarket={setSelectedMarket}
            onSearch={handleSearch}
            categories={productCategories}
            markets={markets}
          />

          <div className="mt-8 flex items-center justify-center space-x-2 text-pink-300">
            <TrendingUp size={20} />
            <p className="text-lg font-medium">21.4M+ data points analyzed daily to predict viral trends</p>
          </div>
        </div>
      </div>

      {/* Three-Step Cards Section */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepCards.map((card) => (
              <Card key={card.step} className="text-center">
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={card.image}
                    alt={`Step ${card.step}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    {card.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-pink-800/30 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Hypeon AI. Predicting trends before they happen.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
