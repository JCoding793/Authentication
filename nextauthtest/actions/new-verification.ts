import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { error } from "console";


export const newVerification = async (token:string)=>{
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error: "Token does not exist"}
    }
    const hasExpired = new Date(existingToken.expries);
    if(hasExpired){
            return {error: "Email does not exist"}
    }
     await db.user.update({
        where: {id: existingToken.id},
        data:{

            emailVerified: new Date(),
            email: existingToken.email
        }
     });

     await db.verficationToken.delete({
        where:{id: existingToken.id}
     })
}