import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'h-9 px-3 text-sm',
        size === 'md' && 'h-11 px-4 text-sm',
        size === 'lg' && 'h-12 px-6 text-base',
        variant === 'default' && 'bg-primary text-white shadow-lg shadow-primary/20 hover:translate-y-[-1px] hover:shadow-xl',
        variant === 'secondary' && 'bg-secondary text-white hover:opacity-90',
        variant === 'ghost' && 'bg-transparent hover:bg-muted',
        variant === 'outline' && 'border border-border bg-card/70 hover:bg-muted',
        className
      )}
      {...props}
    />
  );
}
