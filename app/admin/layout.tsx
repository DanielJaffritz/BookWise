import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "@/styles/admin.css";
import Sidebar from "@/features/admin/components/sidebar";
import Header from "@/features/admin/components/header";
import { prisma } from "@/lib/prisma";
import { db } from "@/prisma/db";

export default async function layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const isAdmin = await db.orm.public.User.where({ id: session.user.id }).select("role").first()
  if (isAdmin?.role !== "ADMIN") redirect("/")
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  )
}

