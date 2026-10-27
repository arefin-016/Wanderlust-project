import { ShieldCheck, Map, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#e6f4fb] py-20">
      <div className="container mx-auto px-6">
        <div className="rounded-2xl border border-blue-200/60 bg-white/40 p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              Why Choose Wanderlust
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Your trusted partner for exceptional travel experiences
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <feature.icon className="h-8 w-8 text-sky-600" />
                <h3 className="mt-4 text-lg font-semibold text-black">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
