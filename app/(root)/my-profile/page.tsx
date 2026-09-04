import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export default async function MyProfile() {
  return (
    <>
      <form action={async () => {
        'use server';
        await signOut();
      }}
        className="mb-10"
      >
        <Button type="submit">Logout</Button>
      </form>
    </>
  )
}

