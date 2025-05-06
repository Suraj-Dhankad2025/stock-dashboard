import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Investment } from '../../types';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface AssetAllocationChartProps {
  investments: Investment[];
}

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ investments }) => {
  const { theme } = useTheme();
  
  const chartData = useMemo(() => {
    // Group investments by type and calculate total amount for each type
    const assetTypeAmounts = investments.reduce((acc, investment) => {
      const { type, amount } = investment;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += amount;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(assetTypeAmounts);
    const data = Object.values(assetTypeAmounts);

    // Generate colors for each asset type
    // Light theme colors
    const lightColors = [
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(16, 185, 129, 0.8)', // Green
      'rgba(245, 158, 11, 0.8)', // Amber
      'rgba(239, 68, 68, 0.8)',  // Red
      'rgba(139, 92, 246, 0.8)', // Purple
      'rgba(236, 72, 153, 0.8)', // Pink
    ];

    // Dark theme colors (slightly brighter)
    const darkColors = [
      'rgba(96, 165, 250, 0.8)', // Blue
      'rgba(52, 211, 153, 0.8)', // Green
      'rgba(251, 191, 36, 0.8)', // Amber
      'rgba(248, 113, 113, 0.8)', // Red
      'rgba(167, 139, 250, 0.8)', // Purple
      'rgba(244, 114, 182, 0.8)', // Pink
    ];

    const colors = theme === 'dark' ? darkColors : lightColors;

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, index) => colors[index % colors.length]),
          borderColor: theme === 'dark' ? 'rgba(17, 24, 39, 1)' : 'white',
          borderWidth: 2,
        },
      ],
    };
  }, [investments, theme]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: theme === 'dark' ? '#e5e7eb' : '#374151',
          padding: 20,
          font: {
            size: 12,
          },
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const meta = chart.getDatasetMeta(0);
                const total = meta.total;
                const value = data.datasets[0].data[i];
                const percentage = ((value / total) * 100).toFixed(1);
                
                return {
                  text: `${label}: ${percentage}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  hidden: isNaN(data.datasets[0].data[i]) || meta.data[i].hidden,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.getDatasetMeta(0).total;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(value)} (${percentage}%)`;
          }
        }
      },
    },
    animations: {
      animateRotate: true,
      animateScale: true
    },
  };

  return (
    <div className="h-64">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default AssetAllocationChart;