import BookOverview from "@/features/root/components/BookOverview";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Book({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;
  const bookDetails = await prisma.book.findUnique({
    where: { id }
  })
  if (!bookDetails) redirect("/404")
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            VIDEO COMPONENT
          </section>
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

