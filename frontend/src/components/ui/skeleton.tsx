import { cn } from '@/utils/cn';

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-2xl bg-muted/70 bg-[length:200%_100%] shadow-inner', className)} />;
}
