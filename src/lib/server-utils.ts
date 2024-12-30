import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, Prisma, User } from "@prisma/client";
import prisma from "./db";

export async function checkAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getPetById(petId: Pet["id"]) {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });
    return pet;
  } catch (error) {
    console.log({ message: "Cound not find pet By id" });
  }
}

export async function getPetsByUserId(userId: User["id"]) {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId,
      },
    });
    return pets;
  } catch (error) {
    console.log({ message: "Cound not find pets By user id" });
    return [];
  }
}

export async function createUser(email: string, password: string) {
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword: password,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email already exists." };
      }
    }
  }
  return { message: "Could not create user." };
}
