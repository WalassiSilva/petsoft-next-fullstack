"use server";

import prisma from "@/lib/db";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sleep } from "./lib/utils";

export async function addPet(pet) {
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

export async function editPet(petId, updatedPet) {
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
