import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout";

export const Route = createFileRoute("/_shell")({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
