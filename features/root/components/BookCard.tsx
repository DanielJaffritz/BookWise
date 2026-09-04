import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BookCard({ id, title, genre, coverColor, coverUrl}: Book) {
  return (
    <li>
      <Link href={`/books/${id}`} >
        <BookCover coverColor={coverColor} coverUrl={coverUrl} />
        <div className={"mt-4 xs:max-w-40 max-w-28"}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>

    </li>
  )
}


