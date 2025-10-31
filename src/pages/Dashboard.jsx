import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { productCategories, markets, trendingProducts } from '../utils/mockData';
import { ArrowRight, Lock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(trendingProducts);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (selectedCategory) {
      const filtered = trendingProducts.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered.length > 0 ? filtered : trendingProducts);
    } else {
      setFilteredProducts(trendingProducts);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#200042] via-purple-900 to-[#d41fa6]">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">
            Find The Trending Products in Your Niche
          </h1>

          <div className="mb-12">
            <SearchBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedMarket={selectedMarket}
              setSelectedMarket={setSelectedMarket}
              onSearch={handleSearch}
              categories={productCategories}
              markets={markets}
            />
          </div>

          {hasSearched && (
            <>
              {/* Product Cards */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                  <TrendingUp className="text-pink-400" />
                  <span>Trending Products</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.slice(0, 4).map((product) => (
                    <Card key={product.id} className="cursor-pointer">
                      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {product.trend}
                        </div>
                      </div>
                      <h3 className="text-white font-bold mb-2">{product.name}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-300">
                          <span className="text-pink-400 font-medium">Search Volume:</span> {product.searchVolume}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-pink-400 font-medium">Clicks:</span> {product.clicks}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-pink-400 font-medium">CPC:</span> {product.cpc}
                        </p>
                      </div>
                    </Card>
                  ))}
                  <Card className="cursor-pointer flex items-center justify-center" hover={false}>
                    <ArrowRight size={48} className="text-pink-400" />
                  </Card>
                </div>
              </div>

              {/* Purchase Price Card */}
              <div className="mb-8">
                <Card>
                  <h3 className="text-2xl font-bold text-white mb-4">Purchase Price Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-pink-400 mb-2">$24.5K</p>
                      <p className="text-gray-300 text-sm">Avg. Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-400 mb-2">+127%</p>
                      <p className="text-gray-300 text-sm">Growth Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-400 mb-2">$1.85</p>
                      <p className="text-gray-300 text-sm">Avg. CPC</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-400 mb-2">89K</p>
                      <p className="text-gray-300 text-sm">Total Clicks</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Coming Soon Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Product Keywords</h3>
                    <Lock className="text-gray-500" size={24} />
                  </div>
                  <p className="text-gray-400 text-center py-8">Coming Soon</p>
                  <div className="bg-purple-950/50 rounded-lg p-4 border border-pink-700/20">
                    <p className="text-gray-400 text-sm text-center">Unlock to see top ranking keywords</p>
                  </div>
                </Card>

                <Card hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Product Ad Creatives</h3>
                    <Lock className="text-gray-500" size={24} />
                  </div>
                  <p className="text-gray-400 text-center py-8">Coming Soon</p>
                  <div className="bg-purple-950/50 rounded-lg p-4 border border-pink-700/20">
                    <p className="text-gray-400 text-sm text-center">Unlock to see winning ad creatives</p>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
