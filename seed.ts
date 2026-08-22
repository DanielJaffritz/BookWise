import { upload } from "@imagekit/next";
import dummyBooks from "./dummybooks.json"
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL!}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function authenticator() {
  try {
    const response = await fetch(`/api/auth/imagekit`)
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`request failed with status ${response.status}: ${errorText}`)
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!
    return { token, expire, signature, publicKey };
  } catch (error: any) {
    throw new Error("unexpected")
  }
}
async function handleUpload(url: string, filename: string) {
  let authParams;
  try {
    authParams = await authenticator();
  } catch (authError) {
    console.error("Failed to authenticate for upload:", authError)
    return;
  }
  const { signature, expire, token, publicKey } = authParams;

  try {
    const uploadResponse = await upload({
      expire,
      token,
      signature,
      publicKey,
      file: url,
      fileName: filename,
    })
    return uploadResponse.filePath;

  } catch (error) {
    console.error(error)
    return ""
  }

}

const seed = async () => {
  console.log("seeding data...")
  try {
    for (const book of dummyBooks) {
      const coverUrl = await handleUpload(book.coverUrl, `${book.title}.jpg`)
      const videoUrl = await handleUpload(book.videoUrl, `${book.title}.mp4`)
      if (!videoUrl) return;
      if (!coverUrl) return;

      const db = await prisma.book.create({
        data: {
          ...book,
          coverUrl,
          videoUrl,
        }
      })
    }
  } catch (error) {
    console.error("Error seeding data: ", error)
  }
}
seed()
