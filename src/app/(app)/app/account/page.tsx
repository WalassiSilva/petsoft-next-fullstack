import H1 from "@/components/h1";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/lib/auth";
import SignOutBtn from "@/components/sign-out-btn";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <div className="block-container min-h-[500px] flex flex-col gap-5 justify-center items-center">
        <p>Logged in as <span className="font-semibold italic">{session.user.email}</span></p>
        <SignOutBtn />
      </div>
    </main>
  );
}
