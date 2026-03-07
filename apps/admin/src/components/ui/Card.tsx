import { HTMLAttributes } from 'react';

export function Card({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>{children}</div>;
}
