export const ROUTES = {
  PUBLIC: ["/", "/auth"],
  PROTECTED: ["/new", "/trip", "/settings"],
  ADMIN: ["/settings"],
} as const;

export const AUTH_REDIRECT = {
  LOGIN: "/auth",
  DASHBOARD: "/new",
  UNAUTHORIZED: "/auth",
} as const;

export const isPublicRoute = (pathname: string): boolean => {
  return ROUTES.PUBLIC.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  });
};

export const isProtectedRoute = (pathname: string): boolean => {
  return ROUTES.PROTECTED.some((route) => {
    return pathname.startsWith(route);
  });
};

export const isAdminRoute = (pathname: string): boolean => {
  return ROUTES.ADMIN.some((route) => {
    return pathname.startsWith(route);
  });
};
