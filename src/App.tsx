import { useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useAuthStore } from '@/hooks/use-auth';
import { useShallow } from 'zustand/react/shallow';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from "@/pages/DashboardPage";
import { CrmPage } from "@/pages/CrmPage";
import { InboxPage } from "@/pages/InboxPage";
import { AutomationPage } from '@/pages/AutomationPage';
import { PagesAndFunnelsPage } from '@/pages/PagesAndFunnelsPage';
import { SchedulerPage } from '@/pages/SchedulerPage';
import { ReputationPage } from '@/pages/ReputationPage';
import { CoursesPage } from '@/pages/CoursesPage';
import { CourseDetailPage } from '@/pages/CourseDetailPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { PageEditorPage } from '@/pages/PageEditorPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { EcommercePage } from '@/pages/EcommercePage';
import { AffiliatesPage } from '@/pages/AffiliatesPage';
import { AIPage } from '@/pages/AIPage';
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
    }))
  );
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/pages/:pageId/edit",
    element: <ProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [{ index: true, element: <PageEditorPage /> }],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "crm",
            element: <CrmPage />,
          },
          {
            path: "inbox",
            element: <InboxPage />,
          },
          {
            path: "automation",
            element: <AutomationPage />,
          },
          {
            path: "pages",
            element: <PagesAndFunnelsPage />,
          },
          {
            path: "scheduler",
            element: <SchedulerPage />,
          },
          {
            path: "reputation",
            element: <ReputationPage />,
          },
          {
            path: "courses",
            element: <CoursesPage />,
          },
          {
            path: "courses/:courseId",
            element: <CourseDetailPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "ecommerce",
            element: <EcommercePage />,
          },
          {
            path: "affiliates",
            element: <AffiliatesPage />,
          },
          {
            path: "ai",
            element: <AIPage />,
          },
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          }
        ]
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  }
]);
export function App() {
  const { isLoading, fetchContext } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      fetchContext: state.fetchContext,
    }))
  );
  useEffect(() => {
    fetchContext();
  }, [fetchContext]);
  if (isLoading) {
     return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }
  return <RouterProvider router={router} />;
}