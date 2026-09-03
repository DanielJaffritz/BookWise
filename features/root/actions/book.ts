'use server'

import dayjs from "dayjs"
import { db } from "@/prisma/db";
import { format } from "date-fns"

export async function borrowBook({ userId, bookId }: BorrowBookParams) {

  try {

    const book = await db.orm.public.Book.first({
      id: bookId,
    })
    if (!book?.availableCopies || book.availableCopies <= 0) return { success: false, error: "No available copies" }
    const dueDate = format(dayjs().add(7, "day").toDate(), "yyyy-MM-dd")
    const record = await db.orm.public.Borrow.create({
      userId: userId,
      bookId: bookId,
      status: "BORROWED",
      dueDate: String(dueDate)
    })
    await db.orm.public.Book.where({
      id: bookId
    }).update({ availableCopies: book.availableCopies - 1 })
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record))
    }
  } catch (error) {
    console.log(error)
    return { success: false, error: error }
  }
}
interface Props extends BorrowBookParams {
  availableCopies: number
}
export async function returnBook({ userId, bookId, availableCopies }: Props) {
  try {
    const record = await db.orm.public.Borrow.where({
      userId,
      bookId,
    }).update({
      status: "RETURNED"
    })
    await db.orm.public.Book.where({
      id: bookId
    }).update({ availableCopies: availableCopies + 1 })
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record))
    }

  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error
    }
  }
}
