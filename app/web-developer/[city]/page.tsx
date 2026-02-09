import { notFound } from "next/navigation";
import { locations } from "@/lib/locations";
import type { Metadata } from "next";
import Link from "next/link";
import ClientContactModal from "@/components/ClientContactModal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ city: string }>;
}

// 1. Generate Static Params for SSG
export async function generateStaticParams() {
  return locations.map((loc) => ({
    city: loc.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) {
    return {
      title: "City Not Found",
    };
  }

  return {
    title: `Expert Web Developer in ${location.city} | Better Call Mo`,
    description: `Looking for a specialized React & Next.js developer in ${location.city}, ${location.country}? I help businesses build high-performance web apps. Get a free consultation.`,
    alternates: {
      canonical: `https://bettercallmo.com/web-developer/${location.slug}`,
    },
    openGraph: {
      title: `Expert Web Developer in ${location.city} | Better Call Mo`,
      description: `Premium Web Development Services for Startups & Businesses in ${location.city}.`,
      url: `https://bettercallmo.com/web-developer/${location.slug}`,
      siteName: "Better Call Mo",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) {
    notFound();
  }

  // 3. JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Better Call Mo",
    image: "https://bettercallmo.com/logo.png",
    url: `https://bettercallmo.com/web-developer/${location.slug}`,
    telephone: "", // Add if available
    priceRange: `${location.currencySymbol}${location.minRate}+`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressCountry: location.country,
    },
    areaServed: {
      "@type": "City",
      name: location.city,
    },
    description: `Professional Web Developer serving clients in ${location.city}, specializing in React, Next.js, and modern web applications.`,
  };

  // 4. FAQ Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Why should I hire a web developer for my business in ${location.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Hiring a specialized developer for the ${location.city} market ensures your website is optimized for local performance, follows regional digital standard, and is managed within the ${location.timezone} timezone for seamless communication.`
        }
      },
      {
        "@type": "Question",
        "name": `What technologies do you use for clients in ${location.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I specialize in high-performance stacks including React, Next.js, TypeScript, and Tailwind CSS to build scalable web applications."
        }
      }
    ]
  };

  return (
    <>
      <Navigation />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-black text-white selection:bg-primary-500/30">

        {/* --- Hero Section --- */}
        <section className="relative py-20 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-black to-black pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary text-sm mb-6">
              <span className="text-xl">{location.flag}</span>
              <span>Serving Clients in {location.city}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Expert Web Developer <br />
              <span className="text-white">in {location.city}</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              I help ambitious businesses in {location.city} and {location.region} build
              world-class web applications tailored to the {location.timezone} working hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* --- Localized Value Prop --- */}
        <section className="py-20 px-6 bg-zinc-950/50">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why hire a developer for {location.city}?</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  As a {location.region}-focused developer, I understand the unique needs of the {location.city} market.
                  Whether you need a high-performance marketing site or a complex SaaS platform, I deliver code that scales and converts.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-start gap-3">
                    <span className="p-1 bg-green-500/10 text-green-400 rounded-md mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white">Local Performance</p>
                      <p className="text-sm text-gray-400 font-normal">Optimized delivery for users in {location.country}.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="p-1 bg-green-500/10 text-green-400 rounded-md mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white">Timezone Friendly</p>
                      <p className="text-sm text-gray-400 font-normal">Aligned with {location.timezone} working hours.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="p-1 bg-green-500/10 text-green-400 rounded-md mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-white">Global Standards</p>
                      <p className="text-sm text-gray-400 font-normal">Security and performance that beats competitors.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl relative shadow-2xl shadow-primary/10">
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">
                Starting from {location.currencySymbol}{location.minRate}
              </div>
              <h3 className="text-xl font-bold mb-4">Core Tech Stack</h3>
              <p className="text-gray-400 mb-6 text-sm">I use the most modern technologies to ensure your project in {location.city} is fast and future-proof.</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Frontend</p>
                  <p className="font-bold text-sm">Next.js / React</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Styling</p>
                  <p className="font-bold text-sm">Tailwind CSS</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Animation</p>
                  <p className="font-bold text-sm">Framer Motion</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Backend</p>
                  <p className="font-bold text-sm">Node.js / SQL</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Trust Stats & Meet Mo --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">Personalized Service for <span className="text-primary">{location.city}</span></h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  I believe that great software starts with a strong partnership. When you hire me, you&apos;re not getting a faceless agency—you&apos;re getting a dedicated developer focused on your success in {location.city}.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-3xl font-bold text-primary mb-1">5+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Years Experience</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-3xl font-bold text-primary mb-1">50+</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Projects Delivered</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-3xl font-bold text-primary mb-1">100%</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Client Satisfaction</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-3xl font-bold text-primary mb-1">24/7</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Aligned with {location.timezone}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
                <div className="relative bg-zinc-900 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/mo-ibra.jpg"
                    alt="Mo - Your Web Developer"
                    className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="p-6">
                    <p className="font-bold text-xl mb-1">Mo Ibra</p>
                    <p className="text-primary text-sm font-medium">Head Web Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Comparison Table --- */}
        <section className="py-24 px-6 bg-zinc-950/50 relative overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">Better Call Mo <span className="text-primary">vs.</span> The Rest</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-6 px-4 text-sm uppercase tracking-widest text-gray-500 font-semibold">Feature</th>
                    <th className="py-6 px-4 text-primary font-bold text-xl">Better Call Mo</th>
                    <th className="py-6 px-4 text-gray-400 font-medium">Generic Agencies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { feature: "Speed & Performance", mo: "optimized for Core Web Vitals", others: "Heavy, bloated templates" },
                    { feature: "Communication", mo: "Direct access to your developer", others: "Account managers & tickets" },
                    { feature: "Project Ownership", mo: "100% full ownership of your code", others: "Locked into proprietary systems" },
                    { feature: "Post-Launch Support", mo: "1 year of premium support included", others: "Pay-per-fix or high hourly rates" },
                    { feature: "Strategy", mo: "Built to convert {City} customers", others: "Build-and-forget approach" },
                    { feature: "Hosting Costs", mo: "Expert advice on $0/month options", others: "Mandatory expensive hosting" },
                    { feature: "Managed Hosting", mo: "Full management for a symbolic fee", others: "Zero support / Hidden fees" },
                    { feature: "Timezone", mo: "Aligned with {timezone}", others: "12-hour delays from offshore" },
                    { feature: "Code Quality", mo: "Custom React/Next.js code", others: "WordPress/Drag-and-drop" },
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 px-4 font-medium text-gray-300">{row.feature}</td>
                      <td className="py-6 px-4 font-bold text-white">
                        <span className="flex items-center gap-2">
                          <span className="text-green-400">✓</span> {row.mo.replace("{City}", location.city).replace("{timezone}", location.timezone)}
                        </span>
                      </td>
                      <td className="py-6 px-4 text-gray-500">
                        <span className="flex items-center gap-2">
                          <span className="text-red-900">✕</span> {row.others}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- Process Section --- */}
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">How I build for {location.city} brands</h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: "Discovery", desc: "Understanding your local market and goals." },
                { title: "Strategy", desc: "Mapping out the technical architecture." },
                { title: "Development", desc: "Building your app with high-clean code." },
                { title: "Launch", desc: "Deploying and optimizing for performance." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-zinc-900 border border-white/5 rounded-xl hover:border-primary/50 transition-colors">
                  <span className="text-5xl font-black text-white/5 absolute top-2 right-4">0{idx + 1}</span>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Featured Case Studies --- */}
        <section className="py-24 px-6 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Proven Results in {location.region}</h2>
              <p className="text-gray-400">Winning solutions for businesses just like yours in {location.city}.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "E-Commerce Platform",
                  desc: "Built a complete e-commerce platform with Stripe integration.",
                  tags: ["Next.js", "Stripe", "PostgreSQL"],
                  image: "/images/modern-ecommerce-dark.png"
                },
                {
                  title: "SaaS Dashboard",
                  desc: "Enterprise-grade analytics platform with real-time data.",
                  tags: ["React", "D3.js", "Node.js"],
                  image: "/images/analytics-dashboard-dark-theme-green-accents.jpg"
                },
                {
                  title: "Crypto Tracker",
                  desc: "Real-time tracking for hundreds of cryptocurrencies.",
                  tags: ["React", "Chart.js", "WebSockets"],
                  image: "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg"
                }
              ].map((project, idx) => (
                <div key={idx} className="group bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/5 rounded text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className="py-24 px-6 bg-zinc-950/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <details className="group p-6 bg-zinc-900 border border-white/5 rounded-xl cursor-pointer">
                <summary className="font-bold text-lg list-none flex justify-between items-center group-open:text-primary transition-colors">
                  Why hire a developer for {location.city} specifically?
                  <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Having a developer who understands the {location.region} market means your site will be built with the right cultural nuances, performance optimizations for local networks, and compliance with regional standards.
                </p>
              </details>

              <details className="group p-6 bg-zinc-900 border border-white/5 rounded-xl cursor-pointer">
                <summary className="font-bold text-lg list-none flex justify-between items-center group-open:text-primary transition-colors">
                  How long does a project in {location.city} usually take?
                  <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Most MVP (Minimum Viable Product) projects are completed within 4-6 weeks depending on complexity. My process is designed for speed without compromising quality.
                </p>
              </details>

              <details className="group p-6 bg-zinc-900 border border-white/5 rounded-xl cursor-pointer">
                <summary className="font-bold text-lg list-none flex justify-between items-center group-open:text-primary transition-colors">
                  What is the price of web development in {location.city}?
                  <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  Prices start from {location.currencySymbol}{location.minRate} for standard packages. Every project is unique, so I recommend booking a free session to get an exact quote for your needs in {location.city}.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* --- Call to Action --- */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to dominate the market in {location.city}?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Stop losing customers to competitors with better websites. Let's build something extraordinary together.
          </p>
          <Link
            href="#contact"
            className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20"
          >
            Get Started Today
          </Link>
        </section>

      </main>
      <ClientContactModal />
      <Footer />
    </>
  );
}
