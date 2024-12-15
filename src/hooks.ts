import { useContext } from "react";
import { PetContext } from "./contexts/pet-context-provider";

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("PetContext must be used within a PetContextProvider");
  }

  return context;
}