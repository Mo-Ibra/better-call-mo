// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientContactModal from "@/components/ClientContactModal";

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
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 mb-4">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.frontmatter.readingTime && (
              <span>• {post.frontmatter.readingTime} min read</span>
            )}
          </div>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-4xl font-bold mt-8 mb-4 tracking-tight"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="text-xl font-bold mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-gray-300 leading-relaxed mb-4 text-lg"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-400 hover:underline" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-gray-100" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-gray-200" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-300 leading-relaxed" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-400 bg-gray-900"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr className="border-gray-700 my-8" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="rounded-lg shadow-lg my-6 w-full" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="border-b-2 border-gray-700" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-4 py-2 text-left font-semibold text-gray-100"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-4 py-2 border-t border-gray-800 text-gray-300"
                  {...props}
                />
              ),
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: "1.5rem 0",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      padding: "1rem",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <ClientContactModal />
      <Footer />
    </>
  );
}
