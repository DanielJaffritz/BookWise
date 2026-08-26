'use server'

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs"

export async function borrowBook({ userId, bookId }: BorrowBookParams) {

  try {

    console.log("mamin")
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { availableCopies: true }
    })
    if (!book?.availableCopies || book.availableCopies <= 0) return { success: false, error: "No available copies" }
    const dueDate = dayjs().add(7, "day").toDate()
    const record = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        dueDate,
        status: "BORROWED"
      }
    })
    await prisma.book.update({
      where: { id: bookId },
      data: { availableCopies: book.availableCopies - 1 }
    })
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record))
    }
  } catch (error) {
    console.log(error)
    return { success: false, error: error }
  }
}
