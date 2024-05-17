"use server"

import * as z from "zod";

import { NewPasswordSchema } from "@/schemas";
import { validate } from "uuid";
import { getPasswordResetTokeyByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";

export const newPassword = async(values: z.infer<typeof NewPasswordSchema>, token?: string | null)=>{
    if(!token){
        return {errro: "Missing token!"}
    }
    const validatedFields  = NewPasswordSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invliad fields"}
    }
  const {password} = validatedFields.data;
  const existingToken = await getPasswordResetTokeyByToken(token);
  if(!existingToken){
    return {error: "Invalid token"}
  }
const hasExpired = new Date(existingToken.expries) < new Date();
console.log(hasExpired);
   if(hasExpired){
    return {error: "token has expired"}
   }

   const existingUser = await getUserByEmail(existingToken.email);
   if(!existingUser){
    return {error: "Email doest not exist"}
   }
   const hashedPassowrd = await bcrypt.hash(password , 10);
    
   await db.user.update({
    where:{
        id: existingUser.id,
    },
    data: {password: hashedPassowrd}
   })
   await db.passwordResetToken.delete({
    where: {id: existingToken.id}
   })
   return {success: "Password Updated !"}
}