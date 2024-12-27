"use client";
import { logOut } from "@/actions";
import { Button } from "./ui/button";

export default function SignOutBtn() {
  return <Button onClick={ async() => logOut()}>Signout</Button>;
}
