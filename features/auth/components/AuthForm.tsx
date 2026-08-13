"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { AuthProps } from "../types/types";
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { fieldNames, fieldTypes } from "@/constants";
import ImageUpload from "./ImageUpload";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function AuthForm<T extends FieldValues>({ type, schema, defaultValues, onSubmit }: AuthProps<T>) {
  const router = useRouter();
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  });
  const isSignIn = type === "SIGN_IN";
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.add({
        title: "Success",
        description: isSignIn ? "You have succesfully signed in." :
          "You have succesfully signed up",
      })
      router.push("/")
    } else {
      toast.add({
        title: `Error ${isSignIn ? "signing in" : "Signing up"}`,
        description: result.error ?? "An error occurred.",
        type: "destructive"

      })
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-app-light-100">
        {isSignIn ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
        {Object.keys(defaultValues).map((field: any) => (
          <Controller
            key={field}
            name={field as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{fieldNames[field.name as keyof typeof fieldNames]}</FieldLabel>
                {field.name === "universityCard" ? (
                  <ImageUpload onFileChange={field.onChange} />
                ) : (
                  <Input className="form-input bg-app-dark-300" required type={fieldTypes[field.name as keyof typeof fieldTypes]} {...field} id={field.name} aria-invalid={fieldState.invalid} />
                )}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
        <Button className="form-btn" type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>

      </form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}
        <Link className="font-bold text-primary" href={isSignIn ? '/sign-up' : "/sign-in"}>{isSignIn ? "Create an account" : "Sign in"}</Link>
      </p>
    </div>
  )
}

