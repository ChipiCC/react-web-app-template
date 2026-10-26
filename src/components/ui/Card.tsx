import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-line bg-surface rounded-2xl border shadow-sm', className)}
      {...props}
    />
  );
}
