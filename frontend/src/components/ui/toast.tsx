import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Toast = { id: string; title: string; description?: string };

const ToastContext = createContext<{ toast: (value: Omit<Toast, 'id'>) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((value: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(current => [...current, { id, ...value }]);
    window.setTimeout(() => setToasts(current => current.filter(item => item.id !== id)), 3200);
  }, []);

  const contextValue = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3 p-4">
        <AnimatePresence>
          {toasts.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              className="glass-panel rounded-2xl border border-border/80 p-4 shadow-glow"
            >
              <div className="text-sm font-semibold">{item.title}</div>
              {item.description ? <p className="mt-1 text-sm text-fg/65">{item.description}</p> : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
