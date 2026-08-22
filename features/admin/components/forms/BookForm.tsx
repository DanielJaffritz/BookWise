"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Props } from "../../types/adminProps";
import z from "zod";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "@/components/ColorPicker";
import { createBook } from "../../actions/book";
import { toast } from "@/components/ui/toast";

export default function BookForm({ type, ...book }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    }
  });
  async function onSubmit(values: z.infer<typeof bookSchema>) {

    const result = await createBook(values);
    if (result.success) {
      toast.add({
        title: 'success',
        description: 'Book created successfully'
      })

      router.push(`/admin/books/${result?.data?.id}`)
    } else {
      toast.add({
        title: "Error",
        description: result.message,
      })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name={"title"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book Title</FieldLabel>
            <Input required placeholder="Book Title" {...field} className="book-form-input" />
          </Field>
        )}
      />
      <Controller
        name={"author"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book</FieldLabel>
            <Input required placeholder="Book Author" {...field} className="book-form-input" />
          </Field>
        )}
      />
      <Controller
        name={"genre"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book</FieldLabel>
            <Input required placeholder="Book genre" {...field} className="book-form-input" />
          </Field>
        )}
      />
      <Controller
        name={"rating"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Rating</FieldLabel>
            <Input type="number" min={1} max={5} required placeholder="Book rating" {...field} className="book-form-input" />
          </Field>
        )}
      />
      <Controller
        name={"totalCopies"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Total Copies</FieldLabel>
            <Input type="number" min={1} max={10000} required placeholder="Total copies" {...field} className="book-form-input" />
          </Field>
        )}
      />
      <Controller
        name={"coverUrl"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book Image</FieldLabel>
            <FileUpload type="image" accept="image/*" placeholder="Upload a book cover" folder="books/cover" variant="light" onFileChange={field.onChange} />
          </Field>
        )}
      />
      <Controller
        name={"coverColor"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Primary Color</FieldLabel>
            <ColorPicker onPickerChange={field.onChange} value={field.value} />
          </Field>
        )}
      />
      <Controller
        name={"description"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book Description</FieldLabel>
            <Textarea placeholder="Book description" {...field} rows={10} className="book-form_input" />
          </Field>
        )}
      />
      <Controller
        name={"videoUrl"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book Trailer</FieldLabel>
            <FileUpload type="video" accept="video/*" placeholder="Upload a book trailer" folder="books/cover" variant="light" onFileChange={field.onChange} />
          </Field>
        )}
      />
      <Controller
        name={"summary"}
        control={form.control}
        render={({ field }) => (
          <Field className="text-base font-normal text-app-dark-500">
            <FieldLabel htmlFor={field.name}>Book Description</FieldLabel>
            <Textarea placeholder="Book summary" {...field} rows={5} className="book-form_input" />
          </Field>
        )}
      />
      <Button type="submit" className="book-form_btn text-white">
        Add Book to Library
      </Button>

    </form>
  )
}

