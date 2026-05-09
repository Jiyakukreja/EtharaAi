import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, ListTodo, Users, LineChart, Settings, Sparkles, Menu, UserCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

export const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/analytics', label: 'Analytics', icon: LineChart },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={cn('glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] flex-col rounded-[2rem] p-3 transition-all duration-300 lg:flex', collapsed ? 'w-24' : 'w-72')}>
      <div className="mb-6 flex items-center justify-between rounded-3xl bg-muted/60 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-semibold">Ethara AI</div>
              <div className="text-xs text-fg/60">Team Task OS</div>
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle} className="rounded-2xl">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-muted',
                isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-fg/75'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
