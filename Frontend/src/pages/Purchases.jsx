import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Purchases({setRefreshTrigger}) {
  const [purchases, setPurchases] = useState([]);
  const [filter, setFilter] = useState({ base: '', type: '' });
  const [form, setForm] = useState({ base: '', type: '', quantity: 1 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchPurchases(); }, [filter]);

  async function fetchPurchases() {
    setLoading(true);
    try {
      const res = await api.get('/purchase', { params: filter });
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleSubmit() {
    if (form.quantity <= 0) {
      setMessage('Quantity must be greater than 0');
      return;
    }
    try {
      await api.post('/purchase', form);
      setMessage('Purchase submitted successfully!');
      setRefreshTrigger(prev => prev + 1);
      fetchPurchases();
      setForm({ base: '', type: '', quantity: 1 });
    } catch (err) {
      console.error(err);
      setMessage('Error submitting purchase');
    }
  }

  return (
    <div className='bg-darkbrown p-4 h-screen'>
      <h1 className="text-3xl font-bold mb-4 text-sand">Manage Purchases</h1>

      {message && <div className="text-offwhite mb-2">{message}</div>}

      <div className="bg-khaki p-4 rounded shadow mb-4">
        <div className="flex gap-2 flex-wrap text-armygreen">
          <select
            className="border p-1 rounded w-40 border-armygreen"
            value={form.base}
            onChange={(e) => setForm({ ...form, base: e.target.value })}
          >
            <option value="" className='text-armygreen bg-sand'>Select Base</option>
            <option value="Alpha Base" className='text-armygreen bg-sand'>Alpha Base</option>
            <option value="Bravo Base" className='text-armygreen bg-sand'>Bravo Base</option>
          </select>

          <select
            className="border p-1 rounded w-40"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="" className='text-armygreen bg-khaki'>Select Equipment</option>
            <option value="vehicle" className='text-armygreen bg-sand'>Vehicle</option>
            <option value="weapon" className='text-armygreen bg-sand'>Weapon</option>
            <option value="ammunition" className='text-armygreen bg-sand'>Ammunition</option>
          </select>

          <input
            className="border p-1 rounded w-24 hover:bg-khaki"
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
          />

          <button onClick={handleSubmit} className="bg-armygreen text-khaki p-3 rounded font-semibold">
            Submit Purchase
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-2 bg-sand p-3 rounded justify-center">
        <select
          className="border p-1 rounded w-45 text-armygreen border-armygreen"
          value={filter.base}
          onChange={(e) => setFilter({ ...filter, base: e.target.value })}
        >
          <option value="" className='text-armygreen bg-khaki'>All Bases</option>
          <option value="Alpha Base" className='text-armygreen bg-khaki'>Alpha Base</option>
          <option value="Bravo Base" className='text-armygreen bg-khaki'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-45 text-armygreen border-armygreen"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="" className='text-armygreen bg-khaki'>All Types</option>
          <option value="vehicle" className='text-armygreen bg-khaki'>Vehicle</option>
          <option value="weapon" className='text-armygreen bg-khaki'>Weapon</option>
          <option value="ammunition" className='text-armygreen bg-khaki'>Ammunition</option>
        </select>

        <button onClick={fetchPurchases} className="bg-armygreen text-khaki p-2 rounded w-45 font-semibold">
          Filter
        </button>
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="w-full bg-khaki text-armygreen rounded-lg p-3">
          <thead>
            <tr className="bg-sand">
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Base</th>
              <th className="border p-2 text-left">Equipment</th>
              <th className="border p-2 text-left">Qty</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, idx) => (
              <tr key={p._id} className="hover:bg-sand">
                <td className="border p-1">{idx + 1}</td>
                <td className="border p-1">{p.base}</td>
                <td className="border p-1">{p.type}</td>
                <td className="border p-1">{p.quantity}</td>
                <td className="border p-1">{new Date(p.date).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
