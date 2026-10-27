import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </main>
  );
}
