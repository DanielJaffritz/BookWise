import BookOverview from "@/features/root/components/BookOverview";
import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;
  const bookDetails = await db.orm.public.Book.first({
    id
  })
  const borrow = await db.orm.public.Borrow
    .where({ userId: session?.user?.id })
    .where({ bookId: id })
    .where({ status: "BORROWED" }).all()
  const isBorrowed = borrow.length >= 1;
  if (!bookDetails) redirect("/404")
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} isBorrowed={isBorrowed} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-app-light-100">
              {bookDetails.summary.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

