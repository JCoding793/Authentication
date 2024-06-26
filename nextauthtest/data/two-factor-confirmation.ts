import {db} from "@/lib/db";
export const getTwoFactorConfimrationByUserId = async (userId: string)=>{
   try{
    const twoFactorConfirmation = await db.twoFactorConfimation.findUnique({
        where: {userId}
    })
    return twoFactorConfirmation;
   } catch{
    return null; 
   }
}
