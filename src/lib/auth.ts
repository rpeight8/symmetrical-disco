import { NextAuthOptions } from "next-auth";
import db from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

const getGoogleClientSecret = () => {
  let clientSecret: unknown;
  if (process.env.NODE_ENV === "production") {
    clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  } else {
    clientSecret = process.env.GOOGLE_CLIENT_SECRET_DEV || "";
  }

  if (typeof clientSecret !== "string" || clientSecret.length === 0) {
    throw new Error("Google Client Secret is not set");
  }

  return clientSecret;
};

const getGoogleClientId = () => {
  let clientId: unknown;
  if (process.env.NODE_ENV === "production") {
    clientId = process.env.GOOGLE_CLIENT_ID;
  } else {
    clientId = process.env.GOOGLE_CLIENT_ID_DEV;
  }

  if (typeof clientId !== "string" || clientId.length === 0) {
    throw new Error("Google Client ID is not set");
  }

  return clientId;
};

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleClientId(),
      clientSecret: getGoogleClientSecret(),
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.name = token.name;
        session.user.id = token.id;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email ?? undefined,
        },
      });

      if (!dbUser) {
        token.id = user.id;
      }

      return {
        id: dbUser?.id,
        email: dbUser?.email,
        name: dbUser?.name,
      };
    },

    async redirect({}) {
      return "/";
    },
  },
};
