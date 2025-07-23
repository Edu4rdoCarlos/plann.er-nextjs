"use client";

import {
  AUTH_REDIRECT,
  isAdminRoute,
  isProtectedRoute,
  isPublicRoute,
} from "@/src/lib/config/routes";
import { useToast } from "@/src/providers/ToastProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/useAuth";

export const useRouteProtection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

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
  }, [pathname, isLoggedIn, isAdmin, router, showToast, isHydrated]);

  return {
    isLoading: isLoading || !isHydrated,
    isAuthorized:
      isPublicRoute(pathname) ||
      (isProtectedRoute(pathname) && isLoggedIn) ||
      (isAdminRoute(pathname) && isLoggedIn && isAdmin),
  };
};
