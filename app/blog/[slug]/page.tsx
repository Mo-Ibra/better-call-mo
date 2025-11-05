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
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = "https://bettercallmo.com"; // Replace with your actual domain
  const postUrl = `${siteUrl}/blog/${params.slug}`;

  return {
    title: `${post.frontmatter.title} | Better Call Mo`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags?.join(", "),
    authors: [{ name: post.frontmatter.author || "Mo" }],
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
      authors: [post.frontmatter.author || "Mo"],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
      creator: "@yourtwitterhandle", // Replace with your Twitter handle
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

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
      name: post.frontmatter.author || "Mo",
    },
    publisher: {
      "@type": "Organization",
      name: "Better Call Mo",
      logo: {
        "@type": "ImageObject",
        url: "https://bettercallmo.com/logo.png", // Replace with your logo
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bettercallmo.com/blog/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <div className="relative max-w-5xl mx-auto px-4 py-12">
        <div className="relative flex justify-center">
          <div className="hidden xl:block absolute left-[-25rem] top-0 bottom-6">
            <div className="sticky top-24">
              <SideAd />
            </div>
          </div>

          <ClientArticle post={post} />

          <div className="hidden xl:block absolute right-[-18rem] top-0 bottom-6">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </div>
      <ClientContactModal />
      <Footer />
    </>
  );
}
