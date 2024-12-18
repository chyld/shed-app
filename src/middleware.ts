import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  // The following routes are protected
  matcher: ["/sheds/new", "/api/sheds/(POST|PUT|DELETE)"],
};
