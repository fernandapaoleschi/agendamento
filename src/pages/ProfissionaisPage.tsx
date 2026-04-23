import { EntityPage } from '../components/EntityPage';
import { Input } from '../components/Input';
import type { Professional, ProfessionalPayload } from '../models/professional';
import { professionalService } from '../services/professionalService';

const emptyPayload: ProfessionalPayload = { name: '', phone: '', available_days: [] };

export function ProfissionaisPage() {
  return (
    <EntityPage<Professional, ProfessionalPayload>
      title="Profissionais"
      columns={[
        { key: 'name', label: 'Nome' },
        { key: 'phone', label: 'Telefone' },
        { key: 'available_days', label: 'Dias disponíveis', render: (item) => item.available_days.join(', ') },
      ]}
      emptyPayload={emptyPayload}
      load={professionalService.findAll}
      create={professionalService.create}
      update={professionalService.update}
      remove={professionalService.remove}
      form={(payload, setPayload) => (
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Nome" value={payload.name} onChange={(e) => setPayload({ ...payload, name: e.target.value })} required />
          <Input label="Telefone" value={payload.phone} onChange={(e) => setPayload({ ...payload, phone: e.target.value })} required />
          <Input
            label="Dias disponíveis (separados por vírgula)"
            value={payload.available_days.join(', ')}
            onChange={(e) => setPayload({ ...payload, available_days: e.target.value.split(',').map((value) => value.trim()).filter(Boolean) })}
          />
        </div>
      )}
    />
  );
}
