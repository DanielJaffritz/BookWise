import { sampleBooks } from "@/constants";
import BookList from "@/features/root/components/BookList";
import BookOverview from "@/features/root/components/BookOverview";
import { prisma } from "@/lib/prisma";

export default async function Main() {
  const result = await prisma.user.findMany()
  console.log(result)
  return (
    <div>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </div>
  )
}
