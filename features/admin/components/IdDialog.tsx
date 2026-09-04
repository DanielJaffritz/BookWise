"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import config from "@/lib/config";
import { Image as IkImage } from "@imagekit/next";
import Image from "next/image";

export default function IdDialog({ idCard }: { idCard: string }) {
  return (
    <Dialog>
      <DialogTrigger render={<button className="cursor-pointer text-blue-400 font-semibold flex flex-row">
        <a>View ID Card</a>
        <Image src="/icons/admin/link.svg"
          alt="d"
          width={18}
          height={10} />
      </button>} />
      <DialogContent className="w-full">
        <IkImage
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Id Card"
          src={idCard}
          width={900}
          height={300}
        />
      </DialogContent>
    </Dialog>
  )
}

