import BookInfo from "@/features/admin/components/BookInfo"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function BookID({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bookDetails = await prisma.book.findUnique({
    where: { id }
  })

  if (!bookDetails) redirect("/404")
  return (
    <>
      <Link className="back-btn" href="/admin/books">Go back</Link>
      <BookInfo {...bookDetails} />
    </>
  )
}

