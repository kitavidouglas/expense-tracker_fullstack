// src/Components/Charts/BarChart.js

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * @param {Array} data - Example: [{ month: 'Jan', amount: 4000 }, { month: 'Feb', amount: 3000 }, ... ]
 */
function BarChart({ data = [] }) {
  // Convert incoming data to labels and amounts for Chart.js
  const labels = data.map((item) => item.month);
  const amounts = data.map((item) => item.amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cash Flow',
        data: amounts,
        backgroundColor: '#4CAF50', // Example color (green)
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Hide legend if only one dataset
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#eee' } },
    },
  };

  return (
    <BarChartStyled>
      <Bar data={chartData} options={options} />
    </BarChartStyled>
  );
}

const BarChartStyled = styled.div`
  width: 100%;
  height: 250px; 
`;

export default BarChart;
