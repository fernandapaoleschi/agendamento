import { EntityPage } from '../components/EntityPage';
import { Input } from '../components/Input';
import type { User, UserPayload } from '../models/user';
import { userService } from '../services/userService';

const emptyPayload: UserPayload = { email: '', password: '' };

export function UsuariosPage() {
  return (
    <EntityPage<User, UserPayload>
      title="Usuários"
      columns={[{ key: 'email', label: 'E-mail' }]}
      emptyPayload={emptyPayload}
      load={userService.findAll}
      create={userService.create}
      update={userService.update}
      remove={userService.remove}
      form={(payload, setPayload) => (
        <div className="grid gap-3">
          <Input label="E-mail" type="email" value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} required />
          <Input label="Senha" type="password" value={payload.password} onChange={(e) => setPayload({ ...payload, password: e.target.value })} required />
        </div>
      )}
    />
  );
}
