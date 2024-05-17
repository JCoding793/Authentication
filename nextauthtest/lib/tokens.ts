import {v4 as uuidv4} from "uuid";
import crypto from "crypto"
// import { getVerificationTokenByEmail } from "@/data/verification-token";
import {db} from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokeyByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
// export const generateTwoFactorToken = async (email: string)=>{
//     const token = crypto.randomInt(100_100, 1_000_000).toString();
//     const expires = new Date(new Date().getTime() + 2 * 60 * 1000);
    
//     const existingToken = await getTwoFactorTokenByEmail(email);

//     if(existingToken){
//         await db.twoFactorToken.delete({
//             where: {
//                 id: existingToken.id
//             }
//         })
//     }

//     const twoFactorToken = await db.twoFactorToken.create({
//         data: {
//             email,
//             token,
//             expires,
//         }
//     });
//     return twoFactorToken;
// }
export const generateTwoFactorToken = async (email: string)=>{

      const token = crypto.randomInt(100_000 , 1_000_000).toString();
      const expires =await  new Date(new Date().getTime() + 3600 * 1000);
      const existingToken = await getTwoFactorTokenByEmail(email);

      if(existingToken){
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            }
        });
      }
       
      const twoFactorToken = await db.twoFactorToken.create({
        data:{
            email, 
            token,
            expires
        }
      });

      return twoFactorToken;

}


export const generateVerficationToken = async (email: string)=>{
    const token = uuidv4();
    const expries = new Date(new Date().getTime() + 3600 * 1000);


    const existingToken = await getVerificationTokenByEmail(email);

    if(existingToken){
     await db.verficationToken.delete({
        where:{
            id: existingToken.id,
        }
     });
    }
    const verificationToken = await db.verficationToken.create({
        data:{
            email,
            token,
            expries
        }
    })
    return verificationToken;
}
export const generatePasswordResetToken = async (email: string)=>{
    const token = uuidv4();
    const expries = new Date(new Date().getTime() + 3600 * 1000);


    const existingToken = await getPasswordResetTokeyByEmail(email);

    if(existingToken){
     await db.passwordResetToken.delete({
        where:{
            id: existingToken.id,
        }
     });
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expries
        }
    })
    return passwordResetToken;
}