import { User } from "@prisma/client";


declare module "next-auth" {
    interface Session{
        user: User
    }
}
// then run npx prisma generate

declare module "next-auth/jwt" {
    interface JWT {
      user: User;
    }
  }
