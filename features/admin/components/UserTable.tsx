
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getInitials } from "@/lib/utils";
import { format } from "date-fns"
import IdDialog from "./IdDialog";
import RequestDialog from "./RequestDialog";

interface Props {
  type: "ApproveRequest" | "AllUsers"
}

export default async function UserTable({ type }: Props) {
  const session = await auth()
  const users = type === "AllUsers"
    ? await prisma.user.findMany({
      where: {
        AND: [
          { role: "USER" },
          { status: "APPROVED" }
        ]
      },
      orderBy: { createdAt: "desc" },
      include: { borrows: true }
    })
    : await prisma.user.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      include: { borrows: true }
    })
  return (
    <Table>
      <TableHeader className="table-header">
        <TableRow className="">
          <TableHead className="text-gray-500">Name</TableHead>

          <TableHead>Date Joined</TableHead>
          {type === "AllUsers" && <TableHead>Role</TableHead>}
          {type === "AllUsers" && <TableHead>Books Borrowed</TableHead>}
          <TableHead>University ID No</TableHead>
          <TableHead>University ID Card</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={i}>
            <TableCell className="flex flex-row items-center gap-2 ">
              <Avatar>
                <AvatarFallback className="bg-amber-100">{getInitials(user.fullName || "IN")}</AvatarFallback>

              </Avatar>
              <div className="flex flex-col">

                <p className="font-semibold">{user.fullName}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </TableCell>
            <TableCell>{format(user.createdAt.toDateString(), "MMM d yyyy")}</TableCell>
            {type === "AllUsers" && <TableCell><p className={user.role === "ADMIN" ? `bg-red-50 text-red-400 rounded-full p-2` : `bg-green-50 text-green-400 rounded-full p-2`}>{user.role.charAt(0) + user.role.slice(1).toLowerCase()}</p></TableCell>}
            {type === "AllUsers" && <TableCell>{user.borrows.length}</TableCell>}
            <TableCell>{user.universityId}</TableCell>
            <TableCell>
              <IdDialog idCard={user.universityCard} />
            </TableCell>
            <TableCell>
              {type === "AllUsers"
                ? <RequestDialog type="Delete" icon="/icons/admin/trash.svg" userId={user.id} option="User" />
                : <div className="flex flex-row items-center gap-3">
                  <RequestDialog type="Approve" userId={user.id} />
                  <RequestDialog type="Reject" userId={user.id} icon="/icons/admin/close.svg" />
                </div>
              }
            </TableCell>


          </TableRow>
        ))}

      </TableBody>
    </Table>
  )
}

