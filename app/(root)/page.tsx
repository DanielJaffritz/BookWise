import BookList from "@/features/root/components/BookList";
import BookOverview from "@/features/root/components/BookOverview";
import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";

export default async function Main() {
  const session = await auth()
  const result = await db.orm.public.Book.all() as Book[]
  if (!result) return;
  return (
    <div>
      <BookOverview {...result[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={result.slice(1)}
        containerClassName="mt-28"
      />
    </div>
  )
}
