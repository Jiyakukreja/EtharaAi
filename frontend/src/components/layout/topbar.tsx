import { Bell, Search, MoonStar, SunMedium, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/store/authStore';

export function Topbar({ name, role, onMenuClick }: { name?: string; role?: string; onMenuClick?: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const endSession = useAuthStore(state => state.endSession);
  const displayName = name ?? 'Workspace';
  const displayRole = role ?? 'Member';

  async function handleLogout() {
    await endSession();
    navigate('/login', { replace: true });
  }

  return (
    <div className="glass-panel sticky top-4 z-30 mb-6 flex items-center gap-4 rounded-[2rem] px-4 py-3">
      <Button variant="ghost" size="sm" onClick={onMenuClick} className="rounded-2xl lg:hidden">
        <Menu className="h-4 w-4" />
      </Button>
      <div className="hidden flex-1 items-center gap-3 rounded-2xl bg-muted/60 px-4 py-2 md:flex">
        <Search className="h-4 w-4 text-fg/45" />
        <Input className="h-9 border-0 bg-transparent px-0 focus:ring-0" placeholder="Search projects, tasks, members..." />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-2xl">
          {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="sm" className="relative rounded-2xl">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 rounded-2xl">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
        <div className="flex items-center gap-3 rounded-2xl bg-muted/60 px-3 py-2">
          <Avatar name={displayName} />
          <div className="hidden sm:block">
            <div className="text-sm font-medium">{displayName}</div>
            <div className="text-xs text-fg/60 capitalize">{displayRole}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
