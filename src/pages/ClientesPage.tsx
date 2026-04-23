import { EntityPage } from '../components/EntityPage';
import { Input } from '../components/Input';
import type { Client, ClientPayload } from '../models/client';
import { clientService } from '../services/clientService';

const emptyPayload: ClientPayload = { name: '', phone: '', email: '', vehicle_plate: '', vehicle_model: '' };

export function ClientesPage() {
  return (
    <EntityPage<Client, ClientPayload>
      title="Clientes"
      columns={[
        { key: 'name', label: 'Nome' },
        { key: 'phone', label: 'Telefone' },
        { key: 'email', label: 'E-mail' },
        { key: 'vehicle_plate', label: 'Placa' },
        { key: 'vehicle_model', label: 'Modelo' },
      ]}
      emptyPayload={emptyPayload}
      load={clientService.findAll}
      create={clientService.create}
      update={clientService.update}
      remove={clientService.remove}
      form={(payload, setPayload) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Nome" value={payload.name} onChange={(e) => setPayload({ ...payload, name: e.target.value })} required />
          <Input label="Telefone" value={payload.phone} onChange={(e) => setPayload({ ...payload, phone: e.target.value })} required />
          <Input label="E-mail" type="email" value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} required />
          <Input label="Placa" value={payload.vehicle_plate} onChange={(e) => setPayload({ ...payload, vehicle_plate: e.target.value })} required />
          <Input label="Modelo" value={payload.vehicle_model} onChange={(e) => setPayload({ ...payload, vehicle_model: e.target.value })} required />
        </div>
      )}
    />
  );
}
