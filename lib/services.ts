export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  features: string[];
  techStack: string[];
  ctaText: string;
  schemaType: "SoftwareApplication" | "Service";
}

export const services: Service[] = [
  {
    slug: "nextjs-development",
    title: "Expert Next.js Development",
    shortDesc: "Build lightning-fast, SEO-optimized web applications with the world's most powerful React framework.",
    fullDesc: "I specialize in building high-performance web applications using Next.js. From Server-Side Rendering (SSR) to Static Site Generation (SSG), I ensure your app is optimized for both users and search engines.",
    benefits: [
      "Ultra-fast page load speeds",
      "Superior SEO performance out-of-the-box",
      "Scalable and secure architecture",
      "Seamless user experience with smooth transitions"
    ],
    features: [
      "App Router Implementation",
      "Server Actions for dynamic forms",
      "Image & Font Optimization",
      "Edge Middleware for localized experiences"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Vercel"],
    ctaText: "Start Your Next.js Project",
    schemaType: "SoftwareApplication"
  },
  {
    slug: "shopify-to-nextjs",
    title: "Shopify to Headless Next.js Migration",
    shortDesc: "Take full control of your e-commerce experience by moving to a headless architecture.",
    fullDesc: "Don't let Shopify templates limit your growth. I help brands migrate to a Headless Shopify setup using Next.js for a completely custom, lightning-fast storefront.",
    benefits: [
      "Total design freedom",
      "Instant page transitions",
      "Higher conversion rates",
      "Better SEO for product pages"
    ],
    features: [
      "Shopify Storefront API Integration",
      "Custom checkout flows",
      "Advanced product filtering",
      "Omnichannel sync"
    ],
    techStack: ["Shopify", "Next.js", "Tailwind CSS", "Stripe"],
    ctaText: "Upgrade Your Store",
    schemaType: "Service"
  },
  {
    slug: "saas-mvp-development",
    title: "SaaS MVP Development",
    shortDesc: "Turn your idea into a live product in weeks, not months.",
    fullDesc: "I help founders launch their SaaS ideas quickly with a focus on core features that prove value. My stack is optimized for speed of delivery and future scalability.",
    benefits: [
      "Rapid time-to-market",
      "Scalable infrastructure from day one",
      "Focus on core business value",
      "Clean, maintainable codebase"
    ],
    features: [
      "Authentication & User Management",
      "Subscription Billing (Stripe)",
      "Database Schema Design",
      "Real-time Dashboards"
    ],
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    ctaText: "Build Your MVP",
    schemaType: "SoftwareApplication"
  }
];
