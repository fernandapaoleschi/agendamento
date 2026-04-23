import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AgendamentosPage } from '../pages/AgendamentosPage';
import { ClientesPage } from '../pages/ClientesPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { LogsPage } from '../pages/LogsPage';
import { ProfissionaisPage } from '../pages/ProfissionaisPage';
import { ServicosPage } from '../pages/ServicosPage';
import { UsuariosPage } from '../pages/UsuariosPage';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agendamentos" element={<AgendamentosPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/profissionais" element={<ProfissionaisPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
