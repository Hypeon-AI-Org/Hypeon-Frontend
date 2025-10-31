import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`bg-gradient-to-br from-purple-900/40 to-purple-950/40 backdrop-blur-sm border border-pink-700/30 rounded-xl p-6 shadow-lg ${
        hover ? 'hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 transform hover:scale-105' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
