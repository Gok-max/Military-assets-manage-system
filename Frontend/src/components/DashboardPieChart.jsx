import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPieChart({ data }) {
  const pieData = {
    labels: ['Purchases', 'Transfers In', 'Transfers Out', 'Assignments'],
    datasets: [
      {
        label: 'Asset Distribution',
        data: [data.purchases, data.transfersIn, data.transfersOut, data.assignments],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="max-w-sm mx-auto">
      <Pie data={pieData} />
    </div>
  );
}
