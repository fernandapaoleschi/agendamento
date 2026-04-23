import { useEffect, useMemo, useState } from 'react';
import { Card } from '../components/Card';
import type { Appointment } from '../models/appointment';
import type { Client } from '../models/client';
import { appointmentService } from '../services/appointmentService';
import { clientService } from '../services/clientService';
import { formatCurrency, formatDate } from '../utils/format';

export function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const load = async () => {
      const [appointmentsData, clientsData] = await Promise.all([
        appointmentService.findAll(),
        clientService.findAll(),
      ]);
      setAppointments(appointmentsData);
      setClients(clientsData);
    };

    load();
  }, []);

  const metrics = useMemo(() => ({
    total: appointments.length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    pending: appointments.filter((a) => a.status === 'scheduled').length,
    clients: clients.length,
  }), [appointments, clients]);

  const nextAppointments = [...appointments]
    .sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total de agendamentos"><p className="text-3xl font-bold text-accent">{metrics.total}</p></Card>
        <Card title="Concluídos"><p className="text-3xl font-bold text-accent">{metrics.completed}</p></Card>
        <Card title="Pendentes"><p className="text-3xl font-bold text-accent">{metrics.pending}</p></Card>
        <Card title="Total de clientes"><p className="text-3xl font-bold text-accent">{metrics.clients}</p></Card>
      </div>

      <Card title="Próximos agendamentos">
        <ul className="space-y-3">
          {nextAppointments.map((appointment) => (
            <li key={appointment.id} className="rounded-lg border border-zinc-800 bg-panelSoft p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>{appointment.client?.name ?? appointment.client_id}</strong>
                <span className="text-zinc-400">{formatDate(appointment.date)} {appointment.time}</span>
              </div>
              <p className="text-sm text-zinc-300">
                {appointment.service?.name ?? appointment.service_id} • {appointment.vehicle_plate} • {formatCurrency(appointment.value)}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
