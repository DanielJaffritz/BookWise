"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { approveUser, DeleteUser, rejectUser } from "../actions/user"
import { deleteBook } from "../actions/book"

interface Props {
  type: "Delete" | "Approve" | "Reject";
  option?: "Book" | "User";
  bookId?: string
  userId?: string
  icon?: string
}
export default function RequestDialog({ type, option, bookId, userId, icon }: Props) {
  const styles = {
    outer: type === 'Approve' ? 'bg-green-50' : 'bg-red-50',
    inner: type === 'Approve' ? 'bg-green-400' : 'bg-red-400',
    button: type === 'Approve' ? "bg-green-400 hover:bg-green-400/80" : "bg-red-400 hover:bg-red-400/80"
  }
  const onSubmit = () => {
    if (type === "Approve") {
      approveUser(userId)

    } else if (type === "Reject") {
      rejectUser(userId)

    } else {
      option === "User" ? DeleteUser(userId) : deleteBook(bookId)
    }
  }
  return (
    <Dialog>
      <DialogTrigger render={<button className="cursor-pointer">
        {type === "Approve" ? <a className="bg-green-50 text-green-400 rounded-md p-2">Approve Account</a>
          : <Image
            alt="action"
            src={icon || ""}
            width={18}
            height={18}
          />}
      </button>} />
      <DialogContent className="items-center flex flex-col p-8">
        <div className={cn("items-center p-2 rounded-full", styles.outer)}>
          <div className={cn("rounded-full p-3", styles.inner)}>
            <Image
              alt="image"
              src={type === "Approve" ? "/icons/admin/tick.svg" : "/icons/admin/info.svg"}
              width={30}
              height={30}
            />

          </div>

        </div>
        <DialogTitle>{type === "Approve" ? "Accept Account Request" : (type === "Reject" ? "Deny Account Request" : `Delete ${option}`)}</DialogTitle>
        <DialogDescription>
          {type === "Approve"
            ? "Approve the student's account and grant access. This will let the student borrow books in the library"
            : (type === "Reject"
              ? "Denying this request will stop the student from borrowing books in the library"
              : `Deleting this ${option} will lost it forever. Make sure before continue`)}
        </DialogDescription>
        <form className="w-full" onSubmit={onSubmit}>
          <Button type="submit" className={cn("w-full p-5 cursor-pointer", styles.button)}>{type === "Approve"
            ? <a>Approve student</a>
            : (type === "Reject"
              ? "Deny Student"
              : `Delete ${option}`)}</Button>
        </form>

      </DialogContent>
    </Dialog>
  )
}

