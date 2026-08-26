import { Session } from "next-auth";

export default function Header({ session }: { session: Session }) {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-app-dark-400 text-2xl font-semibold">{session?.user?.name}</h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>


    </header>
  )
}

