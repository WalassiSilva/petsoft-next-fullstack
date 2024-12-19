import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFormBtn({ typeAction }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {typeAction === "add" ? "Add Pet" : "Save"}
      
    </Button>
  );
}
