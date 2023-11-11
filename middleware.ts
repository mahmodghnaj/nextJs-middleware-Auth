import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import checkAuth from "@/lib/checkAuth";

const regexPattern = /^(?!\/(api|_next\/(static|image)|favicon\.ico)).*/;

const publicPaths = ["/market"];

const pathsWithoutAuth = ["/login"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!regexPattern.test(pathname)) return NextResponse.next();

  const isAuth = await checkAuth(request);

  // Check if the path requires authentication and the user is not authenticated
  if (![...publicPaths, ...pathsWithoutAuth].includes(pathname) && !isAuth) {
    // Redirect the user to the login page
    const url = new URL(`/login`, request.url);
    return NextResponse.redirect(url);
  }

  // Check if the path doesn't require authentication but the user is authenticated
  if (pathsWithoutAuth.includes(pathname) && isAuth) {
    // Redirect the user to the home page
    const url = new URL(`/`, request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
