import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Route matchers για τα endpoints που απαιτούν auth.protect()
const isProtectedPage = createRouteMatcher(["/admin/:path*"]);
const isFilteredAPI = createRouteMatcher(["/api/elections/filtered"]);
const isVoteAPI = createRouteMatcher([
  "/api/vote",
  "/api/vote/status",
  "/api/vote-new",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedPage(req) || isFilteredAPI(req) || isVoteAPI(req)) {
    auth().protect(); // διατηρούμε το auth requirement εκεί που χρειάζεται
  }

  // Δεν βάζουμε auth.protect για /api/elections — απλώς περνά από middleware
});

export const config = {
  matcher: [
    "/admin/:path*",                // ✅ προστασία admin UI
    "/api/elections",               // ✅ GET/POST ψηφοφοριών
    "/api/elections/:path*",        // ✅ προστέθηκε για dynamic routes (/api/elections/[id])
    "/api/elections/filtered",      // ✅ filtered API
    "/api/vote",                    // ✅ ψήφος
    "/api/vote/status",             // ✅ status ψήφου
    "/api/vote-new",                // ✅ νέο vote endpoint
    // "/api/verify",                  // ✅ verification API - temporarily removed for testing
  ],
};
