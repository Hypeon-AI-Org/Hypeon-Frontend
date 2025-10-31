import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, BookmarkCheck, MessageCircle, Package, Key, Image, Lock } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'New Search', path: '/dashboard', icon: Search },
    { name: 'Saved Reports', path: '/saved-reports', icon: BookmarkCheck },
    { name: 'Ask Copilot', path: '/copilot', icon: MessageCircle },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Keywords', path: '/keywords', icon: Key },
    { name: 'Ad Creatives', path: '/ad-creatives', icon: Image }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-purple-950 to-purple-900 border-r border-pink-800/30 pt-6 overflow-y-auto">
      <Link to="/" className="flex items-center justify-center mb-10">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          hypeon.ai
        </div>
      </Link>

      <nav className="space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isDisabled = ['/copilot', '/products', '/keywords', '/ad-creatives'].includes(item.path);

          return (
            <Link
              key={item.name}
              to={isDisabled ? '#' : item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30 text-pink-300 shadow-lg'
                  : isDisabled
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:bg-purple-800/30 hover:text-pink-300'
              }`}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
              {isDisabled && <Lock size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
