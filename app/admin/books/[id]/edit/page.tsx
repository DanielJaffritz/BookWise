import BookForm from "@/features/admin/components/forms/BookForm";
import { db } from "@/prisma/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await db.orm.public.Book.first({id})
  if (!book) redirect("/404")
  const defaultValues = {
    title: book.title,
    description: book.description,
    author: book.author,
    genre: book.genre,
    rating: book.rating,
    totalCopies: book.totalCopies,
    coverUrl: book.coverColor,
    coverColor: book.coverColor,
    videoUrl: book.videoUrl,
    summary: book.summary,
  }
  return (
    <>
      <Link className="back-btn" href="/admin/books">Go back</Link>
      <section>
        <BookForm defaultValues={defaultValues} type="update" id={book.id} />
      </section>
    </>
  )
}

