import { Button } from "@/components/ui/button";
import BookTable from "@/features/admin/components/BookTable";
import Link from "next/link";

export default function Books() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-app-primary-admin hover:bg-app-primary-admin/80">
          <Link href="/admin/books/new" className="text-app-light-100">
            Create a New Book
          </Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <BookTable />
      </div>
    </section>
  )
}

