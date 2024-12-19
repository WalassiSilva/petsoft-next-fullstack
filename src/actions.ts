"use server";

import prisma from "@/lib/db";
import { Pet } from "@prisma/client";

export async function addPet(pet:Pet) {
  await prisma.pet.create({data:pet});
}