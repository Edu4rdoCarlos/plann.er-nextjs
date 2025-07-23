"use client";

import { ReactNode } from "react";
import { useRouteProtection } from "@/src/hooks/useRouteProtection";

interface RouteProtectionProviderProps {
  children: ReactNode;
}

export const RouteProtectionProvider = ({ children }: RouteProtectionProviderProps) => {
  const { isAuthorized, isLoading } = useRouteProtection();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-zinc-300">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center space-y-6 max-w-md px-6">
          <div className="text-6xl">🔒</div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-zinc-100">
              Acesso Restrito
            </h1>
            <p className="text-zinc-400 text-lg">
              Você não tem permissão para acessar esta página.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-zinc-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
            <span>Redirecionando...</span>
          </div>
        </div>
      </div>
    );
  }

  // Se autorizado, renderiza o conteúdo
  return <>{children}</>;
};

export default RouteProtectionProvider; 