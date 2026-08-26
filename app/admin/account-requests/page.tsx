import UserTable from "@/features/admin/components/UserTable";

export default function Accounts() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <UserTable type="ApproveRequest" />
      </div>
    </section>
  )
}

