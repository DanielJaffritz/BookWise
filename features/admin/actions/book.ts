"use server";

import { BookParams } from "../types/adminProps";
import { db } from "@/prisma/db";

export async function createBook(params: BookParams) {
  try {
    const newBook = await db.orm.public.Book.create({
      ...params,
      availableCopies: params.totalCopies
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
    const updateBook = await db.orm.public.Book.where({
      id: params.id
    }).update({
      ...params,
      availableCopies: params.totalCopies
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
    await db.orm.public.Book.where({
      id: bookId
    }).delete()
  } catch (error) {
    console.log(error)
  }
}
