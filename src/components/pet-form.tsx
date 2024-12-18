"use client";

import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type PetButtonProps = {
  typeAction: "edit" | "add";
  onFormSubmit: () => void;
};
export default function PetForm({ typeAction, onFormSubmit }: PetButtonProps) {
  const { handleAddPet, selectedPet, handleEditPet } = usePetContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageurl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: +(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    if(typeAction === "add") {
      handleAddPet(pet);
    } else{
      handleEditPet(selectedPet!.id, pet )
    }

    onFormSubmit();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={typeAction === "edit" ? selectedPet!.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            required
            defaultValue={typeAction === "edit" ? selectedPet!.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageurl">Image Url</Label>
          <Input
            id="imageurl"
            type="text"
            name="imageurl"
            defaultValue={typeAction === "edit" ? selectedPet!.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            required
            defaultValue={typeAction === "edit" ? selectedPet!.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            name="notes"
            required
            defaultValue={typeAction === "edit" ? selectedPet!.notes : ""}
          />
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {typeAction === "add" ? "Add Pet" : "Save"}
      </Button>
    </form>
  );
}
