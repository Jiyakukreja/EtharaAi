import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { useState } from 'react';
import { navLinks } from '@/components/layout/sidebar';
import { cn } from '@/utils/cn';
import { LogOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const endSession = useAuthStore(state => state.endSession);

  async function handleMobileLogout() {
    await endSession();
    setMobileOpen(false);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-4 lg:p-6">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(current => !current)} />
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar name={user?.name} role={user?.role} onMenuClick={() => setMobileOpen(true)} />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex-1">
          {children}
        </motion.div>
      </main>

      <div className={cn('fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden', mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')} onClick={() => setMobileOpen(false)}>
        <div className={cn('absolute left-0 top-0 h-full w-[85%] max-w-sm bg-[hsl(var(--background))] p-4 shadow-2xl transition-transform', mobileOpen ? 'translate-x-0' : '-translate-x-full')} onClick={event => event.stopPropagation()}>
          <div className="mb-4 flex items-center justify-between rounded-3xl bg-muted/60 p-3">
            <div>
              <div className="text-sm font-semibold">Ethara AI</div>
              <div className="text-xs text-fg/60">Workspace navigation</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)}><X className="h-4 w-4" /></Button>
          </div>
          <div className="space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-muted', location.pathname === link.to ? 'bg-primary text-white' : 'text-fg/75')}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" onClick={handleMobileLogout} className="mt-4 w-full justify-start gap-3 rounded-2xl px-4 py-3">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
