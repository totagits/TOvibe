import { AppLayout } from "@/components/AppLayout";
import { Outlet } from "react-router-dom";
export function HomePage() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}