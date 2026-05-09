import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastProvider } from '@/components/ui/toast';
import { LandingPage } from '@/pages/landing-page';
import { LoginPage, SignupPage } from '@/pages/auth-pages';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { DashboardPage } from '@/pages/dashboard-page';
import { ProjectsPage } from '@/pages/projects-page';
import { ProjectDetailsPage } from '@/pages/project-details-page';
import { TasksPage } from '@/pages/tasks-page';
import { TeamPage } from '@/pages/team-page';
import { ProfilePage } from '@/pages/profile-page';
import { SettingsPage } from '@/pages/settings-page';
import { AnalyticsPage } from '@/pages/analytics-page';
import { NotFoundPage } from '@/pages/not-found-page';

function DashboardShell() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        <motion.div className="min-h-screen" key={location.pathname}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardShell />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Route>
            </Route>
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </ToastProvider>
  );
}
