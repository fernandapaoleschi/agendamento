import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { authService } from '../services/authService';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const token = response.access_token || response.token;
      if (!token) throw new Error('Token não retornado pela API.');
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch {
      setError('Falha ao autenticar. Verifique suas credenciais e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-panel p-8 shadow-xl shadow-black/40">
        <h1 className="mb-2 text-2xl font-bold text-zinc-100">Bem-vindo</h1>
        <p className="mb-8 text-sm text-zinc-400">Entre para acessar o painel administrativo.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
