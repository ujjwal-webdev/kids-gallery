import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ padding = 'md', className = '', children, ...props }: CardProps) {
  const paddings = { none: '', sm: 'p-3', md: 'p-6', lg: 'p-8' };
  return (
    <div
      {...props}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
