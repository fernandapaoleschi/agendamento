import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  title?: string;
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-panel p-5 shadow-lg shadow-black/20">
      {title ? <h3 className="mb-4 text-lg font-semibold text-zinc-100">{title}</h3> : null}
      {children}
    </section>
  );
}
