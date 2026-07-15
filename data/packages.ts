export interface WeddingPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  featured: boolean;
  includes: string[];
}

export const packages: WeddingPackage[] = [
  {
    id: "pkg-intimate",
    name: "The Intimate",
    tagline: "For elopements & small gatherings",
    price: "$3,200",
    featured: false,
    includes: [
      "Up to 40 guests",
      "Day-of coordination",
      "Vendor recommendations",
      "1 planning consultation",
      "Ceremony timeline design",
    ],
  },
  {
    id: "pkg-classic",
    name: "The Classic",
    tagline: "Our most-booked, full-service plan",
    price: "$7,800",
    featured: true,
    includes: [
      "Up to 150 guests",
      "Full planning, start to finish",
      "In-house design & styling",
      "Unlimited planning consultations",
      "Vendor booking & management",
      "Rehearsal coordination",
    ],
  },
  {
    id: "pkg-grand",
    name: "The Grand",
    tagline: "For multi-day & destination weddings",
    price: "$14,500",
    featured: false,
    includes: [
      "150+ guests, multi-day events",
      "Dedicated lead planner & assistant",
      "Custom floral & decor design",
      "Guest travel coordination",
      "On-site team for full weekend",
      "Welcome party & farewell brunch",
    ],
  },
];
