import React from "react";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  typeAction: "add" | "edit";
};
export default function PetFormBtn({ typeAction }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {typeAction === "add" ? "Add Pet" : "Save"}
    </Button>
  );
}
