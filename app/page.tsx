import { Banner } from "@/components/banner";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";

export default function Home() {
  return (
    <main>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
