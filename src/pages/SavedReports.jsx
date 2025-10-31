import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import { savedReports } from '../utils/mockData';
import { Calendar, ArrowUpDown } from 'lucide-react';

const SavedReports = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-31');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedReports = [...savedReports].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    
    if (sortColumn === 'searchVolume' || sortColumn === 'clicks') {
      aVal = parseInt(aVal.replace(/,/g, ''));
      bVal = parseInt(bVal.replace(/,/g, ''));
    } else if (sortColumn === 'cpc') {
      aVal = parseFloat(aVal.replace('$', ''));
      bVal = parseFloat(bVal.replace('$', ''));
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#200042] via-purple-900 to-[#d41fa6]">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Saved Reports</h1>

          {/* Date Selector */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Calendar className="text-pink-400" size={24} />
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="text-white">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 bg-purple-900/50 border border-pink-700/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                Apply Filter
              </button>
            </div>
          </Card>

          {/* Reports Table */}
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Electronics Category</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-pink-700/30">
                    <th
                      className="text-left py-4 px-4 text-pink-400 font-semibold cursor-pointer hover:text-pink-300 transition-colors"
                      onClick={() => handleSort('productName')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Product Name</span>
                        <ArrowUpDown size={16} />
                      </div>
                    </th>
                    <th
                      className="text-left py-4 px-4 text-pink-400 font-semibold cursor-pointer hover:text-pink-300 transition-colors"
                      onClick={() => handleSort('searchVolume')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Search Volume</span>
                        <ArrowUpDown size={16} />
                      </div>
                    </th>
                    <th
                      className="text-left py-4 px-4 text-pink-400 font-semibold cursor-pointer hover:text-pink-300 transition-colors"
                      onClick={() => handleSort('clicks')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Clicks</span>
                        <ArrowUpDown size={16} />
                      </div>
                    </th>
                    <th
                      className="text-left py-4 px-4 text-pink-400 font-semibold cursor-pointer hover:text-pink-300 transition-colors"
                      onClick={() => handleSort('cpc')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>CPC</span>
                        <ArrowUpDown size={16} />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedReports.map((report) => (
                    <tr
                      key={report.id}
                      className="border-b border-pink-700/20 hover:bg-purple-800/20 transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-medium">{report.productName}</td>
                      <td className="py-4 px-4 text-gray-300">{report.searchVolume}</td>
                      <td className="py-4 px-4 text-gray-300">{report.clicks}</td>
                      <td className="py-4 px-4 text-gray-300">{report.cpc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105">
                View All Reports
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SavedReports;
