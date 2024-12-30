"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function AuthFormBtn({ type }: { type: "login" | "signup" }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {type === "login" ? "Log In" : "Sign Up"}
    </Button>
  );
}
