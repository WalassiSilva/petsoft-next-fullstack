"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sleep } from "./lib/utils";
import { PetEssentials } from "./lib/types";
import { Pet } from "@prisma/client";

export async function addPet(pet: PetEssentials) {
  await sleep();
  try {
    await prisma.pet.create({
      data: pet,
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "Error while adding the pet." };
  }
}

export async function editPet(petId: Pet["id"], updatedPet: PetEssentials) {
  await sleep();
  try {
    await prisma.pet.update({
      where: { id: petId },
      data: updatedPet,
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "Error while editing the pet." };
  }
}

export async function deletePet(petId: string) {
  await sleep();
  try {
    await prisma.pet.delete({
      where: { id: petId },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "Error while deleting the pet" };
  }
}
