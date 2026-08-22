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

