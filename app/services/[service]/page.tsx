import { notFound } from "next/navigation";
import { services } from "@/lib/services";
import type { Metadata } from "next";
import ClientContactModal from "@/components/ClientContactModal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ComparisonTable from "@/components/web-developer/ComparisonTable";
import CTA from "@/components/web-developer/CTA";
import FAQs from "@/components/web-developer/Faqs";
import Testimonials from "@/components/web-developer/Testimonials";
import { testimonials, aggregateRating } from "@/lib/testimonials";
import Link from "next/link";
import Script from "next/script";

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Better Call Mo`,
    description: `${service.shortDesc} I specialize in high-performance web development, ensuring your project is fast, secure, and optimized for search engines. Let's build something extraordinary together that drives real business results.`,
    alternates: {
      canonical: `https://bettercallmo.dev/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Better Call Mo`,
      description: `${service.shortDesc} Expert Next.js & React developer with a focus on conversion and performance.`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Generic location-like object for components that expect it
  const dummyLocation = {
    city: "Global",
    country: "Worldwide",
    flag: "🌍",
    region: "Global" as any,
    currency: "USD" as any,
    currencySymbol: "$",
    timezone: "UTC",
    minRate: 2500,
    slug: "global"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": service.schemaType,
    name: service.title,
    description: service.fullDesc,
    provider: {
      "@type": "Person",
      name: "Mo Ibra",
    },
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ...aggregateRating
    },
    review: testimonials.slice(0, 2).map(t => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.content,
      reviewRating: { "@type": "Rating", ratingValue: t.rating }
    }))
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <main className="min-h-screen bg-black text-white selection:bg-primary-500/30">
        {/* --- Service Hero --- */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-black to-black pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              {service.title}
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto italic">
              &quot;Just like Saul Goodman fights for his clients, I fight for your code excellence.&quot;
            </p>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {service.shortDesc}
            </p>
            <Link
              href="#contact"
              className="inline-block px-10 py-5 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
            >
              {service.ctaText}
            </Link>
          </div>
        </section>

        {/* --- Benefits Grid --- */}
        <section className="py-24 px-6 bg-zinc-950/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-primary uppercase tracking-widest">Core Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                  <span className="text-primary text-2xl font-bold">0{idx + 1}</span>
                  <p className="text-lg text-gray-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Feature Breakdown --- */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8 italic">&quot;You don&apos;t just need a website, you need a high-conversion machine.&quot;</h2>
                <div className="space-y-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                      <p className="text-gray-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl relative">
                <div className="absolute -top-4 -left-4 bg-primary text-white p-3 rotate-[-5deg] font-bold text-sm shadow-lg">
                  PREMIUM QUALITY
                </div>
                <h3 className="text-xl font-bold mb-6">Expert Stack for {service.slug.replace(/-/g, ' ')}</h3>
                <div className="flex flex-wrap gap-3">
                  {service.techStack.map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-mono text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ComparisonTable location={dummyLocation} />

        <Testimonials />

        <FAQs location={dummyLocation} />

        <CTA location={dummyLocation} />
      </main>

      <ClientContactModal />
      <Footer />
    </div>
  );
}
