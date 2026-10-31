"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Eye,
  Loader2,
  Ticket,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface Booking {
  _id: string;
  destinationName: string;
  imageUrl?: string;
  departureDate?: string;
  departureData?: string;
  price?: string | number;
  status?: string;
  bookingId?: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80";

function formatDate(value?: string) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Confirmed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        <CircleCheck className="h-3.5 w-3.5" />
        Confirmed
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
        <Clock className="h-3.5 w-3.5" />
        Pending
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
      {status}
    </span>
  );
}

const MyBookingsCard = ({ data }: { data: Booking | Booking[] }) => {
  const initialBookings = Array.isArray(data)
    ? data
    : data
      ? [data]
      : [];
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const handleCancel = async (booking: Booking) => {
    setCancelingId(booking._id);
    try {
      const res = await fetch(`http://localhost:8000/my-bookings/${booking._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      setBookings((prev) => prev.filter((b) => b._id !== booking._id));
      toast.add({
        type: "success",
        title: "Booking canceled",
        description: `Your booking for ${booking.destinationName} has been canceled.`,
      });
    } catch (err) {
      toast.add({
        type: "error",
        title: "Could not cancel booking",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        priority: "high",
      });
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <main className="flex-1 bg-white">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Manage and view your upcoming travel plans
        </p>

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-muted-foreground">
            You have no bookings yet. Explore destinations to plan your next
            adventure.
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-stretch"
              >
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg sm:h-40 sm:w-64">
                  <Image
                    src={booking.imageUrl || FALLBACK_IMAGE}
                    alt={booking.destinationName}
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {booking.destinationName}
                    </h2>
                    <StatusBadge status={booking.status ?? "Confirmed"} />
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      Departure:{" "}
                      {formatDate(booking.departureDate ?? booking.departureData)}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Ticket className="h-4 w-4" />
                      Booking ID: {booking.bookingId ?? booking._id}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <p className="text-2xl font-bold text-sky-600">
                      ${booking.price}
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="gap-1.5 border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleCancel(booking)}
                        disabled={cancelingId === booking._id}
                      >
                        {cancelingId === booking._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        Cancel
                      </Button>

                      <Button
                        className="gap-1.5 bg-sky-600 text-white hover:bg-sky-700"
                        render={
                          <Link
                            href={`/all-destinations/${booking._id}`}
                          />
                        }
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsCard;
