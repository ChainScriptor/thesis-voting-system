import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Route matchers για τα endpoints που απαιτούν auth.protect()
const isProtectedPage = createRouteMatcher(["/admin/:path*"]);
const isFilteredAPI = createRouteMatcher(["/api/elections/filtered"]);
const isVoteAPI = createRouteMatcher([
  "/api/vote",
  "/api/vote/status",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedPage(req) || isFilteredAPI(req) || isVoteAPI(req)) {
    await auth.protect(); // διατηρούμε το auth requirement εκεί που χρειάζεται
  }

  // Δεν βάζουμε auth.protect για /api/elections — απλώς περνά από middleware
});

export const config = {
  matcher: [
    "/admin/:path*",                // ✅ προστασία admin UI
    "/api/elections/filtered",      // ✅ προστασία filtered API
    "/api/vote",                    // ✅ προστασία vote POST
    "/api/vote/status",             // ✅ προστασία vote status
    "/api/elections",               // ✅ *μόνο* για να ενεργοποιηθεί το Clerk, όχι για auth.protect
  ],
};
