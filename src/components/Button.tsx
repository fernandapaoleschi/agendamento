import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const variants = {
  primary: 'bg-accent text-black hover:bg-accentSoft',
  secondary: 'bg-panelSoft text-zinc-100 hover:bg-zinc-700',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
