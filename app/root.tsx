import { Outlet } from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { DocumentLayout } from "./components/DocumentLayout";
import { ErrorBoundary as RootErrorBoundary } from "./components/ErrorBoundary";

export function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout>{children}</DocumentLayout>;
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
  return <RootErrorBoundary {...props} />;
}
