import { sampleBooks } from "@/constants";
import BookList from "@/features/root/components/BookList";
import BookOverview from "@/features/root/components/BookOverview";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Main() {
  const session = await auth()
  const result = await prisma.book.findMany() as Book[]
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
