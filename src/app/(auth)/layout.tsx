import Logo from "@/components/logo";
import React from "react";

export default function AutoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
