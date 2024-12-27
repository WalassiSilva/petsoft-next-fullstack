import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "@/actions";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  return (
    <form action={type === "login" ? logIn : signUp} className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <Button>{type === "login" ? "Log In" : "Sign Up"}</Button>
    </form>
  );
}
