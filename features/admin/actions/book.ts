"use server";

import { prisma } from "@/lib/prisma";
import { BookParams } from "../types/adminProps";

export async function createBook(params: BookParams) {
  try {
    const newBook = await prisma.book.create({
      data: {
        ...params,
        availableCopies: params.totalCopies
      }
    })
    return {
      success: true,
      data: newBook
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while creating the book",
    }
  }
}

interface Props extends BookParams {
  id: string
}
export async function updateBook(params: Props) {
  try {
    const updateBook = await prisma.book.update({
      where: { id: params.id },
      data: {
        ...params,
        availableCopies: params.totalCopies
      }
    })
    return {
      success: true,
      data: updateBook
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while updating the book"
    }
  }

}
export async function deleteBook(bookId: string | undefined) {
  try {
    const deletion = await prisma.book.delete({
      where: { id: bookId }
    })
  } catch (error) {
    console.log(error)
  }
}
