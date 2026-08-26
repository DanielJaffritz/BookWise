import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BookCover from "@/features/root/components/BookCover";
import { prisma } from "@/lib/prisma";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns";

export default async function BorrowTable() {
  const borrows = await prisma.borrow.findMany({
    include: { book: true, user: true }
  })
  return (
    <Table>
      <TableHeader className="table-header">
        <TableRow>
          <TableHead>Book</TableHead>
          <TableHead>User Requested</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Borrowed Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Due Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrows.map((item, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="flex flex-row gap-2 items-center font-semibold">
                <BookCover coverUrl={item.book.coverUrl} coverColor={item.book.coverColor} variant="extraSmall" />
                {item.book.title}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-row items-center">
                <Avatar>
                  <AvatarFallback className="bg-amber-100">{getInitials(item.user.fullName || "IN")}</AvatarFallback>
                  <div className="flex flex-col">

                    <p className="font-semibold">{item.user.fullName}</p>
                    <p className="text-gray-400">{item.user.email}</p>
                  </div>

                </Avatar>
              </div>
            </TableCell>
            <TableCell>
              <p className={item.status === "BORROWED"
                ? `bg-purple-50 text-purple-400 rounded-full p-2`
                : (item.returnDate && item.returnDate <= item.dueDate
                  ? 'bg-sky-50 text-sky-400 rounded-full p-2'
                  : 'bg-red-50 text-red-400 roundede-full p-2'
                )}>{item.status.charAt(0) + item.status.slice(1).toLowerCase()}</p>
            </TableCell>
            <TableCell>{format(item.borrowDate, "MMM d yyyy")}</TableCell>
            {item.returnDate ? <TableCell>{format(item.returnDate?.toDateString(), "MMM d yyyy")}</TableCell>
              : <TableCell>still borrowed</TableCell>}
            <TableCell>{format(item.dueDate.toDateString(), "MMM d yyyy")}</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}

