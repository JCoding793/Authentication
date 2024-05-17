import NextAuth , {type DefaultSession} from "next-auth"
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
 import {db} from "@/lib/db";
 import { getTwoFactorConfimrationByUserId } from "@/data/two-factor-confirmation";
import { getUserById } from "@/data/user";
// declare module "@auth/core"{
//   interface Session{
//     user:{
//         role: string
//     } & DefaultSession["user"]
//   }
// }
export  const { handlers , auth , signIn , signOut} = NextAuth({
  pages:{
     signIn : "/auth/login", 
     error: "/auth/error"
  },
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: { emailVerified: new Date()}
      })
    }
  },
  callbacks: {

    // async signIn({user}){
    //   const existingUser = await getUserById(user.id);
      
    //   if(!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
  async signIn({user, account}){
    //Allow Oauth without email verfication
    console.log({
      user, account
    })
    if(account?.provider !== "credentials") return true;
    const existingUser = await getUserById(user.id);
    //Prevent sign in without email verification
    if(!existingUser?.emailVerified) return false;
    //toDo : add 2FA check
    if(existingUser.isTwoFactorEnabled){
     const twoFactorConfirmation = await  getTwoFactorConfimrationByUserId(existingUser.id);
     console.log({twoFactorConfirmation})
      if(!twoFactorConfirmation) return false;
      // return false;
      await db.twoFactorConfimation.delete({
        where: {id: twoFactorConfirmation?.id}
      })
    }

    return true;
  },
   async session({token, session}){
     console.log({sessionToken: token,
      session,
     })
    if(token.sub && session.user){
      session.user.id = token.sub;
    }
    if(token.role && session.user){
      session.user.role = token.role as UserRole;
    }
        return session;
   },
   async jwt({token}){
    if(!token.sub) return token;
    const existingUser = await getUserById(token.sub);

    if(!existingUser) return token;

    token.role = existingUser.role;
    console.log(token);
    return token;
  }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig
})
