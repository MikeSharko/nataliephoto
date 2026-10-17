import type { Metadata } from "next";
import AboutTeaser from "@/components/home/AboutTeaser";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "About Natalie, a food, product and portrait photographer in San Diego, and how to book a shoot.",
  alternates: { canonical: "/contact/" },
};

// /contact/ → a little about Natalie, then the enquiry form
export default function ContactPage() {
  return (
    <>
      <AboutTeaser />
      <ContactSection />
    </>
  );
}
