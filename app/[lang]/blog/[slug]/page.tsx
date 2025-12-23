// app/[lang]/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, extractHeadings } from "@/lib/blog";
import {
  LanguageCode,
  availableLanguages,
  getLanguageConfig,
} from "@/lib/i18n.config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientContactModal from "@/components/ClientContactModal";
import ClientArticle from "@/components/ClientArticle";
import TableOfContents from "@/components/TableOfContent";
import SideAd from "@/components/SideAd";

interface TranslatedBlogPostPageProps {
  params: {
    lang: string;
    slug: string;
  };
}

// Generate static params for all blog posts in all languages
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  // Loop through all languages except English (default)
  for (const lang of availableLanguages) {
    if (lang === "en") continue; // Skip English as it's handled by /blog/[slug]

    const slugs = await getAllBlogSlugs(lang as LanguageCode);
    params.push(...slugs.map((slug) => ({ lang, slug })));
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TranslatedBlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  // Validate language
  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") {
    return {
      title: "Post Not Found",
    };
  }

  const post = await getBlogPost(slug, lang as LanguageCode);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = "https://bettercallmo.dev";
  const postUrl = `${siteUrl}/${lang}/blog/${slug}`;
  const langConfig = getLanguageConfig(lang);

  return {
    title: `${post.frontmatter.title} | Better Call Mo`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords?.join(", "),
    authors: [{ name: post.frontmatter.author || "Mo Ibra" }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: postUrl,
      siteName: "Better Call Mo",
      images: post.frontmatter.image
        ? [
            {
              url: post.frontmatter.image,
              width: 1200,
              height: 630,
              alt: post.frontmatter.title,
            },
          ]
        : [],
      locale: `${lang}_${lang.toUpperCase()}`,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Mo Ibra"],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
      creator: "@MoIbrraa",
    },
    alternates: {
      canonical: postUrl,
      languages: {
        en: `${siteUrl}/blog/${slug}`,
        es: `${siteUrl}/es/blog/${slug}`,
        it: `${siteUrl}/it/blog/${slug}`,
        de: `${siteUrl}/de/blog/${slug}`,
        pt: `${siteUrl}/pt/blog/${slug}`,
      },
    },
  };
}

export default async function TranslatedBlogPost({
  params,
}: TranslatedBlogPostPageProps) {
  const { lang, slug } = await params;

  // Validate language
  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") {
    notFound();
  }

  const post = await getBlogPost(slug, lang as LanguageCode);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const langConfig = getLanguageConfig(lang);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated || post.frontmatter.date,
    inLanguage: lang,
    author: {
      "@type": "Person",
      name: post.frontmatter.author || "Mo Ibra",
    },
    publisher: {
      "@type": "Organization",
      name: "Better Call Mo",
      logo: {
        "@type": "ImageObject",
        url: "https://bettercallmo.dev/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bettercallmo.dev/${lang}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <div className="max-w-[1650px] mx-auto px-4 py-12 grid grid-cols-1 xl:grid-cols-[300px_minmax(0,800px)_300px] gap-12">
        {/* Left Ad */}
        <div className="hidden xl:block">
          <div className="sticky top-24">
            <SideAd />
          </div>
        </div>

        {/* Main Article */}
        <div>
          <ClientArticle post={post} />
        </div>

        {/* Table of Contents */}
        <div className="hidden xl:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </div>
      <ClientContactModal />
      <Footer />
    </>
  );
}
