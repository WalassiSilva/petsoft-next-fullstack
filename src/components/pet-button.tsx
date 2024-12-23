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
import { flushSync } from "react-dom";

type PetButtonProps = {
  children: React.ReactNode;
  typeAction: "edit" | "checkout" | "add";
  disabled?: boolean;
  onClick?: () => void;
};
export default function PetButton({
  children,
  typeAction,
  onClick,
  disabled,
}: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (typeAction === "checkout") {
    return (
      <Button
        disabled={disabled}
        variant="secondary"
        onClick={onClick}
        title="Checkout"
        size="icon"
      >
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {typeAction === "add" ? (
          <Button size="icon" title="Add Pet">
            {children}
          </Button>
        ) : (
          <Button variant="secondary" title={typeAction} size="icon">
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {typeAction === "add" ? "Add a new Pet" : "Edit Pet"}
          </DialogTitle>
        </DialogHeader>
        <PetForm
          typeAction={typeAction}
          onFormSubmit={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
