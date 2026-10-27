"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical! Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "Safari in Kenya was a once-in-a-lifetime experience. Seeing the big five up close was surreal and the lodges were top-notch.",
    name: "David Miller",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "The Kyoto cultural tour was beautifully organized. From temples to tea ceremonies, everything felt authentic and deeply memorable.",
    name: "Emily Davis",
    location: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

const VISIBLE = 2;

export function Testimonials() {
  const [start, setStart] = useState(0);

  const prev = () => setStart((s) => (s === 0 ? testimonials.length - VISIBLE : Math.max(0, s - 1)));
  const next = () => setStart((s) => (s >= testimonials.length - VISIBLE ? 0 : s + 1));

  const visible = [
    testimonials[start],
    testimonials[(start + 1) % testimonials.length],
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={prev}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gray-300 bg-transparent text-black hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={next}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-gray-300 bg-transparent text-black hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((t) => (
            <div
              key={t.name}
              className="flex items-start justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-black">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-5 font-medium text-sky-600">— {t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-lg md:h-36 md:w-32">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === start ? "bg-sky-600" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
