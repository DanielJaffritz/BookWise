"use client"
import { cn } from "@/lib/utils"
import BookCoverSvg from "./BookCoverSvg"
import { Image } from "@imagekit/next"
import config from "@/lib/config"

export default function BookCover({ className, variant = "regular", coverColor = "#012B48", coverUrl = "https://placehold.co/400x600.png" }: BookCoverProps) {
  const variants: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
  }
  return (
    <div className={cn('relative transition-all duration-300', variants[variant], className)}>

      <BookCoverSvg coverColor={coverColor} />
      <div className="absolute z-10" style={{ left: "12%", width: "87.5%", height: "88%" }}>
        <Image loading="lazy" urlEndpoint={config.env.imagekit.urlEndpoint} src={coverUrl} alt="Book cover" fill className="rounded-sm object-fill" />
      </div>
    </div>
  )
}

