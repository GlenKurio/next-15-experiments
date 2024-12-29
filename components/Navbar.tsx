import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-gray-600">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <span>Sign out</span>
              </button>
              <Link href={`/user/${session?.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <span>Sign in with GitHub</span>
              </button>
              <form
                action={async (formData) => {
                  "use server";
                  await signIn("resend", formData);
                }}
              >
                <input type="text" name="email" placeholder="Email" />
                <button type="submit">Signin with Resend</button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
