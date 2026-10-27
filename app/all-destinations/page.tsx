"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, CalendarDays, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";

interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80";

const MAX_ITEMS = 4;

function formatDuration(duration: string) {
  return /day/i.test(duration) ? duration : `${duration} Days`;
}

export default function AllDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("http://localhost:8000/all-destinations");
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data: Destination[] = await res.json();
        if (!cancelled) {
          setDestinations(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setHasError(true);
          toast.add({
            type: "error",
            title: "Could not load destinations",
            description:
              err instanceof Error
                ? err.message
                : "Something went wrong. Please try again.",
            priority: "high",
          });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = destinations.slice(0, MAX_ITEMS);

  return (
    <main className="flex-1 bg-white">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Find your perfect travel experience from our curated collection
        </p>

        <p className="mt-8 text-sm text-muted-foreground">
          {isLoading
            ? "Loading destinations..."
            : `Showing ${visible.length} destinations`}
        </p>

        {isLoading && (
          <div className="mt-10 flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        )}

        {!isLoading && hasError && (
          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-600">
            Failed to load destinations. Please try again later.
          </div>
        )}

        {!isLoading && !hasError && visible.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-muted-foreground">
            No destinations found. Add your first travel package to see it
            here.
          </div>
        )}

        {!isLoading && !hasError && visible.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-48">
                  <img
                    src={item.imageUrl || FALLBACK_IMAGE}
                    alt={item.destinationName}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {item.country}
                  </p>

                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-black">
                      {item.destinationName}
                    </h2>
                    <p className="shrink-0 text-right">
                      <span className="text-lg font-bold text-black">
                        ${item.price}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /Person
                      </span>
                    </p>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {formatDuration(item.duration)}
                  </p>

                  <Link
                    href={`/all-destinations/${item._id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-600 transition-colors hover:text-sky-700"
                  >
                    Book Now
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
