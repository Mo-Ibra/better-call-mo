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
  faqs: { question: string; answer: string }[];
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
    schemaType: "SoftwareApplication",
    faqs: [
      {
        question: "Why should I choose Next.js for my website?",
        answer: "Next.js offers superior performance, SEO optimization through server-side rendering, and a great developer experience. It's the industry standard for modern React applications."
      },
      {
        question: "Will my site be SEO-friendly?",
        answer: "Absolutely. Next.js is built with SEO in mind. By serving pre-rendered HTML to search engines, your site will index faster and rank higher than traditional client-side apps."
      },
      {
        question: "Can you migrate my current React app to Next.js?",
        answer: "Yes, I specialize in migrating legacy React applications to the Next.js App Router for better performance and maintainability."
      }
    ]
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
    schemaType: "Service",
    faqs: [
      {
        question: "Will I still be able to use the Shopify admin?",
        answer: "Yes! You keep the powerful Shopify backend for orders and products, while we build a completely custom, faster frontend using Next.js."
      },
      {
        question: "How does this improve conversion rates?",
        answer: "Speed is the #1 factor in e-commerce conversion. By making your store instant and removing the 'clunky' feel of standard themes, customers stay longer and buy more."
      },
      {
        question: "What happens to my current apps?",
        answer: "Most popular Shopify apps have APIs that we can integrate. For others, we can often build superior custom versions that don't slow down your site."
      }
    ]
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
    schemaType: "SoftwareApplication",
    faqs: [
      {
        question: "How fast can we launch an MVP?",
        answer: "Depending on scope, a solid MVP can usually be launched in 3-5 weeks. I focus on the 'Core Value' to get you in front of users as fast as possible."
      },
      {
        question: "Do I own the code?",
        answer: "Yes, 100%. Once the project is complete, the full source code is transferred to you. No vendor lock-in, ever."
      },
      {
        question: "Can we scale this later?",
        answer: "Definitely. I use industry-standard tools like PostgreSQL and Prisma, ensuring your infrastructure can handle millions of users when you're ready to grow."
      }
    ]
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development (iOS & Android)",
    shortDesc: "Build premium mobile experiences using React Native and Flutter for both iOS and Android platforms.",
    fullDesc: "I help businesses reach their customers on any device. Whether it's a high-performance React Native app or a beautiful Flutter interface, I ensure a smooth, native-like experience with a single codebase.",
    benefits: [
      "Cross-platform efficiency with shared code",
      "Native-level performance and feel",
      "Faster time-to-market for both stores",
      "Seamless integration with web backends"
    ],
    features: [
      "Custom UI/UX Design for Mobile",
      "Push Notifications Integration",
      "Offline Mode Capability",
      "App Store & Play Store Deployment"
    ],
    techStack: ["React Native", "Flutter", "Firebase", "TypeScript"],
    ctaText: "Scope Your Mobile App",
    schemaType: "SoftwareApplication",
    faqs: [
      {
        question: "Should I choose React Native or Flutter?",
        answer: "It depends on your project. React Native is great if you already have a React web app, while Flutter is excellent for highly custom, UI-intensive designs. I'll help you pick the right one."
      },
      {
        question: "Can one app work on both iPhone and Android?",
        answer: "Yes! That's the power of the cross-platform tools I use. We write the code once and deploy it to both the Apple App Store and Google Play Store."
      },
      {
        question: "Do you handle the App Store submission process?",
        answer: "Yes, I manage the entire process from development to successful deployment on both stores, including handling certificates and submission requirements."
      }
    ]
  },
  {
    slug: "web-performance-optimization",
    title: "Web Performance & SEO Speed Optimization",
    shortDesc: "Turn your slow website into a high-speed conversion machine that satisfies both users and Google.",
    fullDesc: "A slow website is a business killer. I specialize in deep performance audits and implementations to improve your Core Web Vitals, reduce LCP, and ensure your site is lightning fast across all devices.",
    benefits: [
      "Significant reduction in bounce rates",
      "Higher rankings in Google Search",
      "Improved user satisfaction and trust",
      "Increased conversion and sales"
    ],
    features: [
      "Core Web Vitals Optimization",
      "Advanced Image & Asset Compression",
      "Code Splitting & Lazy Loading",
      "Critical CSS & Font Optimization"
    ],
    techStack: ["Lighthouse", "WebVitals", "Cloudflare", "Next.js"],
    ctaText: "Speed Up My Site",
    schemaType: "Service",
    faqs: [
      {
        question: "Why does my site's speed matter for SEO?",
        answer: "Google uses 'Core Web Vitals' as a ranking factor. Faster sites rank higher, while slow sites are penalized. Speed is directly correlated to search visibility."
      },
      {
        question: "Can any website be optimized?",
        answer: "Most can. Whether you're on WordPress, React, or an older CMS, there are always technical optimizations we can make to squeeze out more performance."
      },
      {
        question: "What is a good performance score?",
        answer: "I aim for 90+ on Lighthouse across all categories (Performance, SEO, Accessibility). A Green score is my standard for every project I optimize."
      }
    ]
  }
];
