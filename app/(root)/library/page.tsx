import BookList from "@/features/root/components/BookList";
import { db } from "@/prisma/db";


export default async function Library(){
    const result = await db.orm.public.Book.all() as Book[]
    if(!result) return
    return (
    <BookList
        title="All Books"
        books={result}
        containerClassName="mt-28"
      />
    )
}