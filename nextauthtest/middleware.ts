import NextAuth from "next-auth";
import authConfig from "@/auth.config";
const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextURL } from "next/dist/server/web/next-url";
export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoutes) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  console.log("Route:", req.nextUrl.pathname);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

///Optionally , don't in voke Middleware on some paths
/*export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}*/
