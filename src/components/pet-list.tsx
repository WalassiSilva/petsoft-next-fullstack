"use client";
import { usePetContext } from "@/hooks";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type PetListProps = {
  pets: Pet[];
};
export default function PetList() {
  const { pets, selectedPetId, handleSelectedPetId } = usePetContext();
  return (
    <ul className="bg-white border-b border-black/10">
      {pets.map((pet: Pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleSelectedPetId(pet.id)}
            className={cn(
              "flex h-16 w-full items-center gap-3 px-5 cursor-pointer hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition",
              {
                "bg-[#eff1f2]": pet.id === selectedPetId,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="rounded-full object-cover size-[45px]"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
