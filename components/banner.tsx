import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="relative h-[90vh] min-h-[650px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=80"
        alt="Tropical beach with turquoise water and palm trees"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/80">
          Discover Your Next Adventure
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Explore the World with Wanderlust
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-lg text-white/90 md:text-xl">
          Uncover breathtaking destinations, curated tours, and unforgettable
          experiences tailored just for you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Start Exploring
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            View Popular Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
