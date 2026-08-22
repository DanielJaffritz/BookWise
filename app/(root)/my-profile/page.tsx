import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import BookList from "@/features/root/components/BookList";
import { signOut } from "@/lib/auth";

export default function MyProfile() {
  return (
    <>

      <BookList title="borrowed books" books={sampleBooks} />
    </>
  )
}

