import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardBarChart({ data }) {
  const barData = {
    labels: ['Purchases', 'Transfers In', 'Transfers Out', 'Assignments'],
    datasets: [
      {
        label: 'Quantities',
        data: [data.purchases, data.transfersIn, data.transfersOut, data.assignments],
        backgroundColor: '#3b82f6',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Bar data={barData} options={options} />
    </div>
  );
}
