// src/Components/Charts/DonutChart.js

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * @param {Array} data - Example: [{ category: 'Rent', value: 1000 }, { category: 'Utilities', value: 300 }, ...]
 */
function DonutChart({ data = [] }) {
  const labels = data.map((item) => item.category);
  const values = data.map((item) => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#8bc34a',
          '#ff9800',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '60%', // donut thickness
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <DonutChartStyled>
      <Doughnut data={chartData} options={options} />
    </DonutChartStyled>
  );
}

const DonutChartStyled = styled.div`
  width: 100%;
  height: 250px; 
`;

export default DonutChart;
