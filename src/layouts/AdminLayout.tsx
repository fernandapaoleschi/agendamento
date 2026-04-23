import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/agendamentos', label: 'Agendamentos' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/profissionais', label: 'Profissionais' },
  { to: '/usuarios', label: 'Usuários' },
  { to: '/logs', label: 'Logs' },
];

export function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface text-zinc-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-r border-zinc-800 bg-black/70 p-5">
        <h1 className="mb-8 text-xl font-bold text-accent">Agendamento Admin</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition ${isActive ? 'bg-accent text-black' : 'text-zinc-300 hover:bg-panelSoft'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main>
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-surface/95 px-4 py-4 backdrop-blur lg:px-8">
          <h2 className="text-lg font-semibold">Painel administrativo</h2>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </header>
        <section className="p-4 lg:p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
