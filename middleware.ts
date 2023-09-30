import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
 
export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // redirect them to organization selection page
    if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "https://codersyug.vercel.app/"){
      const orgSelection = new URL('https://codersyug.vercel.app/', req.url)
      return NextResponse.redirect(orgSelection)
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};