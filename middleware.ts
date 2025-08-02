import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Route matchers για τα endpoints που απαιτούν auth.protect()
const isProtectedPage = createRouteMatcher(["/admin/:path*"]);
const isFilteredAPI = createRouteMatcher(["/api/elections/filtered"]);
const isVoteAPI = createRouteMatcher([
  "/api/vote",
  "/api/vote/status",
]);

export default clerkMiddleware(async (auth, req) => {
  // ✅ Περιμένουμε πρώτα το auth() και μετά παίρνουμε το userId
  const authData = await auth();
  const userId = authData.userId;

  if (isProtectedPage(req) || isFilteredAPI(req) || isVoteAPI(req)) {
    if (!userId) {
      return Response.redirect(new URL("/sign-in", req.url));
    }
  }

  // Δεν βάζουμε auth.protect για /api/elections — απλώς περνά από middleware
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/elections",
    "/api/elections/:path*",
    "/api/elections/filtered",
    "/api/vote",
    "/api/vote/status",
    "/api/vote/submit",
  ],
};
