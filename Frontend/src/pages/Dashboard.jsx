import React, { useEffect, useState } from 'react';
import NetMovementModal from '../components/NetMovementModal';
import api from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard({ refreshTrigger }) {
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [refreshTrigger]);

  if (!stats) return <div>Loading...</div>;

  const pieData = {
    labels: ['Purchases', 'Transfers In', 'Transfers Out', 'Assignments', 'Expended'],
    datasets: [{
      data: [stats.purchases, stats.transfersIn, stats.transfersOut, stats.assignments, stats.expended],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    }]
  };

  const barData = {
    labels: ['Purchases', 'Transfers In', 'Transfers Out', 'Assignments', 'Expended'],
    datasets: [{
      label: 'Quantity',
      data: [stats.purchases, stats.transfersIn, stats.transfersOut, stats.assignments, stats.expended],
      backgroundColor: '#3b82f6'
    }]
  };

  return (
    <div className='bg-darkbrown'>
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-sand">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-khaki text-armygreen rounded shadow">
          <div className="font-semibold mb-2 text-lg">Opening Balance: {stats.openingBalance}</div>
          <Pie data={pieData} />
        </div>

        <div className="p-4 bg-khaki text-armygreen rounded shadow">
          <div className="font-semibold mb-2 text-lg">Closing Balance: {stats.closingBalance}</div>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </div>

        <div className="p-4 bg-khaki text-armygreen rounded shadow">
          <div className="flex justify-between items-center">
            <span className='font-semibold text-lg'>Net Movement: {stats.netMovement}</span>
            <button 
              className="bg-armygreen text-khaki text-md px-2 py-1 rounded cursor-pointer font-semibold"
              onClick={() => setShowModal(true)}
            >
              View
            </button>
          </div>
          <div 
    onClick={() => setShowModal(true)} 
    className="p-4 bg-khaki text-armygreen rounded"
  >
    <div className=" text-2xl">
      <p>Purchases: {stats.purchases}</p>
      <p>Transfers In: {stats.transfersIn}</p>
      <p>Transfers Out: {stats.transfersOut}</p>
      <p>Assignments: {stats.assignments}</p>
      <p>Expended: {stats.expended}</p>
    </div>
    </div>
        </div>

        <div className="p-4 bg-khaki text-armygreen rounded shadow">
          <div className="font-semibold mb-2 text-lg">Purchases: {stats.purchases}</div>
          <Pie data={{
            labels: ['Purchases', 'Other'],
            datasets: [{
              data: [stats.purchases, (stats.openingBalance + stats.closingBalance + stats.netMovement) - stats.purchases],
              backgroundColor: ['#3b82f6', '#e5e7eb']
            }]
          }} />
        </div>

        <div className="p-4 bg-khaki text-armygreen rounded shadow">
          <div className="font-semibold mb-2 text-lg">Transfers In: {stats.transfersIn}</div>
          <Bar data={{
            labels: ['Transfers In', 'Other'],
            datasets: [{
              label: 'Transfers In',
              data: [stats.transfersIn, (stats.openingBalance + stats.closingBalance + stats.netMovement) - stats.transfersIn],
              backgroundColor: ['#10b981', '#e5e7eb']
            }]
          }} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>

      <NetMovementModal
        open={showModal}
        onClose={() => setShowModal(false)}
        details={stats}
      />
    </div>
    </div>
  );
}
