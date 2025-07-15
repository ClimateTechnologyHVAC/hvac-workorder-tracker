
import { useState } from 'react';

export default function Home() {
  const [workOrders, setWorkOrders] = useState([]);
  const [form, setForm] = useState({ tech: '', job: '', details: '', status: 'Sent' });

  const handleSubmit = () => {
    setWorkOrders([...workOrders, { ...form, id: Date.now() }]);
    setForm({ tech: '', job: '', details: '', status: 'Sent' });
  };

  const updateStatus = (id, newStatus) => {
    setWorkOrders(workOrders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Create Work Order</h2>
      <input placeholder="Technician Name" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} /><br />
      <input placeholder="Job Number" value={form.job} onChange={e => setForm({ ...form, job: e.target.value })} /><br />
      <textarea placeholder="Details" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} /><br />
      <button onClick={handleSubmit}>Send Work Order</button>

      <div style={{ marginTop: '2rem' }}>
        {workOrders.map(order => (
          <div key={order.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>Job #{order.job}</h3>
            <p><strong>Tech:</strong> {order.tech}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Details:</strong> {order.details}</p>
            <button onClick={() => updateStatus(order.id, 'In Progress')}>Start</button>
            <button onClick={() => updateStatus(order.id, 'Completed')}>Complete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
