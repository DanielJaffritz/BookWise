"use client"
import AuthForm from "@/features/auth/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

export default function SignUp() {
  return (
    <AuthForm type="SIGN_UP" schema={signUpSchema} defaultValues={{ email: "", password: "", fullName: "", universityId: 0, universityCard: "" }} onSubmit={() => { }} />
  )
}

