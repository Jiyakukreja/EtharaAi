import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/ui/toast';

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const signupSchema = baseSchema.extend({
  name: z.string().min(2),
  role: z.enum(['admin', 'member'])
});

export function LoginForm({ onToggleMode }: { onToggleMode: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore(state => state.login);
  const loading = useAuthStore(state => state.loading);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof baseSchema>>({ resolver: zodResolver(baseSchema), defaultValues: { email: '', password: '' } });

  async function onSubmit(values: z.infer<typeof baseSchema>) {
    try {
      await login(values.email, values.password);
      toast({ title: 'Welcome back', description: 'You are now signed in.' });
    } catch (error) {
      toast({ title: 'Login failed', description: error instanceof Error ? error.message : 'Please try again.' });
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-fg/60">Access projects, tasks, and analytics with a secure session.</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Email</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/45" />
            <Input className="pl-11" placeholder="you@company.com" {...form.register('email')} />
          </div>
          {form.formState.errors.email ? <p className="text-xs text-danger">{form.formState.errors.email.message}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/45" />
            <Input className="pl-11 pr-11" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...form.register('password')} />
            <button type="button" onClick={() => setShowPassword(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg/45">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.password ? <p className="text-xs text-danger">{form.formState.errors.password.message}</p> : null}
        </label>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-fg/60">
        New here?{' '}
        <button onClick={onToggleMode} className="font-medium text-primary hover:underline">
          Create an account
        </button>
      </p>
    </Card>
  );
}

export function SignupForm({ onToggleMode }: { onToggleMode: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const signup = useAuthStore(state => state.signup);
  const loading = useAuthStore(state => state.loading);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', role: 'member' }
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    try {
      await signup(values);
      toast({ title: 'Account created', description: 'Your workspace is ready.' });
    } catch (error) {
      toast({ title: 'Signup failed', description: error instanceof Error ? error.message : 'Please try again.' });
    }
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-fg/60">Start your team workspace in under a minute.</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Name</span>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/45" />
            <Input className="pl-11" placeholder="Ava Carter" {...form.register('name')} />
          </div>
          {form.formState.errors.name ? <p className="text-xs text-danger">{form.formState.errors.name.message}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Email</span>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/45" />
            <Input className="pl-11" placeholder="you@company.com" {...form.register('email')} />
          </div>
          {form.formState.errors.email ? <p className="text-xs text-danger">{form.formState.errors.email.message}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/45" />
            <Input className="pl-11 pr-11" type={showPassword ? 'text' : 'password'} placeholder="Create a password" {...form.register('password')} />
            <button type="button" onClick={() => setShowPassword(value => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-fg/45">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.password ? <p className="text-xs text-danger">{form.formState.errors.password.message}</p> : null}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Role</span>
          <select className="flex h-11 w-full rounded-2xl border border-border bg-card/75 px-4 text-sm outline-none" {...form.register('role')}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-fg/60">
        Already have access?{' '}
        <button onClick={onToggleMode} className="font-medium text-primary hover:underline">
          Sign in
        </button>
      </p>
    </Card>
  );
}
