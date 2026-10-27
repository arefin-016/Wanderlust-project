import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export function Banner() {
  return (
    <section className="relative h-[90vh] min-h-[650px] w-full">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=80"
        alt="Tropical beach with turquoise water and palm trees"
        className="absolute inset-0 h-full w-full object-cover"
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

        <div className="mt-12 w-full max-w-5xl rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl px-4 py-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="text-sm font-medium">Destination</p>
                <p className="text-sm text-muted-foreground">Where to go?</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl px-4 py-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">Add dates</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl px-4 py-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="text-sm font-medium">Travelers</p>
                <p className="text-sm text-muted-foreground">Add guests</p>
              </div>
            </div>
            <Button size="lg" className="h-full w-full gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
