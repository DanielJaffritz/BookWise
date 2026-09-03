import "dotenv/config";
import { db } from "./prisma/db";
import config from "./lib/config";
import Book from "./Book.json"

async function main() {
  const runtime = await db.connect({ url: config.env.databaseURL });

  const books = await db.orm.public.Book.createAll(Book)

  console.log(books);

  await runtime.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
