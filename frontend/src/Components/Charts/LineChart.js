// src/Components/Charts/LineChart.js

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

/**
 * @param {Array} data - Example: [{ date: '2023-01-01', sales: 2000 }, { date: '2023-02-01', sales: 3000 }, ... ]
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data = [] }) {
  const labels = data.map((item) => item.date);
  const values = data.map((item) => item.sales);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: values,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#eee' } },
    },
  };

  return (
    <LineChartStyled>
      <Line data={chartData} options={options} />
    </LineChartStyled>
  );
}

const LineChartStyled = styled.div`
  width: 100%;
  height: 250px;
`;

export default LineChart;
