import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Assignments({setRefreshTrigger}) {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ base: '', type: '', assignedTo: '', quantity: 1 });
  const [filter, setFilter] = useState({ base: '', type: '', status: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchAssignments(); }, [filter]);

  async function fetchAssignments() {
    setLoading(true);
    try {
      const res = await api.get('/assignment', { params: filter });
      console.log('Assignments API response:', res.data);
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleAssign() {
    if (form.quantity <= 0) {
      setMessage('Quantity must be greater than 0');
      return;
    }
    if (!form.assignedTo.trim()) {
      setMessage('Assigned To is required');
      return;
    }
    try {
      await api.post('/assignment', form);
      setMessage('Asset assigned successfully!');
      setRefreshTrigger(prev => prev + 1);
      fetchAssignments();
      setForm({ base: '', type: '', assignedTo: '', quantity: 1 });
    } catch (err) {
      console.error(err);
      setMessage('Error assigning asset');
    }
  }

  async function markExpended(id) {
    try {
      await api.put(`/assignment/${id}/mark-expended`);
      setMessage('Marked as expended!');
      setRefreshTrigger(prev => prev + 1);
      fetchAssignments();
    } catch (err) {
      console.error(err);
      setMessage('Error marking expended');
    }
  }

  return (
    <div className='bg-darkbrown h-screen p-4'>
      <h1 className="text-3xl font-bold mb-4 text-sand">Asset Assignments</h1>

      {message && <div className="text-offwhite mb-2">{message}</div>}

      <div className="bg-khaki p-4 rounded shadow mb-4 flex gap-2 flex-wrap text-armygreen">
        <select
          className="border p-1 rounded w-40"
          value={form.base}
          onChange={(e) => setForm({ ...form, base: e.target.value })}
        >
          <option value="" className='bg-sand text-armygreen'>Select Base</option>
          <option value="Alpha Base" className='bg-sand text-armygreen'>Alpha Base</option>
          <option value="Bravo Base" className='bg-sand text-armygreen'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-40"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="" className='bg-sand text-armygreen'>Select Equipment</option>
          <option value="vehicle" className='bg-sand text-armygreen'>Vehicle</option>
          <option value="weapon" className='bg-sand text-armygreen'>Weapon</option>
          <option value="ammunition" className='bg-sand text-armygreen'>Ammunition</option>
        </select>

        <input
          className="border p-1 rounded w-40"
          placeholder="Assigned To"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        />

        <input
          className="border p-1 rounded w-24"
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />

        <button onClick={handleAssign} className="bg-armygreen text-khaki p-2 rounded font-semibold">
          Assign Asset
        </button>
      </div>

      <div className="flex gap-2 mb-2 bg-sand text-armygreen justify-center p-3 rounded">
        <select
          className="border p-1 rounded w-44"
          value={filter.base}
          onChange={(e) => setFilter({ ...filter, base: e.target.value })}
        >
          <option value="" className='bg-khaki text-armygreen'>All Bases</option>
          <option value="Alpha Base" className='bg-khaki text-armygreen'>Alpha Base</option>
          <option value="Bravo Base" className='bg-khaki text-armygreen'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-45"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="" className='bg-khaki text-armygreen'>All Types</option>
          <option value="vehicle" className='bg-khaki text-armygreen'>Vehicle</option>
          <option value="weapon" className='bg-khaki text-armygreen'>Weapon</option>
          <option value="ammunition" className='bg-khaki text-armygreen'>Ammunition</option>
        </select>

        <select
          className="border p-1 rounded w-45"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="" className='bg-khaki text-armygreen'>All Status</option>
          <option value="Assigned" className='bg-khaki text-armygreen'>Assigned</option>
          <option value="Expended" className='bg-khaki text-armygreen'>Expended</option>
        </select>

        <button onClick={fetchAssignments} className="bg-armygreen text-khaki p-2 rounded font-semibold w-45">
          Filter
        </button>
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="w-full border bg-sand text-armygreen">
          <thead>
            <tr className="bg-sand">
              <th className="border p-2 text-left">Base</th>
              <th className="border p-2 text-left">Equipment</th>
              <th className="border p-2 text-left">Assigned To</th>
              <th className="border p-2 text-left">Qty</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
  {assignments.map((a) => (
    <tr key={a._id} className="hover:bg-khaki">
      <td className="border p-1">{a.base}</td>
      <td className="border p-1">{a.type}</td>
      <td className="border p-1">{a.assignedTo}</td>
      <td className="border p-1">{a.quantity}</td>
      <td className="border p-1">
        <span className={`px-2 py-1 rounded text-xs ${a.expended ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
          {a.expended ? 'Expended' : 'Assigned'}
        </span>
      </td>
      <td className="border p-1">{new Date(a.date).toLocaleDateString('en-GB')}</td>
      <td className="border p-1">
        {!a.expended && (
          <button onClick={() => markExpended(a._id)} className="bg-armygreen text-khaki p-1 rounded">
            Mark Expended
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
