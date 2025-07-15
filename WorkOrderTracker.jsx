import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function WorkOrderTracker() {
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
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Create Work Order</h2>
          <Input placeholder="Technician Name" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} />
          <Input placeholder="Job Number" value={form.job} onChange={e => setForm({ ...form, job: e.target.value })} />
          <Textarea placeholder="Details" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
          <Button onClick={handleSubmit}>Send Work Order</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workOrders.map(order => (
          <Card key={order.id}>
            <CardContent className="space-y-2">
              <h3 className="font-semibold">Job #{order.job}</h3>
              <p><strong>Tech:</strong> {order.tech}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Details:</strong> {order.details}</p>
              <div className="space-x-2">
                <Button onClick={() => updateStatus(order.id, 'In Progress')}>Start</Button>
                <Button onClick={() => updateStatus(order.id, 'Completed')}>Complete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
