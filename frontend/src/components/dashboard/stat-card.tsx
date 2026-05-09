import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils/cn';

export function StatCard({ title, value, delta, accent = 'from-primary to-secondary', icon }: { title: string; value: string; delta: string; accent?: string; icon: ReactNode }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <Card className="relative overflow-hidden border border-white/10 p-5">
        <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80', accent)} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-fg/60">{title}</p>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
            <p className="mt-2 text-sm text-secondary">{delta}</p>
          </div>
          <div className="rounded-2xl bg-muted/70 p-3 text-fg/80">{icon}</div>
        </div>
      </Card>
    </motion.div>
  );
}
