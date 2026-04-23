import type { PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-xl border border-zinc-800 bg-panel p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-zinc-400 hover:text-zinc-100" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
