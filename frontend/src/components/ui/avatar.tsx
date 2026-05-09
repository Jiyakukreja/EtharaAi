import { cn } from '@/utils/cn';

export function Avatar({ name, imageUrl, className }: { name: string; imageUrl?: string; className?: string }) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn('flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white', className)}>
      {imageUrl ? <img src={imageUrl} alt={name} className="h-full w-full object-cover" /> : initials}
    </div>
  );
}
