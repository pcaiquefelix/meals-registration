import { NextResponse } from "next/server";

const routes = {
  admin: [
    { path: "/", whenAuthenticated: "next" },
    { path: "/update-meal/", whenAuthenticated: "next" },
    { path: "/register-protein", whenAuthenticated: "next" },
    { path: "/register-meal", whenAuthenticated: "next" },
    { path: "/profile/", whenAuthenticated: "next" },
    { path: "/recorded-meals", whenAuthenticated: "next" },
    { path: "/login", whenAuthenticated: "redirect" },
    { path: "/new-user", whenAuthenticated: "next" },
  ],
  employee: [
    { path: "/", whenAuthenticated: "next" },
    { path: "/update-meal/", whenAuthenticated: "next" },
    { path: "/register-meal", whenAuthenticated: "next" },
    { path: "/profile/", whenAuthenticated: "next" },
    { path: "/recorded-meals", whenAuthenticated: "next" },
    { path: "/register-protein", whenAuthenticated: "redirect" },
    { path: "/login", whenAuthenticated: "redirect" },
    { path: "/new-user", whenAuthenticated: "redirect" },
  ],
};

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const userRole = request.cookies.get("role");
  const token = request.cookies.get("token");
  const currentRoute = userRole
    ? routes[userRole.value].find((route) => {
        if (path === "/") {
          return route.path === path;
        } else if (route.path !== "/") {
          return path.includes(route.path);
        }
      })
    : undefined;

  if (!token && path !== "/login") {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = "/login";

    return NextResponse.redirect(redirectURL);
  } else if (token && currentRoute?.whenAuthenticated === "redirect") {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = "/";

    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
