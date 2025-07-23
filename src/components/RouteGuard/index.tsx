"use client";

import { ReactNode } from "react";
import { useRouteProtection } from "@/src/hooks/useRouteProtection";

interface RouteGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const RouteGuard = ({ children, fallback }: RouteGuardProps) => {
  const { isAuthorized, isLoading } = useRouteProtection();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-zinc-500">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return fallback || (
      <div className="h-screen flex items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard; 