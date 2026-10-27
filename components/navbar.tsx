"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Links = [
  { name: "Home", href: "/" },
  { name: "Destination", href: "/destination" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "Admin", href: "/admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentPath = mounted ? pathname : "/";

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Wanderlust
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {Links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative pb-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-200",
                currentPath === link.href
                  ? "text-white after:scale-x-100"
                  : "text-white/90 hover:text-white after:scale-x-0"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className={cn(
              "relative pb-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-200",
              currentPath === "/signin" ? "text-white after:scale-x-100" : "text-white/90 hover:text-white after:scale-x-0"
            )}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className={cn(
              "relative pb-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-200",
              currentPath === "/signup" ? "text-white after:scale-x-100" : "text-white/90 hover:text-white after:scale-x-0"
            )}
          >
            Sign Up
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              currentPath === "/profile"
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
