import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import type { Appointment, AppointmentStatus } from '../models/appointment';
import { appointmentService } from '../services/appointmentService';
import { formatCurrency, formatDate } from '../utils/format';

const statuses: AppointmentStatus[] = ['scheduled', 'completed', 'cancelled', 'no_show'];

export function AgendamentosPage() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [view, setView] = useState<'kanban' | 'table'>('kanban');

  const load = async () => setItems(await appointmentService.findAll());
  useEffect(() => { load(); }, []);

  const grouped = useMemo(
    () => statuses.reduce((acc, status) => ({ ...acc, [status]: items.filter((item) => item.status === status) }), {} as Record<AppointmentStatus, Appointment[]>),
    [items],
  );

  const onDropStatus = async (appointmentId: string, status: AppointmentStatus) => {
    await appointmentService.updateStatus(appointmentId, { status });
    await load();
  };

  return (
    <Card title="Agendamentos">
      <div className="mb-4 flex gap-2">
        <Button variant={view === 'kanban' ? 'primary' : 'secondary'} onClick={() => setView('kanban')}>Kanban</Button>
        <Button variant={view === 'table' ? 'primary' : 'secondary'} onClick={() => setView('table')}>Tabela</Button>
      </div>

      {view === 'kanban' ? (
        <div className="grid gap-4 xl:grid-cols-4">
          {statuses.map((status) => (
            <div
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={async (e) => {
                const id = e.dataTransfer.getData('appointment_id');
                if (id) await onDropStatus(id, status);
              }}
              className="rounded-xl border border-zinc-800 bg-panelSoft p-3"
            >
              <h3 className="mb-3 text-sm font-semibold uppercase text-accent">{status}</h3>
              <div className="space-y-3">
                {grouped[status]?.map((appointment) => (
                  <article
                    key={appointment.id}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('appointment_id', appointment.id)}
                    className="cursor-grab rounded-lg border border-zinc-700 bg-panel p-3"
                  >
                    <p className="font-medium">{appointment.client?.name ?? appointment.client_id}</p>
                    <p className="text-sm text-zinc-400">{appointment.service?.name ?? appointment.service_id}</p>
                    <p className="text-sm text-zinc-400">{formatDate(appointment.date)} {appointment.time}</p>
                    <p className="text-sm text-zinc-400">{appointment.vehicle_plate}</p>
                    <p className="text-sm text-accent">{formatCurrency(appointment.value)}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table>
          <table className="min-w-full divide-y divide-zinc-800">
            <thead>
              <tr>
                {['Cliente', 'Serviço', 'Data', 'Hora', 'Placa', 'Valor', 'Status'].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs uppercase text-zinc-400">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {items.map((appointment) => (
                <tr key={appointment.id} className="text-sm text-zinc-200">
                  <td className="px-4 py-3">{appointment.client?.name ?? appointment.client_id}</td>
                  <td className="px-4 py-3">{appointment.service?.name ?? appointment.service_id}</td>
                  <td className="px-4 py-3">{formatDate(appointment.date)}</td>
                  <td className="px-4 py-3">{appointment.time}</td>
                  <td className="px-4 py-3">{appointment.vehicle_plate}</td>
                  <td className="px-4 py-3">{formatCurrency(appointment.value)}</td>
                  <td className="px-4 py-3">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      )}
    </Card>
  );
}
