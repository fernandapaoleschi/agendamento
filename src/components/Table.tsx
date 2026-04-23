import type { PropsWithChildren } from 'react';

export function Table({ children }: PropsWithChildren) {
  return <div className="overflow-hidden rounded-xl border border-zinc-800">{children}</div>;
}
