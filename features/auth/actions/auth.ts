"use server"

import { prisma } from "@/lib/prisma";
import { authCredentials } from "../types/types";
import { hash } from "bcryptjs";
import { signIn } from "@/lib/auth";

export const signInWithCredentials = async (params: Pick<authCredentials, "email" | "password">) => {
  const { email, password } = params;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error }
    }
    return { success: true }
  } catch (error) {
    console.log(error, "Sign in error")
    return { success: false, error: "sign in error" }
  }
}

export async function signUp(params: authCredentials) {
  const { fullName, email, universityId, password, universityCard } = params;

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { success: false, error: "User already exists" }
  }
  const hashedPassword = await hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        fullName,
        email,
        universityId,
        password: hashedPassword,
        universityCard
      }
    });
    await signInWithCredentials({ email, password })
    return { success: true }
  } catch (error) {
    console.log(error, "Signup error")
    return { success: false, error: "Signup error" }
  }

}

