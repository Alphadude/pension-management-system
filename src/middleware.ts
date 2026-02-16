import { routes } from "@/lib/routes";
import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import type { UserRole } from "./types/common";

export default auth((req) => {
  const { pathname, origin, search } = req.nextUrl;
  const user = req.auth?.user;
  const isAuthenticated = !!req.auth;
  const isAuthPage = pathname.startsWith("/auth");

  // Define which routes each role is allowed to access
  const roleAccess: Record<UserRole, string[]> = {
    vendor: ["/vendor-dashboard"],
    contributor: ["/dashboard"],
    parish: ["/parish-dashboard"],
    venerable: ["/venerable-dashboard"],
    finance: ["/finance-dashboard"],
    diocese: ["/diocese-dashboard"],
    pensioner: ["/dashboard"],
  };

  // Define each role’s default redirect (where they should go)
  const roleRedirect: Record<UserRole, string> = {
    vendor: routes.vendorDashboard.root,
    contributor: routes.dashboard.dashboard,
    parish: routes.parishDashboard.root,
    venerable: routes.venerableDashboard.root,
    finance: routes.financeDashboard.root,
    diocese: routes.dioceseDashboard.root,
    pensioner: routes.dashboard.dashboard,
  };

  // If the user is authenticated and trying to access an auth page, redirect them
  if (isAuthenticated && isAuthPage && user?.role) {
    const redirectUrl = roleRedirect[user.role];
    return NextResponse.redirect(new URL(redirectUrl, origin));
  }

  // If the user is not authenticated and trying to access a protected page, redirect them to login
  if (!isAuthenticated && !isAuthPage) {
    const callbackUrl = encodeURIComponent(`${origin}${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`${routes.auth.login}?callbackUrl=${callbackUrl}`, origin),
    ); // Redirect to login
  }

  // Role-based access control
  if (isAuthenticated && user?.role) {
    const allowedPaths = roleAccess[user.role];
    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    if (!isAllowed) {
      return NextResponse.redirect(new URL(roleRedirect[user.role], origin));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
});

// Matcher configuration
export const config = {
  matcher: [
    "/auth/:path*",
    "/vendor-dashboard/:path*",
    "/dashboard/:path*",
    "/parish-dashboard/:path*",
    "/venerable-dashboard/:path*",
    "/finance-dashboard/:path*",
    "/diocese-dashboard/:path*",
    "/pensioner-dashboard/:path*",
  ],
};
