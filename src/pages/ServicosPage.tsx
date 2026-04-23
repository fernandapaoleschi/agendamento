import { EntityPage } from '../components/EntityPage';
import { Input } from '../components/Input';
import type { ServiceEntity, ServicePayload } from '../models/service';
import { serviceService } from '../services/serviceService';

const emptyPayload: ServicePayload = { name: '', price: 0, duration: 0, description: '', is_active: true };

export function ServicosPage() {
  return (
    <EntityPage<ServiceEntity, ServicePayload>
      title="Serviços"
      columns={[
        { key: 'name', label: 'Nome' },
        { key: 'price', label: 'Preço', render: (item) => `R$ ${item.price}` },
        { key: 'duration', label: 'Duração (min)' },
        { key: 'description', label: 'Descrição' },
        { key: 'is_active', label: 'Ativo', render: (item) => (item.is_active ? 'Sim' : 'Não') },
      ]}
      emptyPayload={emptyPayload}
      load={serviceService.findAll}
      create={serviceService.create}
      update={serviceService.update}
      remove={serviceService.remove}
      form={(payload, setPayload) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Nome" value={payload.name} onChange={(e) => setPayload({ ...payload, name: e.target.value })} required />
          <Input label="Preço" type="number" value={payload.price} onChange={(e) => setPayload({ ...payload, price: Number(e.target.value) })} required />
          <Input label="Duração" type="number" value={payload.duration} onChange={(e) => setPayload({ ...payload, duration: Number(e.target.value) })} required />
          <Input label="Descrição" value={payload.description} onChange={(e) => setPayload({ ...payload, description: e.target.value })} required />
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" checked={payload.is_active} onChange={(e) => setPayload({ ...payload, is_active: e.target.checked })} />
            Ativo
          </label>
        </div>
      )}
    />
  );
}
