import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/anchored-in-8")({
  component: AnchoredIn8Layout,
});

function AnchoredIn8Layout() {
  return <Outlet />;
}
