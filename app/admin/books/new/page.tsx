import BookForm from "@/features/admin/components/forms/BookForm";
import Link from "next/link";

export default function New() {
  return (
    <>
      <Link className="back-btn" href="/admin/books">Go back</Link>
      <section>
        <BookForm />
      </section>
    </>
  )
}

