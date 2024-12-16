import React from "react";
import PetList from "@/components/pet-list";
import PetDetails from "@/components/pet-details";
import SearchForm from "@/components/search-form";
import StatsSection from "@/components/stats-section";
import BrandingSection from "@/components/branding-section";
import { PlusIcon } from "@radix-ui/react-icons";
import PetButton from "@/components/pet-button";

export default async function DashboardPage() {
  
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8 ">
        <BrandingSection />
        <StatsSection />
      </div>

      <div className="grid grid-rows-[45px_300px_500px] md:grid-cols-3 md:grid-rows-[45px_1fr] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1 ">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <div className="block-container relative">
            <PetList />
            <div className="absolute bottom-4 right-4">
              <PetButton typeAction="add" ><PlusIcon className="h-6 w-6" /></PetButton>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 md:row-span-full">
          <div className="block-container">
            <PetDetails />
          </div>
        </div>
      </div>
    </main>
  );
}
