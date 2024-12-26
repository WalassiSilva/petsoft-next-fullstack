import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  return (
    <form className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>

      <Button>{type === "login" ? "Log In" : "Sign Up"}</Button>
    </form>
  );
}
