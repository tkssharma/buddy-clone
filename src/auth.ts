import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {},
  callbacks: {
    signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      // otherwise check if user verified ete ctec //
      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token?.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }
      token.role = existingUser.role;
      token.name = existingUser.name;
      token.email = existingUser.email;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
/*

This is triggered when a user successfully signs in through any provider (e.g., Google, GitHub).
It receives information about the user, account, profile, email, and credentials used for login.
What you can do here: You can perform additional checks or validations on the user before allowing them access. Here, it simply returns true to proceed.


This happens after a successful login or sign-up and before rendering the user's session.
It receives the existing session object (if any), user information, and the JSON Web Token (JWT).
What you can do here: ***** You can add extra data to the session object that will be available throughout the user's session, . Here, it returns the session without modification.

like access levels or specific permissions

This gets called before a JWT is returned to the client after login or sign-up.
It receives the existing JWT token, user information, account details, profile data, and a flag indicating if it's a new user.
What you can do here: You can add custom information to the JWT token that will be sent to the client and accessible on the frontend. Here, it returns the token without modification.
 * 

*/
