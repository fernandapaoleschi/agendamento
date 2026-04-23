import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import type { LogEntry } from '../models/log';
import { logService } from '../services/logService';
import { formatDate } from '../utils/format';

export function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    logService.findAll().then(setLogs);
  }, []);

  return (
    <Card title="Logs da API">
      <Table>
        <table className="min-w-full divide-y divide-zinc-800">
          <thead>
            <tr>
              {['Ação', 'Entidade', 'ID Entidade', 'Usuário', 'Data'].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-xs uppercase text-zinc-400">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-sm text-zinc-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3">{log.entity}</td>
                <td className="px-4 py-3">{log.entity_id ?? '-'}</td>
                <td className="px-4 py-3">{log.user_id ?? '-'}</td>
                <td className="px-4 py-3">{formatDate(log.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </Card>
  );
}
