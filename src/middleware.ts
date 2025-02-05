import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode";

interface CustomJwtPayload {
  role: string;
  isPayment: boolean;
}

export function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.nextUrl.pathname);

  const homeRoute = "/";
  const userDashboard = "/user-dashboard";
  const adminDashboard = "/dashboard";

  const userRoutes = [userDashboard, "/vote-history"];
  const adminRoutes = [
    adminDashboard,
    "/product-management",
    "/user-management",
    "/vote-management",
    "/winner-history",
  ];

  // Extract token from cookies
  const token = request.cookies.get("token")?.value;
  let userInfo: CustomJwtPayload | null = null;

  // If no token is found, redirect to the home page (login page)
  if (!token) {
    console.error("No token found, redirecting to login.");
    if (request.nextUrl.pathname !== homeRoute) {
      return NextResponse.redirect(new URL(homeRoute, request.url));
    }
    return NextResponse.next(); // Allow access to the home page
  }

  try {
    // Decode the token to get user info
    userInfo = jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error("Invalid token, redirecting to login:", error);
    if (request.nextUrl.pathname !== homeRoute) {
      return NextResponse.redirect(new URL(homeRoute, request.url));
    }
    return NextResponse.next(); // Allow access to the home page
  }

  if (!userInfo || !userInfo.role) {
    console.error("Token missing role information, redirecting to login.");
    if (request.nextUrl.pathname !== homeRoute) {
      return NextResponse.redirect(new URL(homeRoute, request.url));
    }
    return NextResponse.next(); // Allow access to the home page
  }

  const currentPath = request.nextUrl.pathname;

  // Redirect logged-in users away from the home page (login page)
  if (currentPath === homeRoute) {
    console.log("Logged-in user/admin trying to access the home page, redirecting...");
    if (userInfo.role === "user") {
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }
    if (userInfo.role === "admin") {
      return NextResponse.redirect(new URL(adminDashboard, request.url));
    }
  }

  // Prevent users from accessing admin routes
  if (
    userInfo.role === "user" &&
    adminRoutes.some((route) => currentPath.startsWith(route))
  ) {
    console.error("User is trying to access admin routes, redirecting.");
    return NextResponse.redirect(new URL(userDashboard, request.url));
  }

  // Prevent admins from accessing user routes
  if (
    userInfo.role === "admin" &&
    userRoutes.some((route) => currentPath.startsWith(route))
  ) {
    console.error("Admin is trying to access user routes, redirecting.");
    return NextResponse.redirect(new URL(adminDashboard, request.url));
  }

  // Allow requests to proceed for valid routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/user-dashboard",
    "/vote-history",
    "/dashboard",
    "/product-management",
    "/user-management",
    "/vote-management",
    "/winner-history",
  ],
};
