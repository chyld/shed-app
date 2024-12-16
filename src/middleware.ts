import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // Only protect routes that involve creating or editing sheds
  matcher: [
    "/sheds/new",
    "/api/sheds/((?!GET).*)",  // Protect all API routes except GET requests
  ],
}; 