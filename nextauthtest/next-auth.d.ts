import NextAuth , {type DefaultSession} from "next-auth";
import { UserRole } from "@prisma/client";
export type ExtendeUser = DefaultSession["user"] & {
    role : UserRole;
}

declare module "next-auth"{
    interface Session {
        user: ExtendeUser;
    }
}

// import { JWT } from "next-auth/jwt";
// declare module "next-auth/jwt"{
//     interface JWT {
//        role?: "ADMIN" | "USER";
//     }
// }