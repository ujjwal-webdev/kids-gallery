import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const v = { primary: 'bg-primary-600 hover:bg-primary-700 text-white', secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50', danger: 'bg-red-600 hover:bg-red-700 text-white' };
  const s = { sm: 'text-xs py-1.5 px-3', md: 'text-sm py-2 px-4', lg: 'text-base py-2.5 px-6' };
  return <button {...props} className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors ${v[variant]} ${s[size]} ${className}`}>{children}</button>;
}
