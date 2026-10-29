"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Loader2,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import EditDestinationsPage from './../../../components/EditDestinationsPage';
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";

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
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDuration(duration: string) {
  if (/day/i.test(duration)) return duration;
  const days = Number(duration);
  if (!duration.trim() || !Number.isFinite(days)) return duration;
  if (days <= 1) return "1 Day";
  return `${days} Days / ${days - 1} Nights`;
}

export default function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [item, setItem] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`http://localhost:8000/all-destinations/${id}`);
        if (res.status === 400 || res.status === 404) {
          if (!cancelled) setNotFound(true);
          return;
        }
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data: Destination = await res.json();
        if (!cancelled) setItem(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setHasError(true);
          toast.add({
            type: "error",
            title: "Could not load destination",
            description:
              err instanceof Error
                ? err.message
                : "Something went wrong. Please try again.",
            priority: "high",
          });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleBookNow = () => {
    if (!item) return;
    const dateInput = document.getElementById(
      "booking-date"
    ) as HTMLInputElement | null;
    toast.add({
      type: "success",
      title: "Booking confirmed",
      description: `${item.destinationName} is booked for ${
        dateInput?.value || item.departureDate || "your selected date"
      }.`,
    });
  };

  return (
    <main className="flex-1 bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/all-destinations"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            {item && (
              <EditDestinationsPage item={item} onSaved={setItem}></EditDestinationsPage>
            )}
            {item && (
              <DeleteDestinationDialog item={item} id={id}></DeleteDestinationDialog>
            )}
          </div>
        </div>

        {/* Loading / error states */}
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        )}

        {!isLoading && (notFound || hasError) && (
          <div className="mt-16 rounded-xl border border-dashed border-gray-300 p-16 text-center">
            <p className="text-lg font-semibold text-black">
              {notFound ? "Destination not found" : "Failed to load destination"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {notFound
                ? "This destination may have been removed, or the link is invalid."
                : "Please try again later."}
            </p>
            <Button
              className="mt-6 bg-sky-600 text-white hover:bg-sky-700"
              onClick={() => router.push("/all-destinations")}
            >
              Back to Destinations
            </Button>
          </div>
        )}

        {!isLoading && !notFound && !hasError && item && (
          <>
            {/* Hero image */}
            <div className="relative mt-6 h-[280px] overflow-hidden rounded-xl md:h-[440px]">
              <img
                src={item.imageUrl || FALLBACK_IMAGE}
                alt={item.destinationName}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-3">
              {/* Left content */}
              <div className="lg:col-span-2">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {item.country}
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-black md:text-4xl">
                  {item.destinationName}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-green-500 text-green-500" />
                    <span className="font-semibold text-black">4.9</span>
                    <span className="text-muted-foreground">(234 reviews)</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {formatDuration(item.duration)}
                  </span>
                </div>

                <section className="mt-8">
                  <h2 className="text-xl font-bold text-black">Overview</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.description ||
                      "A beautiful destination curated by Wanderlust."}
                  </p>
                </section>

                <section className="mt-8">
                  <h2 className="text-xl font-bold text-black">Highlights</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.description ||
                      "A beautiful destination curated by Wanderlust."}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {highlights.map((highlight) => (
                      <p
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {highlight}
                      </p>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right booking card */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="mt-1 text-4xl font-bold text-sky-600">
                    ${item.price}
                  </p>
                  <p className="text-xs text-muted-foreground">per person</p>

                  <input
                    id="booking-date"
                    type="date"
                    defaultValue={item.departureDate}
                    className="mt-5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />

                  <Button
                    className="mt-4 w-full gap-2 bg-sky-600 text-white hover:bg-sky-700"
                    onClick={handleBookNow}
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                    {perks.map((perk) => (
                      <p
                        key={perk}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {perk}
                      </p>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
