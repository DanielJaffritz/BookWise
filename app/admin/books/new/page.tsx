import BookForm from "@/features/admin/components/forms/BookForm";
import Link from "next/link";

export default function New() {
  const defaultValues = {
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
  return (
    <>
      <Link className="back-btn" href="/admin/books">Go back</Link>
      <section>
        <BookForm defaultValues={defaultValues} type="create" id="" />
      </section>
    </>
  )
}

