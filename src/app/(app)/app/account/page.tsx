import H1 from "@/components/h1";
import React from "react";
import SignOutBtn from "@/components/sign-out-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function AccountPage() {
   const session = await checkAuth();
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
