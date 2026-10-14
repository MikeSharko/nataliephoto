// Packages shown in the "Prices & packages" section on the home page
// TODO: fill in real prices and numbers before going live

export type Package = {
  name: string;
  price: string;
  features: string[];
  featured?: boolean; // gets the dark border
};

export const packages: Package[] = [
  {
    name: "Starter",
    price: "$99",
    features: ["Half-day shoot", "10 retouched images", "Delivery in 5 business days"],
  },
  {
    name: "Full day",
    price: "$199",
    features: ["Full-day shoot with styling", "25 retouched images", "Delivery in 7 business days"],
    featured: true,
  },
  {
    name: "Monthly content",
    price: "$299/mo",
    features: ["Ongoing social content", "20 images per month", "Rolling delivery"],
  },
];
