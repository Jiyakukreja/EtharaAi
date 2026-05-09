import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="text-center">
        <div className="text-7xl font-semibold tracking-tight">404</div>
        <p className="mt-4 text-lg text-fg/65">This page does not exist.</p>
        <Link to="/dashboard" className="mt-6 inline-block"><Button>Return to dashboard</Button></Link>
      </div>
    </div>
  );
}
