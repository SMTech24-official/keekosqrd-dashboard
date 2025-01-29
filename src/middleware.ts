import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  role: string;
  isPayment: boolean;
}

export function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/`;

  const userRoutes = ["/user-dashboard", "/vote-history"];
  const adminRoutes = [
    "/dashboard",
    "/product-management",
    "/user-management",
    "/vote-management",
    "/winner-history",
  ];

  const token = request.cookies.get("token")?.value;
  let userInfo: CustomJwtPayload | null = null;

  if (!token) {
    console.error("No token found, redirecting to login.");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  try {
    userInfo = jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  if (!userInfo || !userInfo.role) {
    console.error("Token missing required role information, redirecting.");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  const currentPath = request.nextUrl.pathname;

  // Handle /profile route explicitly
  if (currentPath === "/profile") {
    return NextResponse.next();
  }

  // Redirect based on role and route
  if (
    userInfo.role === "user" &&
    adminRoutes.some((route) => currentPath.startsWith(route))
  ) {
    console.error("User is trying to access admin routes, redirecting.");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  if (
    userInfo.role === "admin" &&
    userRoutes.some((route) => currentPath.startsWith(route))
  ) {
    console.error("Admin is trying to access user routes, redirecting.");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user-dashboard",
    "/vote-history",
    "/dashboard",
    "/product-management",
    "/user-management",
    "/vote-management",
    "/winner-history",
    "/profile",
  ],
};
