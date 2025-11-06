import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Better Call Mo",
  description: "Articles about web development, design, and technology by Mo",
  openGraph: {
    title: "Blog | Better Call Mo",
    description: "Articles about web development, design, and technology by Mo",
    url: "https://bettercallmo.dev/blog",
    siteName: "Better Call Mo",
    type: "website",
    images: [
      {
        url: "https://bettercallmo.dev/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Better Call Mo - Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Better Call Mo",
    description: "Articles about web development, design, and technology by Mo",
  },
  alternates: {
    canonical: "https://bettercallmo.dev/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  // JSON-LD structured data for blog listing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Better Call Mo Blog",
    description: "Articles about web development, design, and technology",
    url: "https://bettercallmo.dev/blog",
    author: {
      "@type": "Person",
      name: "Mo Ibra",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.frontmatter.title,
      author: {
        "@type": "Person",
        name: "Mo Ibra",
      },
      description: post.frontmatter.description,
      datePublished: post.frontmatter.date,
      dateModified: post.frontmatter.date,
      url: `https://bettercallmo.dev/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://bettercallmo.dev/blog/${post.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts on web development, design, and technology
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No blog posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  {post.frontmatter.image && (
                    <div className="aspect-video bg-gray-200 dark:bg-gray-800">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover"
                        width={320}
                        height={320}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.frontmatter.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                      <time dateTime={post.frontmatter.date}>
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </time>
                      {post.frontmatter.readingTime && (
                        <span>• {post.frontmatter.readingTime} min read</span>
                      )}
                    </div>
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.frontmatter.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
