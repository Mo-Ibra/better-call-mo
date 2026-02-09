export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "James Wilson",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "Working with Mo was a game-changer for our startup. He didn't just build a website; he built a high-performance engine that doubled our lead generation in 3 months.",
    rating: 5,
    // image: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "GreenLife E-commerce",
    content: "Our migration from Shopify to Headless Next.js was seamless. The speed improvement is insane, and our SEO rankings have never been higher.",
    rating: 5,
    // image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    role: "Founder",
    company: "RealEstate Connect",
    content: "Mo is the most reliable developer I've worked with. His attention to detail and understanding of business goals set him apart from the rest.",
    rating: 5,
    // image: "https://i.pravatar.cc/150?u=ahmed"
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "Operations Lead",
    company: "SaaS Launchpad",
    content: "We needed an MVP in 4 weeks, and Mo delivered a production-ready product in 3. His code is clean, and his communication is top-notch.",
    rating: 5,
    // image: "https://i.pravatar.cc/150?u=elena"
  }
];

export const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: 52,
  bestRating: 5,
  worstRating: 1
};
