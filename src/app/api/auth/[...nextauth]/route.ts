import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'

import { User } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin"
  },
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your User Name",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma?.user.findUnique({
            where: {
                email: credentials?.username
            }
        })

        if (!user) throw new Error("User name or password is not correct");
        if(!credentials?.password) throw new Error("Please provide your password");

        const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password);
        if(!isPasswordCorrect) throw new Error("User name or password is not correct");

        if(!user.emailVerified) throw new Error("Please verify your email first!");

        const {password, ...userWithoutPass} = user;
        return userWithoutPass;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST};