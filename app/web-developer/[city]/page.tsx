import { notFound } from "next/navigation";
import { locations } from "@/lib/locations";
import type { Metadata } from "next";
import ClientContactModal from "@/components/ClientContactModal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/web-developer/Hero";
import Localized from "@/components/web-developer/Localized";
import TrustStats from "@/components/web-developer/TrustStats";
import ComparisonTable from "@/components/web-developer/ComparisonTable";
import Process from "@/components/web-developer/Process";
import CaseStudies from "@/components/web-developer/CaseStudies";
import FAQs from "@/components/web-developer/Faqs";
import CTA from "@/components/web-developer/CTA";

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
        <Hero location={location} />

        {/* --- Localized Value Prop --- */}
        <Localized location={location} />

        {/* --- Trust Stats & Meet Mo --- */}
        <TrustStats location={location} />

        {/* --- Comparison Table --- */}
        <ComparisonTable location={location} />

        {/* --- Process Section --- */}
        <Process location={location} />

        {/* --- Featured Case Studies --- */}
        <CaseStudies location={location} />

        {/* --- FAQ Section --- */}
        <FAQs location={location} />

        {/* --- Call to Action --- */}
        <CTA location={location} />

      </main>
      <ClientContactModal />
      <Footer />
    </>
  );
}
