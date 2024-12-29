"use server";

import prisma from "@/lib/db";
import { sleep } from "./lib/utils";
import { revalidatePath } from "next/cache";
import { authSchema, petFormSchema, petIdSchema } from "./lib/validations";
import { signIn, signOut } from "./lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth, createUser, getPetById } from "./lib/server-utils";

//--------------- user actions ------------------//
export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return;
  }

  await signIn("credentials", formData);
  redirect("/app/dashboard");
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: unknown) {
  //check if formData is an instance of FormData
  if (!(formData instanceof FormData)) {
    console.log("Invalid form data.");
    return;
  }
  // convert formData to object
  const formDataEntries = Object.fromEntries(formData.entries());
  // validation
  const validatedFormData = authSchema.safeParse(formDataEntries);

  if (!validatedFormData.success) {
    console.log("Invalid form data.");
    return;
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(email, hashedPassword);
  await signIn("credentials", validatedFormData.data);
}

//--------------- pet actions ------------------//
export async function addPet(pet: unknown) {
  await sleep();
  const session = await checkAuth();

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

  // Authentication check
  const session = await checkAuth();

  // Validation
  const validatedPet = petFormSchema.safeParse(updatedPet);
  const validatedId = petIdSchema.safeParse(petId);

  if (!validatedPet.success || !validatedId.success)
    return { message: "Invalide pet data." };

  // Authorization check
  const pet = await getPetById(validatedId.data);

  if (!pet) {
    return { message: "Pet not found." };
  }
  if (pet.userId !== session.user.id) {
    return { message: "Not authorized." };
  }

  // Database mutation
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
  const session = await checkAuth();

  // Validation
  const validatedId = petIdSchema.safeParse(petId);
  if (!validatedId.success) return { message: "Invalid pet id." };

  // Authorization check (user owns pet)
  const pet = await getPetById(validatedId.data);
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
