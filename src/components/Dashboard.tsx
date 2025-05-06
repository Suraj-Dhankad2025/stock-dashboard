import React, { useState, useEffect } from 'react';
import InvestmentTable from './InvestmentTable';
import PortfolioValueChart from './charts/PortfolioValueChart';
import AssetAllocationChart from './charts/AssetAllocationChart';
import MonthlyReturnsChart from './charts/MonthlyReturnsChart';
import { generateMockPortfolioData, mockInvestments } from '../data/mockData';
import { Investment } from '../types';

interface StockDataState {
  current: {
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
    timePoints: Array<{
      timestamp: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }>;
  };
  historical: {
    data: Array<{
      date: string;
      value: number;
    }>;
  };
}

const Dashboard: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>(mockInvestments);
  const [assetFilter, setAssetFilter] = useState<string>('all');
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [stockData] = useState<StockDataState>({
    current: {
      symbol: 'AAPL',
      lastRefreshed: new Date().toISOString(),
      timeZone: 'America/New_York',
      timePoints: [{
        timestamp: new Date().toISOString(),
        open: 150,
        high: 155,
        low: 148,
        close: 152,
        volume: 1000000
      }]
    },
    historical: {
      data: generateMockPortfolioData()
    }
  });

  useEffect(() => {
    if (assetFilter === 'all') {
      setFilteredInvestments(investments);
    } else {
      setFilteredInvestments(investments.filter(investment => investment.type === assetFilter));
    }
  }, [assetFilter, investments]);

  const assetTypes = ['all', ...Array.from(new Set(investments.map(item => item.type)))];

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Portfolio Value Over Time</h2>
          <PortfolioValueChart data={stockData.historical.data} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Asset Allocation</h2>
          <AssetAllocationChart investments={investments} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Monthly Returns</h2>
        <MonthlyReturnsChart />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Investment Portfolio</h2>
          <div className="mt-2 md:mt-0">
            <label htmlFor="assetFilter" className="mr-2 text-gray-700 dark:text-gray-300">Filter by:</label>
            <select
              id="assetFilter"
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2"
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value)}
            >
              {assetTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <InvestmentTable investments={filteredInvestments} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;