"use server";
import * as z from "zod"
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerficationToken } from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";
export const register = async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return {error: "Invalid Fields"}
    }
   const {email , password , name} = validatedFields.data;
   const hasedPassword = await bcrypt.hash(password , 10);
  ///******************check current email is exist********************
   const existingUser = await getUserByEmail(email);

   if(existingUser){
    return {error : "Email already in use!"}
   }
    
   await db.user.create({
    data:{
        name, 
        email,
        password: hasedPassword,
    },
   });
   ///**************** ToDo Send Verification token email **************** 
   const verificationToken = await generateVerficationToken(email)
   await sendVerificationEmail(verificationToken.email , verificationToken.token)
//   sendVerificationEmail(
//   (await verificationToken).email,
//   (await verificationToken).token,
//    );
    return {success: "Confirmation email sent !"}
    
}