import { User } from "@prisma/client";
import {} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}
