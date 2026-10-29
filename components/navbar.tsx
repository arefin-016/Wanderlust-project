"use client";
import { FaSignOutAlt } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Link from "next/link";
import { Divide, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSyncExternalStore } from "react";
import { Button } from "./ui/button";


const Links = [
  { name: "Home", href: "/" },
  { name: "Destination", href: "/all-destinations" },{ name: "Add Destination", href: "/add-destination" },
  { name: "My Bookings", href: "/my-bookings" },
  { name: "Admin", href: "/admin" },
];

interface NavbarProps {
  /** overlay: transparent bar for hero pages. solid: white bar for content pages. Omit to auto-select by route. */
  variant?: "overlay" | "solid";
}

const subscribe = () => () => {};

export function Navbar({ variant }: NavbarProps = {}) {
  const routerPathname = usePathname();
  // After hydration, prefer the real URL so the active link matches even
  // when a route renders at another path (server snapshot avoids mismatch).
  const clientPathname = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => routerPathname
  );
  // Home has a full-bleed hero banner; every other route sits on white.
  const solid = variant ? variant === "solid" : clientPathname !== "/";

  const currentPath = clientPathname;

  const linkClass = (href: string) =>
    cn(
      "relative pb-1 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-200",
      solid
        ? cn(
            "after:bg-sky-600",
            currentPath === href
              ? "text-sky-600 after:scale-x-100"
              : "text-black/80 hover:text-black after:scale-x-0"
          )
        : cn(
            "after:bg-white",
            currentPath === href
              ? "text-white after:scale-x-100"
              : "text-white/90 hover:text-white after:scale-x-0"
          )
    );
	const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } =authClient.useSession()
	const user=session?.user
console.log(user)
const handleSignOut=()=>{
	authClient.signOut()
}
  return (
    <header
      className={cn(
        "left-0 top-0 z-50 w-full",
        solid
          ? "sticky border-b border-gray-200 bg-white"
          : "absolute"
      )}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className={cn(
            "text-2xl font-bold tracking-tight",
            solid ? "text-sky-600" : "text-white"
          )}
        >
          Wanderlust
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {Links.map((link) => (
            <Link key={link.name} href={link.href} className={linkClass(link.href)}>
              {link.name}
            </Link>
          ))}
        </div>


<div className="flex items-center gap-4">

{user?<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
   <Avatar>
  <AvatarImage src={user?.image as string} />
  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
</Avatar>

  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>{user?.name}</PopoverTitle>
      <PopoverDescription>{user?.email}</PopoverDescription>
	  <Button onClick={handleSignOut} className={'mt-3'}><FaSignOutAlt /> Sign Out</Button>
    </PopoverHeader>
  </PopoverContent>
</Popover> :<div className="flex items-center gap-4"><Link href="/signIn" className={linkClass("/signin")}>
            Sign In
          </Link>
          <Link href="/signUp" className={linkClass("/signup")}>
            Sign Up
          </Link></div>}




          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              currentPath === "/profile"
                ? solid
                  ? "bg-sky-600 text-white"
                  : "bg-white text-black"
                : solid
                  ? "bg-sky-50 text-sky-600 hover:bg-sky-100"
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
