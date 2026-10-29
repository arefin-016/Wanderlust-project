import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-28">
      <Image
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2560&q=80"
        alt="Airplane flying over turquoise ocean"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/20 px-6 py-14 md:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Ready To Start Your Journey?
          </h2>
          <p className="mt-4 text-sm text-white/80 md:text-base">
            Join thousands of travelers who have discovered the world with us
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="gap-3 bg-white px-8 text-black uppercase tracking-wide hover:bg-white/90"
            >
              Book Your Trip Today
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
