import { sampleBooks } from "@/constants";
import BookList from "@/features/root/components/BookList";
import BookOverview from "@/features/root/components/BookOverview";

export default function Main() {
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
