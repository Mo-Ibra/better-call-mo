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
