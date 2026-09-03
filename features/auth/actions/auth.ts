"use server"

import { authCredentials } from "../types/types";
import { hash } from "bcryptjs";
import { signIn } from "@/lib/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { db } from "@/prisma/db";
import config from "@/lib/config";

export const signInWithCredentials = async (params: Pick<authCredentials, "email" | "password">) => {
  const { email, password } = params;
  const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) redirect("/too-fast");

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
  const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) redirect("/too-fast");

  const existingUser = await db.orm.public.User.where({
    email
  }).first()
  if (existingUser) {
    return { success: false, error: "User already exists" }
  }

  const hashedPassword = await hash(password, 10)

  try {
    await db.orm.public.User.create({
      fullName, email, universityId, password: hashedPassword, universityCard
    });
    await signInWithCredentials({ email, password })
    return { success: true }
  } catch (error) {
    console.log(error, "Signup error")
    return { success: false, error: "Signup error" }
  }

}

