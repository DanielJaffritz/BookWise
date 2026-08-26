import { Button } from "@/components/ui/button";
import BookCover from "@/features/root/components/BookCover";
import config from "@/lib/config";
import { Video } from "@imagekit/next";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface Props extends Book {
  createdAt: Date
}

export default function BookInfo({ id, title, author, genre, summary, coverColor, coverUrl, videoUrl, createdAt }: Props) {
  return (
    <section className="w-full flex flex-col">

      <div className="flex flex-row gap-10">
        <div className="bg-app-light-100/80 py-5 rounded-md px-25">
          <BookCover coverUrl={coverUrl} coverColor={coverColor} />
        </div>
        <div className="flex flex-col gap-6 w-1/3">
          <p className="text-gray-400 font-semibold">
            Created at: <span className="text-gray-600 font-semibold">{format(createdAt.toDateString(), "MM/dd/yyyy")}</span>
          </p>
          <h1 className="text-4xl font-bold">
            {title}
          </h1>
          <p className="font-bold text-2xl text-gray-600">
            by {author}
          </p>
          <p className="text-gray-400">{genre}</p>
          <Button className=" text-lg font-semibold w-full p-7 mt-2 bg-app-primary-admin hover:bg-app-primary-admin/80 cursor-pointer">
            <Link href={`/admin/books/${id}/edit`}>Edit Book</Link>
          </Button>

        </div>

      </div>
      <div className="flex flex-row mt-10 w-full">
        <div className="w-3/5">
          <h3 className="font-semibold">Summary</h3>
          <p className="text-gray-400 mt-5">{summary}</p>
        </div>
        <div className="w-2/5">
          <h3 className="font-semibold">Video</h3>
          <Video
            urlEndpoint={config.env.imagekit.urlEndpoint}
            src={videoUrl}
            controls={true}
            className="rounded-2xl mt-5"
          />
        </div>
      </div>

    </section>
  )
}

