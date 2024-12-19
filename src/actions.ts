"use server";

import prisma from "@/lib/db";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sleep } from "./lib/utils";

export async function addPet(formData) {
  await sleep();
  try {
    await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      age: parseInt(formData.get("age")),
      imageUrl: formData.get("imageUrl") || "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes"),
    },
  });
  revalidatePath("/app", "layout" )
  } catch (error) {
    return {message: "Something went wrong while adding the pet."}
  }
  
}
