// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, extractHeadings } from "@/lib/blog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientContactModal from "@/components/ClientContactModal";
import ClientArticle from "@/components/ClientArticle";
import TableOfContents from "@/components/TableOfContent";
import SideAd from "@/components/SideAd";
import Link from "next/link";

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {

  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = "https://bettercallmo.dev";
  const postUrl = `${siteUrl}/blog/${slug}`;

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
      locale: "en_US",
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
    },
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {

  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated || post.frontmatter.date,
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
      "@id": `https://bettercallmo.dev/blog/${slug}`,
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
        <div className="space-y-12">
          <ClientArticle post={post} />

          {/* Community Q&A CTA */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 md:p-12 mt-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-black italic">Got a Technical Question?</h3>
                <p className="text-gray-400">Join our community and ask Mo directly. Get expert answers to your web development, SEO, and SaaS bottlenecks.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Link
                    href="/ask-mo"
                    className="px-8 py-3 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20"
                  >
                    Ask a Question
                  </Link>
                  <Link
                    href="/ask-mo"
                    className="px-8 py-3 bg-white/5 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-all"
                  >
                    View All Q&A
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex w-32 h-32 bg-primary/20 rounded-full items-center justify-center font-black text-4xl text-primary border-4 border-primary/20">
                ?
              </div>
            </div>
          </div>
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
