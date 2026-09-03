import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import BookCover from "@/features/root/components/BookCover"
import { getInitials } from "@/lib/utils"
import { db } from "@/prisma/db"
import Link from "next/link"

export default async function Requests() {
  const books = await db.orm.public.Book.limit(6).all()
  const users = await db.orm.public.User
    .where({
      status: "PENDING"
    })
    .orderBy((p) => p.createdAt.desc())
    .limit(6)
    .all()
  const borrows = await db.orm.public.Borrow
    .where({
      status: "BORROWED"
    })
    .include("user", (user) => user.select("id", "fullName", "email"))
    .include("book", (book) => book.select("id", "title", "author", "genre", "coverUrl", "coverColor"))
    .orderBy((p) => p.createdAt.desc())
    .limit(3)
    .all()

  return (
    <section className="flex flex-row justify-between gap-5 w-full">
      <div className="flex flex-col w-full h-190">
        <div className="bg-white p-7 mt-5 rounded-2xl h-full">
          <div className="flex flex-row justify-between mb-5">
            <h1 className="font-bold text-2xl">Borrow Requests</h1>
            <Link className="bg-sky-50 text-app-primary-admin p-2 rounded-md" href="/admin/book-requests">View All</Link>
          </div>
          {borrows.length > 0 ?
            <div className="flex flex-col gap-2 w-full">
              {borrows && borrows.map((item, i) => (
                <div key={i} className="bg-app-light-300 p-3 rounded-2xl flex flex-row gap-2">
                  <BookCover coverUrl={item.book.coverUrl} coverColor={item.book.coverColor} variant="small" />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xl font-semibold">{item.book.title}</p>
                    <p className="text-gray-400">by {item.book.author} | {item.book.genre}</p>
                    <div className="flex flex-row gap-2 items-center">
                      <Avatar>
                        <AvatarFallback className="bg-amber-100">{getInitials(item.user.fullName || "IN")}</AvatarFallback>
                      </Avatar>
                      <p>{item.user.fullName}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            :
            <div className="flex items-center justify-center align-items">
              <h1 className="font-semibold mt-10">There are not borrows at the moment</h1>
            </div>
          }
        </div>
        <div className="bg-white p-7 mt-5 rounded-2xl w-full h-full">
          <div className="flex flex-row justify-between mb-5">
            <h1 className="font-bold text-2xl">Account Requests</h1>
            <Link className="bg-sky-50 text-app-primary-admin p-2 rounded-md" href="/admin/account-requests">View All</Link>
          </div>
          <div className="grid grid-cols-3">
            {users.map((user, i) => (
              <div className="flex flex-col bg-app-light-300 rounded-md items-center justify-center align-items p-5">
                <Avatar className='w-12 h-12'>
                  <AvatarFallback className="bg-amber-100">{getInitials(user.fullName || "IN")}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-xl">{user.fullName}</h3>
                <h4 className="text-gray-400">{user.email}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md p-7 mt-5 w-full">
        <div className="flex flex-row justify-between mb-5">
          <h1 className="font-bold text-2xl">Recently Added Books</h1>
          <Link className="bg-sky-50 text-app-primary-admin rounded-md p-2" href="/admin/books">View All</Link>
        </div>
        <div className="flex flex-col gap-2">
          {books.map((book, i) => (
            <div key={i} className="bg-app-light-300 p-3 rounded-2xl flex flex-row gap-2">
              <BookCover variant="small" coverUrl={book.coverUrl} coverColor={book.coverColor} />
              <div className="text-xl flex-col gap-0.5">
                <p className="text-xl font-semibold">{book.title}</p>
                <p className="text-gray-400">by {book.author} | {book.genre}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section >
  )
}

