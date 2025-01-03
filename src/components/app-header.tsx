"use client";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  { label: "Dashboard", path: "/app/dashboard" },
  { label: "Account", path: "/app/account" },
];
export default function AppHeader() {
  const activePath = usePathname();
  console.log(activePath);

  return (
    <header className=" flex items-center justify-between border-b border-white/10 py-2">
      <Logo />

      <nav>
        <ul className="flex gap-4 ">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70 bg-light rounded-sm px-2 py-1 hover:text-white focus:text-white transition",
                  {
                    "bg-light text-white": route.path === activePath,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
