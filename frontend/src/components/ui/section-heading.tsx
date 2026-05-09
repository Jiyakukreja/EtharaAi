import { cn } from '@/utils/cn';

export function SectionHeading({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn('mb-6', className)}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-sm text-fg/65">{description}</p> : null}
    </div>
  );
}
