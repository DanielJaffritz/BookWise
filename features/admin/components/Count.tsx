import { prisma } from "@/lib/prisma"

export default async function Count() {
  const booksCount = await prisma.book.aggregate({
    _sum: {
      availableCopies: true,
    }
  })
  const userCount = await prisma.user.count()
  const borrowedBooks = await prisma.borrow.count({
    where: { status: "BORROWED" }
  })
  return (
    <section className="flex flex-row gap-15 w-full" >
      <div className="admin-count">
        <h2>Borrowed Books</h2>
        <h1>{borrowedBooks}</h1>
      </div>
      <div className="admin-count">
        <h2>Total Users</h2>
        <h1>{userCount}</h1>
      </div>
      <div className="admin-count">
        <h2>Available Books</h2>
        <h1>{booksCount._sum.availableCopies}</h1>
      </div>
    </section>
  )
}

