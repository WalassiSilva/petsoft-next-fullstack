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
  handleSelectedPetId: (id: string) => void
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [pets, setPets] = useState(data);

  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  }
  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectedPetId
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
