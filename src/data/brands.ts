import type { Brand } from "@/data/types";

/** Brands that products can point at. Add a new brand here, then reference its id from a product. */
export const brands: Brand[] = [
  { id: "davines", name: "Davines", siteUrl: "https://us.davines.com" },
  { id: "olaplex", name: "Olaplex", siteUrl: "https://olaplex.com" },
  { id: "moroccanoil", name: "Moroccanoil", siteUrl: "https://www.moroccanoil.com" },
  { id: "k18", name: "K18", siteUrl: "https://www.k18hair.com" },
  { id: "ghd", name: "ghd", siteUrl: "https://www.ghdhair.com" },
  {
    id: "christophe-robin",
    name: "Christophe Robin",
    siteUrl: "https://www.christophe-robin.com",
  },
  { id: "kerastase", name: "Kérastase", siteUrl: "https://www.kerastase.com" },
];
