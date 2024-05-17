"use server";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerficationToken, generateTwoFactorToken } from "@/lib/tokens";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfimrationByUserId } from "@/data/two-factor-confirmation";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);
  console.log(validatedFields);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { success: "Email does not exist !" };
  }

  if (!existingUser?.emailVerified) {
    const verficationToken = await generateVerficationToken(
      existingUser?.email || ""
    );
    await sendVerificationEmail(verficationToken.email, verficationToken.token);
    return { success: "Confirmation email sent!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid Code!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid Code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });
      const existingConfimation = await getTwoFactorConfimrationByUserId(
        existingUser.id
      );
      if (existingConfimation) {
        await db.twoFactorConfimation.delete({
          where: { id: existingConfimation.id },
        });
      }
      await db.twoFactorConfimation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  console.log(values);
  return { success: "Email sent!" };
};
