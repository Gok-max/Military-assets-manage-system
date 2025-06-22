import React from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666'];

export default function NetMovementModal({ open, onClose, details }) {
  if (!open) return null;

  const movementData = [
    { name: 'Purchases', value: details.purchases || 0 },
    { name: 'Transfers In', value: details.transfersIn || 0 },
    { name: 'Transfers Out', value: details.transfersOut || 0 },
    { name: 'Assignments', value: details.assignments || 0 },
    { name: 'Expended', value: details.expended || 0 }
  ];

  return (
    <div className="fixed inset-0 bg-armygreen bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-darkbrown p-6 rounded shadow-lg ">
        <h2 className="text-xl font-bold mb-4 text-center text-offwhite">Net Movement Summary</h2>

        <div className="flex flex-row gap-6">
          {/* Pie Chart */}
          <div>
            <h3 className="font-semibold mb-2 text-sand">Net Movement (Pie Chart)</h3>
            <PieChart width={300} height={250}>
              <Pie
                data={movementData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {movementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </div>

          {/* Bar Chart */}
          <div>
            <h3 className="font-semibold mb-2 text-sand">Net Movement (Bar Chart)</h3>
            <BarChart width={300} height={250} data={movementData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-khaki text-darkbrown mt-4 p-2 rounded cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
