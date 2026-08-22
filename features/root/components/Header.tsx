import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <form action={async () => {
            'use server';
            await signOut();
          }}
            className="mb-10"
          >
            <button>Logout</button>
          </form>

        </li>
      </ul>
    </header >
  )
}

