"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, "id">) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  // STATE
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [pets, setPets] = useState(data);

  // COMPUTED STATE
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  // HANDLERS
  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };
  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };
  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets((prev) => [...prev, { ...newPet, id: Date.now().toString() }]);
  };
  const handleEditPet = (petId: string, updatedPet: Omit<Pet, "id">) => {
    setPets((prev) =>
      prev.map((pet) =>
        pet.id === petId
          ? {
              id: pet.id,
              ...updatedPet,
            }
          : pet
      )
    );
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectedPetId,
        handleCheckoutPet,
        handleEditPet,
        handleAddPet,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
