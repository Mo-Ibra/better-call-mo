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
import Script from "next/script";
import Hero from "@/components/services/Hero";
import Benefits from "@/components/services/Benefits";
import FeatureBreakdown from "@/components/services/FeatureBreakdown";

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
    })),
    mainEntity: service.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
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
        <Hero service={service} />

        <Benefits service={service} />

        <FeatureBreakdown service={service} />

        <ComparisonTable />

        <Testimonials />

        <FAQs items={service.faqs} />

        <CTA />
      </main>

      <ClientContactModal />
      <Footer />
    </div>
  );
}
