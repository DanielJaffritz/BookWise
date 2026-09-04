import { db } from "@/prisma/db"

export default async function Count() {
  const booksCount = await db.orm.public.Book.aggregate((a) => ({ total: a.sum("availableCopies") }))
  const userCount = await db.orm.public.User.aggregate((a) => ({ total: a.count() }))
  const borrowedBooks = await db.orm.public.Borrow.where({
    status: "BORROWED"
  }).aggregate((a) => ({ total: a.count() }))
  return (
    <section className="flex flex-row gap-15 w-full" >
      <div className="admin-count">
        <h2>Borrowed Books</h2>
        <h1>{borrowedBooks.total}</h1>
      </div>
      <div className="admin-count">
        <h2>Total Users</h2>
        <h1>{userCount.total}</h1>
      </div>
      <div className="admin-count">
        <h2>Available Books</h2>
        <h1>{booksCount.total}</h1>
      </div>
    </section>
  )
}

