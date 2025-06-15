// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Προστατεύουμε το /admin UI
const isProtectedPage = createRouteMatcher(["/admin/:path*"]);

// Προστατεύουμε το filtered API
const isFilteredAPI = createRouteMatcher(["/api/elections/filtered"]);

// Προστατεύουμε τα νέα endpoints για την υποβολή και τον έλεγχο ψήφου
const isVoteAPI = createRouteMatcher([
  "/api/vote",
  "/api/vote/status",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedPage(req) || isFilteredAPI(req) || isVoteAPI(req)) {
    // για admin UI, filtered API και vote API απαιτείται session
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/admin/:path*",               // admin UI
    "/api/elections/filtered",     // το νέο endpoint
    "/api/vote",                   // προσθήκη για POST ψήφου
    "/api/vote/status",            // προσθήκη για GET status ψήφου
  ],
};
