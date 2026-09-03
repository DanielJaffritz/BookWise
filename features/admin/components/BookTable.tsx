import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BookCover from "@/features/root/components/BookCover";
import { format } from "date-fns"
import Image from "next/image";
import Link from "next/link";
import RequestDialog from "./RequestDialog";
import { db } from "@/prisma/db";

export default async function BookTable({ }) {
  const books = await db.orm.public.Book.orderBy((p) => p.createdAt.desc()).all()
  return (
    <Table>
      <TableHeader className="table-header">
        <TableRow>
          <TableHead>Book Title</TableHead>

          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="flex flex-row items-center gap-2 font-semibold">
              <BookCover coverUrl={item.coverUrl} coverColor={item.coverColor} variant="extraSmall" />

              <Link href={`/admin/books/${item.id}`}>
                {item.title}
              </Link>
            </TableCell>
            <TableCell>{item.author}</TableCell>
            <TableCell>{item.genre}</TableCell>
            <TableCell>{format(item.createdAt, "MMM d yyyy")}</TableCell>
            <TableCell className="">
              <div className="flex flex-row items-center gap-3">
                <Link
                  href={`/admin/books/${item.id}/edit`}>
                  <Image
                    alt="edit"
                    src="/icons/admin/edit.svg"
                    width={18}
                    height={10}
                  />
                </Link>
                <RequestDialog bookId={item.id} type="Delete" option="Book" icon="/icons/admin/trash.svg" />
              </div>
            </TableCell>

          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}

