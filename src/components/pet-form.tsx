"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import PetFormBtn from "./pet-form-btn";

type PetButtonProps = {
  typeAction: "edit" | "add";
  onFormSubmit: () => void;
};
export default function PetForm({ typeAction, onFormSubmit }: PetButtonProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        onFormSubmit();
        
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          age: parseInt(formData.get("age") as string),
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          notes: formData.get("notes") as string,
        };
        if (typeAction === "add") {
          await handleAddPet(petData);
        } else if (typeAction === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col"
    >
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
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
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

      <PetFormBtn typeAction={typeAction} />
    </form>
  );
}
