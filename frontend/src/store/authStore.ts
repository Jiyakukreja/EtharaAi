import { create } from 'zustand';
import { meRequest, loginRequest, logoutRequest, signupRequest } from '@/services/auth';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  hydrated: boolean;
  setSession: (user: User, token: string) => void;
  logout: () => void;
  endSession: () => Promise<void>;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: { name: string; email: string; password: string; role: 'admin' | 'member' }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  hydrated: false,
  setSession: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  hydrate: async () => {
    if (get().hydrated) return;
    set({ loading: true });
    try {
      if (!localStorage.getItem('token')) {
        set({ hydrated: true, loading: false });
        return;
      }
      const { user } = await meRequest();
      set({ user, hydrated: true, loading: false });
    } catch {
      get().logout();
      set({ hydrated: true, loading: false });
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { user, token } = await loginRequest({ email, password });
      get().setSession(user, token);
    } finally {
      set({ loading: false });
    }
  },
  signup: async payload => {
    set({ loading: true });
    try {
      const { user, token } = await signupRequest(payload);
      get().setSession(user, token);
    } finally {
      set({ loading: false });
    }
  },
  endSession: async () => {
    try {
      await logoutRequest();
    } finally {
      get().logout();
    }
  }
}));
