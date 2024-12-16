"use client";
import React, { createContext, useState } from "react";

type SearhContextType = {
  children: React.ReactNode;
};
type TSearchContext = {
  searchText: string;
  handleSearchText: (text: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);
export default function SearchContextProvider({ children }: SearhContextType) {
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (text: string) => {
    setSearchText(text);
  };
  return (
    <SearchContext.Provider
      value={{
        searchText,
        handleSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
