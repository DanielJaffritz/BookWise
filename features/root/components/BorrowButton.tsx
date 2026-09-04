"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import Image from "next/image";
import { useState } from "react";
import { borrowBook } from "../actions/book";
interface Props extends BorrowBookParams {
  borrowingEligibility: {
    isEligible: boolean,
    message: string
  }
}

export default function BorrowButton({ bookId, userId, borrowingEligibility }: Props) {
  const { isEligible, message } = borrowingEligibility;
  const [borrowing, setBorrowing] = useState(false)
  const handleBorrow = async () => {
    if (!isEligible) {
      toast.add({
        title: "Error",
        description: message,
      })
    }
    setBorrowing(true)
    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast.add({
          title: "Success",
          description: "book borrowed succesfully"
        })
      } else {
        toast.add({
          title: "Error",
          description: "An error occurred menol"
        })
        console.log(result.error)
      }

    } catch (error) {
      toast.add({
        title: "Error",
        description: "An error occurred while borrowing the book"
      })
    } finally {
      setBorrowing(false);
    }
  }
  return <Button className="book-overview_btn" onClick={handleBorrow} disabled={borrowing}>
    <Image src="/icons/book.svg" alt="book" width={20} height={20} />
    <p className="font-bebas-neue text-xl text-app-dark-100">{borrowing ? "borrowing..." : "borrow book"}</p>
  </Button>
}

