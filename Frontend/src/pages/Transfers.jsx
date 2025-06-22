import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Transfers({setRefreshTrigger}) {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({ fromBase: '', toBase: '', type: '', quantity: 1 });
  const [filter, setFilter] = useState({ fromBase: '', toBase: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchTransfers(); }, [filter]);

  async function fetchTransfers() {
    setLoading(true);
    try {
      const res = await api.get('/transfer', { params: filter });
      console.log('Transfers API response:', res.data);
      setTransfers(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleTransfer() {
    if (form.quantity <= 0) {
      setMessage('Quantity must be greater than 0');
      return;
    }
    if (form.fromBase === form.toBase) {
      setMessage('From Base and To Base cannot be the same');
      return;
    }
    try {
      await api.post('/transfer', form);
      setMessage('Transfer successful!');
      setRefreshTrigger(prev => prev + 1);
      fetchTransfers();
      setForm({ fromBase: '', toBase: '', type: '', quantity: 1 });
    } catch (err) {
      console.error(err);
      setMessage('Error processing transfer');
    }
  }

  return (
    <div className='bg-darkbrown p-4 h-screen'>
      <h1 className="text-3xl font-bold mb-4 text-sand">Transfers</h1>

      {message && <div className="text-offwhite mb-2">{message}</div>}

      <div className="bg-sand p-4 rounded shadow mb-4 flex gap-2 flex-wrap text-armygreen">
        <select
          className="border p-1 rounded w-40 border-armygreen"
          value={form.fromBase}
          onChange={(e) => setForm({ ...form, fromBase: e.target.value })}
        >
          <option value="" className='text-armygreen bg-khaki'>From Base</option>
          <option value="Alpha Base" className='text-armygreen bg-khaki'>Alpha Base</option>
          <option value="Bravo Base" className='text-armygreen bg-khaki'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-40"
          value={form.toBase}
          onChange={(e) => setForm({ ...form, toBase: e.target.value })}
        >
          <option value="" className='text-armygreen bg-khaki'>To Base</option>
          <option value="Alpha Base" className='text-armygreen bg-khaki'>Alpha Base</option>
          <option value="Bravo Base" className='text-armygreen bg-khaki'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-40"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="" className='text-armygreen bg-khaki'>Select Equipment</option>
          <option value="vehicle" className='text-armygreen bg-khaki'>Vehicle</option>
          <option value="weapon" className='text-armygreen bg-khaki'>Weapon</option>
          <option value="ammunition" className='text-armygreen bg-khaki'>Ammunition</option>
        </select>

        <input
          className="border p-1 rounded w-24"
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        />

        <button onClick={handleTransfer} className="bg-armygreen text-khaki p-3 rounded font-semibold">
          Transfer
        </button>
      </div>

      <div className="flex gap-2 mb-2 bg-khaki p-4 rounded text-armygreen justify-center">
        <select
          className="border p-1 rounded w-45"
          value={filter.fromBase}
          onChange={(e) => setFilter({ ...filter, fromBase: e.target.value })}
        >
          <option value="" className='text-armygreen bg-sand'>From Base</option>
          <option value="Alpha Base" className='text-armygreen bg-sand'>Alpha Base</option>
          <option value="Bravo Base" className='text-armygreen bg-sand'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-45"
          value={filter.toBase}
          onChange={(e) => setFilter({ ...filter, toBase: e.target.value })}
        >
          <option value="" className='text-armygreen bg-sand'>To Base</option>
          <option value="Alpha Base" className='text-armygreen bg-sand'>Alpha Base</option>
          <option value="Bravo Base" className='text-armygreen bg-sand'>Bravo Base</option>
        </select>

        <select
          className="border p-1 rounded w-45"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
        >
          <option value="" className='text-armygreen bg-sand'>Equipment</option>
          <option value="vehicle" className='text-armygreen bg-sand'>Vehicle</option>
          <option value="weapon" className='text-armygreen bg-sand'>Weapon</option>
          <option value="ammunition" className='text-armygreen bg-sand'>Ammunition</option>
        </select>

        <button onClick={fetchTransfers} className="bg-armygreen text-khaki p-2 rounded w-45 font-semibold">
          Filter
        </button>
      </div>

      {loading ? <div>Loading...</div> : (
        <table className="w-full border bg-sand text-armygreen">
          <thead>
            <tr className="bg-khaki text-armygreen">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">From Base</th>
              <th className="border p-2 text-left">To Base</th>
              <th className="border p-2 text-left">Equipment</th>
              <th className="border p-2 text-left">Qty</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t._id} className="hover:bg-khaki">
                <td className="border p-1">{new Date(t.date).toLocaleDateString('en-GB')}</td>
                <td className="border p-1">{t.fromBase}</td>
                <td className="border p-1">{t.toBase}</td>
                <td className="border p-1">{t.type}</td>
                <td className="border p-1">{t.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
