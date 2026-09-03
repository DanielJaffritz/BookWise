"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import Image from "next/image";
import { useState } from "react";
import { returnBook } from "../actions/book";
interface Props extends BorrowBookParams {
  availableCopies: number
}

export default function ReturnButton({ bookId, userId, availableCopies }: Props) {
  const [returning, setReturning] = useState(false)

  const handleReturn = async () => {
    setReturning(true)
    try {
      const result = await returnBook({ bookId, userId, availableCopies });
      if (result.success) {
        toast.add({
          title: "Success",
          description: "book returned succesfully"
        })
      } else {
        toast.add({
          title: "Error",
          description: "An error occurred while returning the book"
        })
        console.log(result.error)
      }

    } catch (error) {
      toast.add({
        title: "Error",
        description: "An error occurred while returning the book"
      })
    } finally {
      setReturning(false);
    }
  }
  return <Button className="book-overview_btn" onClick={handleReturn} disabled={returning}>
    <Image src="/icons/book.svg" alt="book" width={20} height={20} />
    <p className="font-bebas-neue text-xl text-app-dark-100">{returning ? "returning..." : "return book"}</p>
  </Button>
}

