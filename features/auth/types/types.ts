import { FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export interface AuthProps<T extends FieldValues> {
  type: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T> | any;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>;
}
