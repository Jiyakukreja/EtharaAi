import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';

export function ProtectedRoute() {
  const hydrated = useAuthStore(state => state.hydrated);
  const user = useAuthStore(state => state.user);
  const hydrate = useAuthStore(state => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <div className="min-h-screen p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
