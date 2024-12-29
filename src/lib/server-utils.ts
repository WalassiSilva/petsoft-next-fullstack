import "server-only";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, User } from "@prisma/client";
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
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword: password,
    },
  });
  return user;
}
