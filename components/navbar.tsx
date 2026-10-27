import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Destinations", href: "#" },
  { name: "Tours", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

export function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Wanderlust
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden text-white hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Sign In
          </Button>
          <Button className="bg-white text-black hover:bg-white/90">
            Book Now
          </Button>
        </div>
      </nav>
    </header>
  );
}
