"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, signUp } from "@/actions";
import AuthFormBtn from "./auth-form-btn";
import { useFormState } from "react-dom";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const [signupError, dispatchSignup] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);
  return (
    <form
      action={type === "login" ? dispatchLogIn : dispatchSignup}
      className="space-y-2"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required max={100} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          max={100}
        />
      </div>

      <AuthFormBtn type={type} />

      {signupError && (
        <p className="text-sm text-red-500 mt-2">{signupError.message}</p>
      )}
      {logInError && (
        <p className="text-sm text-red-500 mt2">{logInError.message}</p>
      )}
    </form>
  );
}
