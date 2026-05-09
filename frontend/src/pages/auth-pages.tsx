import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoginForm, SignupForm } from '@/components/auth/auth-form';
import { useAuthStore } from '@/store/authStore';

export function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;
  if (showSignup) return <SignupPage />;

  return (
    <div className="grid min-h-screen place-items-center px-6 py-10">
      <div className="mb-6 text-center">
        <Link to="/" className="text-sm font-medium text-primary">Back to landing</Link>
      </div>
      <LoginForm onToggleMode={() => navigate('/signup')} />
    </div>
  );
}

export function SignupPage() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="grid min-h-screen place-items-center px-6 py-10">
      <div className="mb-6 text-center">
        <Link to="/" className="text-sm font-medium text-primary">Back to landing</Link>
      </div>
      <SignupForm onToggleMode={() => navigate('/login')} />
    </div>
  );
}
