"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth/useAuth";
import {
  isPublicRoute,
  isProtectedRoute,
  isAdminRoute,
  AUTH_REDIRECT,
} from "@/src/config/routes";
import { useToast } from "@/src/providers/ToastProvider";

export const useRouteProtection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (isPublicRoute(pathname)) {
      setIsLoading(false);
      return;
    }

    if (isProtectedRoute(pathname) && !isLoggedIn) {
      setTimeout(() => {
        showToast("Acesso negado. Faça login para continuar.", "error");

        router.push(AUTH_REDIRECT.LOGIN);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (isAdminRoute(pathname) && (!isLoggedIn || !isAdmin)) {
      showToast(
        "Acesso negado. Permissões de administrador necessárias.",
        "error"
      );

      setTimeout(() => {
        router.push(isLoggedIn ? AUTH_REDIRECT.DASHBOARD : AUTH_REDIRECT.LOGIN);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (isLoggedIn && pathname === "/auth") {
      setTimeout(() => {
        router.push(AUTH_REDIRECT.DASHBOARD);
        setIsLoading(false);
      }, 300);
      return;
    }

    setIsLoading(false);
  }, [pathname, isLoggedIn, isAdmin, router, showToast]);

  return {
    isLoading,
    isAuthorized:
      isPublicRoute(pathname) ||
      (isProtectedRoute(pathname) && isLoggedIn) ||
      (isAdminRoute(pathname) && isLoggedIn && isAdmin),
  };
};
