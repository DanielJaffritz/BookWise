import BookInfo from "@/features/admin/components/BookInfo"
import { db } from "@/prisma/db"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function BookID({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bookDetails = await db.orm.public.Book.first({id});

  if (!bookDetails) redirect("/404")
  return (
    <>
      <Link className="back-btn" href="/admin/books">Go back</Link>
      <BookInfo {...bookDetails} />
    </>
  )
}

