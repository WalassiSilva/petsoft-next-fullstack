"use client";
import React from "react";
import { Button } from "./ui/button";

type PetButtonProps = {
  children: React.ReactNode;
  typeAction: "edit" | "checkout" | "add";
  onClick?: () => void;
};
export default function PetButton({ children, typeAction, onClick }: PetButtonProps) {
  if (typeAction === "add") {
    return <Button size="icon">{children}</Button>;
  }

  if (typeAction === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }
  if (typeAction === "checkout") {
    return <Button variant="secondary" onClick={onClick}>{children}</Button>;
  }
}
