"use server";

import prisma from "@/lib/db";
import { sleep } from "./lib/utils";
import { revalidatePath } from "next/cache";
import { petFormSchema, petIdSchema } from "./lib/validations";
import { signIn, signOut } from "./lib/auth";
import bcrypt from "bcryptjs";

//--------------- user actions ------------------//
export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  await signIn("credentials", authData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );
  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      hashedPassword,
    },
  });
  await signIn("credentials", formData);
}

//--------------- pet actions ------------------//
export async function addPet(pet: unknown) {
  await sleep();
  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success) return { message: validatedPet.error.message };

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "Error while adding the pet." };
  }
}

export async function editPet(petId: unknown, updatedPet: unknown) {
  await sleep();

  const validatedPet = petFormSchema.safeParse(updatedPet);
  const validatedId = petIdSchema.safeParse(petId);

  if (!validatedPet.success || !validatedId.success)
    return { message: "Invalide pet data." };
  try {
    await prisma.pet.update({
      where: { id: validatedId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return { message: "Error while editing the pet." };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  await sleep();
  const validatedId = petIdSchema.safeParse(petId);
  if (!validatedId.success) return { message: "Invalid pet id." };
  try {
    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "Error while deleting the pet" };
  }
}
