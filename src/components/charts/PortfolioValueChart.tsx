import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';
import { Dialog } from '../ui/Dialog';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TimeRange {
  label: string;
  days: number;
}

const timeRanges: TimeRange[] = [
  { label: '1H', days: 1/24 },
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
  { label: '5Y', days: 1825 }
];

interface PortfolioValueChartProps {
  data: {
    date: string;
    value: number;
  }[];
}

const PortfolioValueChart: React.FC<PortfolioValueChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const [selectedRange, setSelectedRange] = useState<TimeRange>(timeRanges[4]); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredData = data.slice(-Math.ceil(selectedRange.days * 24)); 
  
  const chartData = {
    labels: filteredData.map(item => item.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: filteredData.map(item => item.value),
        fill: true,
        backgroundColor: theme === 'dark' 
          ? 'rgba(37, 99, 235, 0.2)' 
          : 'rgba(59, 130, 246, 0.2)',
        borderColor: theme === 'dark' 
          ? 'rgba(37, 99, 235, 1)' 
          : 'rgba(59, 130, 246, 1)',
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
          callback: function(value: number) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          }
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
      }
    },
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-end space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedRange.label === range.label
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        
        <div 
          className="h-72 cursor-pointer" 
          onClick={() => setIsDialogOpen(true)}
        >
          <Line data={chartData} options={options} />
        </div>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="w-11/12 h-5/6 max-w-6xl"
      >
        <div className="h-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Portfolio Value Over Time
            </h2>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <div className="h-[calc(100%-4rem)]">
            <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PortfolioValueChart;