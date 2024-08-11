import { NextResponse, NextRequest } from "next/server";

const routerPublic = ["/login", "/register"];

export function middleware(request: NextRequest) {
	const isLogged = request.cookies.get("token");

	if (isLogged) {
		if (routerPublic.includes(request.nextUrl.pathname)) {
			return NextResponse.redirect(new URL("/", request.url));
		}
		NextResponse.next();
	} else NextResponse.redirect(new URL("/login", request.url));
}
