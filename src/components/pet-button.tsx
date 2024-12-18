"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./pet-form";

type PetButtonProps = {
  children: React.ReactNode;
  typeAction: "edit" | "checkout" | "add";
  onClick?: () => void;
};
export default function PetButton({
  children,
  typeAction,
  onClick,
}: PetButtonProps) {

  const [isFormOpen, setIsFormOpen] = useState(false);

  if (typeAction === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {typeAction === "add" ? (
          <Button size="icon">{children}</Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {typeAction === "add" ? "Add a new Pet" : "Edit Pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm typeAction={typeAction}  onFormSubmit={() => setIsFormOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
