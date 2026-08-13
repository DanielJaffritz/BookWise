import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import BookList from "@/features/root/components/BookList";
import { signOut } from "@/lib/auth";

export default function MyProfile() {
  return (
    <>
      <form action={async () => {
        'use server';
        await signOut();
      }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
      <BookList title="borrowed books" books={sampleBooks} />
    </>
  )
}

