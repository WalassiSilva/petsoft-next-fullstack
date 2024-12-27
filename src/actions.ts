"use server";

import prisma from "@/lib/db";
import { sleep } from "./lib/utils";
import { revalidatePath } from "next/cache";
import { petFormSchema, petIdSchema } from "./lib/validations";
import { auth, signIn, signOut } from "./lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

//--------------- user actions ------------------//
export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
  redirect("/app/dashboard");
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
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success) return { message: "Invalid pet data." };

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  // Authentcation check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Validation
  const validatedId = petIdSchema.safeParse(petId);
  if (!validatedId.success) return { message: "Invalid pet id." };

  // Authorization check (user owns pet)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedId.data,
    },
    select: {
      userId: true,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found.",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Not authorized.",
    };
  }

  // Database mutation
  try {
    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return { message: "Error while deleting the pet" };
  }
}
