import AboutTeaser from "@/components/home/AboutTeaser";
import CategoryCards from "@/components/home/CategoryCards";
import Clients from "@/components/home/Clients";
import ContactSection from "@/components/home/ContactSection";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import SelectedWork from "@/components/home/SelectedWork";

// Home page → served at /
// Each section is its own component, so the page reads like the design from top to bottom.
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <SelectedWork />
      <AboutTeaser />
      <Clients />
      <Pricing />
      <ContactSection />
    </>
  );
}
