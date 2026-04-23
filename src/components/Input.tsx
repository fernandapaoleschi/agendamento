import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-zinc-300">
      {label}
      <input
        className={`rounded-lg border border-zinc-700 bg-panel px-3 py-2 text-zinc-100 outline-none transition focus:border-accent ${className}`}
        {...props}
      />
    </label>
  );
}
