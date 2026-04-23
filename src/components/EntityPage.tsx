import { useEffect, useMemo, useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';
import { Table } from './Table';

interface EntityPageProps<T, P> {
  title: string;
  columns: Array<{ key: keyof T; label: string; render?: (row: T) => string | number | boolean }>;
  emptyPayload: P;
  load: () => Promise<T[]>;
  create: (payload: P) => Promise<unknown>;
  update: (id: string, payload: Partial<P>) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  form: (payload: P, setPayload: (value: P) => void) => React.ReactNode;
}

export function EntityPage<T extends { id: string }, P>({
  title,
  columns,
  emptyPayload,
  load,
  create,
  update,
  remove,
  form,
}: EntityPageProps<T, P>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [payload, setPayload] = useState<P>(emptyPayload);

  const rows = useMemo(() => items, [items]);

  const fetchData = async () => {
    setLoading(true);
    try {
      setItems(await load());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setPayload(emptyPayload);
    setIsModalOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setPayload(item as unknown as P);
    setIsModalOpen(true);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingItem) {
      await update(editingItem.id, payload);
    } else {
      await create(payload);
    }
    setIsModalOpen(false);
    await fetchData();
  };

  return (
    <Card title={title}>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate}>Novo</Button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Carregando...</p>
      ) : (
        <Table>
          <table className="min-w-full divide-y divide-zinc-800 bg-panel">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={String(column.key)} className="px-4 py-3 text-left text-xs uppercase text-zinc-400">
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs uppercase text-zinc-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm text-zinc-200">
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-3">
                      {String(column.render ? column.render(row) : (row[column.key] as string | number | boolean))}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => openEdit(row)}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={async () => { await remove(row.id); await fetchData(); }}>
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      )}

      <Modal title={editingItem ? `Editar ${title}` : `Novo ${title}`} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={onSubmit} className="space-y-4">
          {form(payload, setPayload)}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
