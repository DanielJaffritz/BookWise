"use client"
import { signInWithCredentials } from "@/features/auth/actions/auth";
import AuthForm from "@/features/auth/components/AuthForm";
import { signInSchema } from "@/lib/validations";

export default function SignIn() {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials} />
  )
}

