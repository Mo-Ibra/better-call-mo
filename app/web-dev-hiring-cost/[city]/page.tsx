import { locations } from "@/lib/locations";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Testimonials from "@/components/web-developer/Testimonials";
import SalaryBreakdown from "@/components/web-developer/SalaryBreakdown";
import ComparisonTable from "@/components/web-developer/ComparisonTable";
import TrustStats from "@/components/web-developer/TrustStats";
import type { Metadata } from "next";
import ClientContactModal from "@/components/ClientContactModal";

export async function generateStaticParams() {
  return locations.map((location) => ({
    city: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) return {};

  const title = `Cost of Hiring a Web Developer in ${location.city} (2026) | Full Breakdown`;
  const description = `What is the real cost of hiring a software developer in ${location.city}? Compare local salaries (${location.currencySymbol}${location.avgSalary.toLocaleString()}), taxes, and overhead vs. hiring a specialized Next.js expert.`;

  return {
    title,
    description,
    keywords: [
      `web developer salary ${location.city}`,
      `cost of hiring developer ${location.city}`,
      `software engineer pay ${location.city}`,
      `hire nextjs developer ${location.city}`,
      `freelance vs full-time developer cost ${location.city}`,
      `outsourcing web development ${location.city}`,
      `Better Call Mo ${location.city}`
    ],
    alternates: {
      canonical: `https://bettercallmo.dev/web-dev-hiring-cost/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bettercallmo.dev/web-dev-hiring-cost/${location.slug}`,
      siteName: "Better Call Mo",
      images: [
        {
          url: "https://bettercallmo.dev/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) {
    notFound();
  }

  // 1. Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `The Real Cost of Hiring a Web Developer in ${location.city} (2026 Data)`,
    "description": `Comprehensive analysis of developer salaries and hidden employment costs in ${location.city}.`,
    "author": {
      "@type": "Person",
      "name": "Mohamed (Mo)",
      "url": "https://bettercallmo.dev"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Better Call Mo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bettercallmo.dev/logo.png"
      }
    },
    "datePublished": "2026-02-11",
    "image": "https://bettercallmo.dev/og-image.png"
  };

  // 2. FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does a Senior Web Developer cost in ${location.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The average base salary for a senior developer in ${location.city} is ${location.currencySymbol}${location.avgSalary.toLocaleString()}. Total employer cost with taxes and overhead is approx ${location.currencySymbol}${(location.avgSalary + location.overheadCost).toLocaleString()}.`
        }
      },
      {
        "@type": "Question",
        "name": `Is it cheaper to hire a freelancer or full-time dev in ${location.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Working with a specialized expert like Better Call Mo can save you up to 50% by eliminating local taxes, office rent, and benefits costs typical in ${location.city}.`
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="bg-black min-h-screen">

        {/* Informational Hero Section */}
        <section className="relative pt-32 pb-20 px-6 text-center border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-red-500/10 text-red-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
              2026 Market Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              How much does it <span className="text-red-500">really cost</span> to hire a Senior Web Developer in {location.city}?
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The sticker price of a salary is only the beginning. Between social security, insurance, desk space, and recruitment fees, the true cost can be staggering. Here is the full breakdown for {location.city}.
            </p>
          </div>
        </section>

        {/* The Breakdown Component */}
        <SalaryBreakdown location={location} />

        {/* Trust & Social Proof Pivot */}
        <section className="py-20 px-6 bg-zinc-950 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold italic text-gray-500">&quot;Why hire local in {location.city} when you can hire a battle-tested expert for half the cost?&quot;</h2>
            <TrustStats location={location} />
          </div>
        </section>

        <div id="compare">
          <ComparisonTable location={location} />
        </div>

        <Testimonials />

      </main>
      <ClientContactModal />
      <Footer />
    </>
  );
}
