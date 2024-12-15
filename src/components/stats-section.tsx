"use client";
import { usePetContext } from "@/hooks";

export default function StatsSection() {
  const { numberOfPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
}
