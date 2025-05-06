import { Investment } from '../types';
import { subDays, format } from 'date-fns';

export const mockInvestments: Investment[] = [
  {
    id: '1',
    asset: 'Apple Inc. (AAPL)',
    type: 'stock',
    amount: 10000,
    gainLoss: 12.5,
    purchaseDate: '2023-01-15',
  },
  {
    id: '2',
    asset: 'Microsoft Corp. (MSFT)',
    type: 'stock',
    amount: 15000,
    gainLoss: 8.3,
    purchaseDate: '2023-02-20',
  },
  {
    id: '3',
    asset: 'Tesla Inc. (TSLA)',
    type: 'stock',
    amount: 7500,
    gainLoss: -5.2,
    purchaseDate: '2023-03-10',
  },
  {
    id: '4',
    asset: 'Vanguard S&P 500 ETF (VOO)',
    type: 'etf',
    amount: 25000,
    gainLoss: 6.7,
    purchaseDate: '2022-11-05',
  },
  {
    id: '5',
    asset: 'iShares Russell 2000 ETF (IWM)',
    type: 'etf',
    amount: 12000,
    gainLoss: 3.1,
    purchaseDate: '2022-12-15',
  },
  {
    id: '6',
    asset: 'Bitcoin (BTC)',
    type: 'crypto',
    amount: 20000,
    gainLoss: 15.8,
    purchaseDate: '2023-01-25',
  },
  {
    id: '7',
    asset: 'Ethereum (ETH)',
    type: 'crypto',
    amount: 8000,
    gainLoss: -2.4,
    purchaseDate: '2023-02-10',
  },
  {
    id: '8',
    asset: 'U.S. Treasury Bonds',
    type: 'bond',
    amount: 30000,
    gainLoss: 2.1,
    purchaseDate: '2022-10-20',
  },
  {
    id: '9',
    asset: 'Corporate Bonds Fund',
    type: 'bond',
    amount: 15000,
    gainLoss: 1.5,
    purchaseDate: '2022-09-15',
  },
  {
    id: '10',
    asset: 'Real Estate Investment Trust (REIT)',
    type: 'real_estate',
    amount: 18000,
    gainLoss: 4.2,
    purchaseDate: '2022-08-30',
  },
  {
    id: '11',
    asset: 'Alphabet Inc. (GOOGL)',
    type: 'stock',
    amount: 12500,
    gainLoss: 10.3,
    purchaseDate: '2023-01-05',
  },
  {
    id: '12',
    asset: 'Amazon.com Inc. (AMZN)',
    type: 'stock',
    amount: 9500,
    gainLoss: 7.8,
    purchaseDate: '2023-02-15',
  },
  {
    id: '13',
    asset: 'NVIDIA Corp. (NVDA)',
    type: 'stock',
    amount: 11000,
    gainLoss: 22.5,
    purchaseDate: '2023-03-22',
  },
  {
    id: '14',
    asset: 'Johnson & Johnson (JNJ)',
    type: 'stock',
    amount: 8500,
    gainLoss: 1.2,
    purchaseDate: '2023-01-30',
  },
  {
    id: '15',
    asset: 'JPMorgan Chase & Co. (JPM)',
    type: 'stock',
    amount: 7800,
    gainLoss: 5.6,
    purchaseDate: '2023-02-05',
  },
  {
    id: '16',
    asset: 'Procter & Gamble Co. (PG)',
    type: 'stock',
    amount: 6500,
    gainLoss: 3.7,
    purchaseDate: '2023-03-15',
  },
  {
    id: '17',
    asset: 'Netflix Inc. (NFLX)',
    type: 'stock',
    amount: 8200,
    gainLoss: -4.3,
    purchaseDate: '2023-01-12',
  },
  {
    id: '18',
    asset: 'Walt Disney Co. (DIS)',
    type: 'stock',
    amount: 7300,
    gainLoss: -2.8,
    purchaseDate: '2023-02-25',
  },
  {
    id: '19',
    asset: 'Coca-Cola Co. (KO)',
    type: 'stock',
    amount: 5900,
    gainLoss: 1.9,
    purchaseDate: '2023-03-05',
  },
  {
    id: '20',
    asset: 'Walmart Inc. (WMT)',
    type: 'stock',
    amount: 6200,
    gainLoss: 4.5,
    purchaseDate: '2023-01-22',
  },
  {
    id: '21',
    asset: 'Solana (SOL)',
    type: 'crypto',
    amount: 5500,
    gainLoss: 18.2,
    purchaseDate: '2023-02-17',
  },
  {
    id: '22',
    asset: 'Cardano (ADA)',
    type: 'crypto',
    amount: 3200,
    gainLoss: -8.4,
    purchaseDate: '2023-03-01',
  },
  {
    id: '23',
    asset: 'iShares MSCI Emerging Markets ETF (EEM)',
    type: 'etf',
    amount: 9800,
    gainLoss: -1.5,
    purchaseDate: '2022-11-20',
  },
  {
    id: '24',
    asset: 'Vanguard Total Bond Market ETF (BND)',
    type: 'etf',
    amount: 14500,
    gainLoss: 1.3,
    purchaseDate: '2022-12-10',
  },
  {
    id: '25',
    asset: 'SPDR Gold Shares (GLD)',
    type: 'commodity',
    amount: 7800,
    gainLoss: 6.2,
    purchaseDate: '2023-01-08',
  },
  {
    id: '26',
    asset: 'United States Oil Fund (USO)',
    type: 'commodity',
    amount: 4500,
    gainLoss: -3.8,
    purchaseDate: '2023-02-12',
  },
  {
    id: '27',
    asset: 'Berkshire Hathaway Inc. (BRK.B)',
    type: 'stock',
    amount: 16500,
    gainLoss: 5.9,
    purchaseDate: '2023-03-18',
  },
  {
    id: '28',
    asset: 'Verizon Communications Inc. (VZ)',
    type: 'stock',
    amount: 6800,
    gainLoss: -1.7,
    purchaseDate: '2023-01-28',
  },
  {
    id: '29',
    asset: 'Chevron Corporation (CVX)',
    type: 'stock',
    amount: 9100,
    gainLoss: 2.8,
    purchaseDate: '2023-02-08',
  },
  {
    id: '30',
    asset: 'Exxon Mobil Corp. (XOM)',
    type: 'stock',
    amount: 8700,
    gainLoss: 3.2,
    purchaseDate: '2023-03-25',
  },
  {
    id: '31',
    asset: 'Residential Rental Property',
    type: 'real_estate',
    amount: 250000,
    gainLoss: 8.5,
    purchaseDate: '2022-07-15',
  },
  {
    id: '32',
    asset: 'Commercial Office Space',
    type: 'real_estate',
    amount: 320000,
    gainLoss: 5.3,
    purchaseDate: '2022-09-20',
  },
  {
    id: '33',
    asset: 'Municipal Bonds Fund',
    type: 'bond',
    amount: 22000,
    gainLoss: 1.8,
    purchaseDate: '2022-10-05',
  },
  {
    id: '34',
    asset: 'High-Yield Corporate Bonds',
    type: 'bond',
    amount: 18500,
    gainLoss: 3.6,
    purchaseDate: '2022-11-12',
  },
  {
    id: '35',
    asset: 'Silver Bullion',
    type: 'commodity',
    amount: 6200,
    gainLoss: 7.4,
    purchaseDate: '2023-01-18',
  }
];

export const generateMockPortfolioData = () => {
  const today = new Date();
  const data = [];
  const startingValue = 150000;
  let currentValue = startingValue;
  
  for (let i = 365 * 24; i >= 0; i--) {
    const date = subDays(today, Math.floor(i / 24));
    const hour = i % 24;
    
    const hourlyChangePercent = (Math.random() * 0.5 - 0.2) / 100; 
    currentValue = currentValue * (1 + hourlyChangePercent);
    
    if (i % (24 * 30) === 0) { 
      const monthlyAdjustment = (Math.random() * 6 - 2) / 100; 
      currentValue = currentValue * (1 + monthlyAdjustment);
    }
    
    const formattedDate = `${format(date, 'MMM dd')} ${hour}:00`;
    
    data.push({
      date: formattedDate,
      value: Math.round(currentValue),
    });
  }
  
  return data;
};