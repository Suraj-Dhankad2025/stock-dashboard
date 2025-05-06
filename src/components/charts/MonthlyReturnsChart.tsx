import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyReturnsChart: React.FC = () => {
  const { theme } = useTheme();
  const monthlyReturns = useMemo(() => [
    { month: 'Jan', return: 2.5 },
    { month: 'Feb', return: -1.2 },
    { month: 'Mar', return: 3.7 },
    { month: 'Apr', return: 1.8 },
    { month: 'May', return: -0.6 },
    { month: 'Jun', return: 2.1 },
    { month: 'Jul', return: 4.3 },
    { month: 'Aug', return: -2.1 },
    { month: 'Sep', return: 0.5 },
    { month: 'Oct', return: 1.9 },
    { month: 'Nov', return: -3.2 },
    { month: 'Dec', return: 2.7 },
  ], []);

  const chartData = {
    labels: monthlyReturns.map(data => data.month),
    datasets: [
      {
        label: 'Monthly Returns (%)',
        data: monthlyReturns.map(data => data.return),
        backgroundColor: monthlyReturns.map(data => 
          data.return >= 0 
            ? theme === 'dark' ? 'rgba(52, 211, 153, 0.8)' : 'rgba(16, 185, 129, 0.8)'
            : theme === 'dark' ? 'rgba(248, 113, 113, 0.8)' : 'rgba(239, 68, 68, 0.8)' 
        ),
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme === 'dark' ? 'rgba(17, 24, 39, 1)' : 'white',
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
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2) + '%';
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
          callback: function(value: number) {
            return value + '%';
          }
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
      }
    },
  };

  return (
    <div className="h-72">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlyReturnsChart;