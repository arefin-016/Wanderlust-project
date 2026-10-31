import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user=session?.user
  if(!user){
	return NextResponse.redirect(new URL('/signIn', request.url))
}
}


export const config = {
  matcher: ["/all-destinations/:path*","/add-destination","/my-bookings",],
};