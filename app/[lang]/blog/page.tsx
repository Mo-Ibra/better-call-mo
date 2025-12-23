// app/[lang]/blog/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import {
  LanguageCode,
  availableLanguages,
  getLanguageConfig,
} from "@/lib/i18n.config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface TranslatedBlogPageProps {
  params: { lang: string };
}

// Generate static params for all languages except English
export async function generateStaticParams() {
  return availableLanguages
    .filter((lang) => lang !== "en")
    .map((lang) => ({ lang }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TranslatedBlogPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") {
    return { title: "Not Found" };
  }

  const siteUrl = "https://bettercallmo.dev";
  const blogUrl = `${siteUrl}/${lang}/blog`;

  const titles: Record<string, string> = {
    es: "Blog | Better Call Mo",
    it: "Blog | Better Call Mo",
    de: "Blog | Better Call Mo",
    pt: "Blog | Better Call Mo",
  };

  const descriptions: Record<string, string> = {
    es: "Artículos sobre desarrollo web, diseño y tecnología por Mo",
    it: "Articoli su sviluppo web, design e tecnologia di Mo",
    de: "Artikel über Webentwicklung, Design und Technologie von Mo",
    pt: "Artigos sobre desenvolvimento web, design e tecnologia por Mo",
  };

  return {
    title: titles[lang] || "Blog | Better Call Mo",
    description: descriptions[lang] || "Articles by Mo",
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      url: blogUrl,
      siteName: "Better Call Mo",
      type: "website",
      locale: `${lang}_${lang.toUpperCase()}`,
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
      title: titles[lang],
      description: descriptions[lang],
    },
    alternates: {
      canonical: blogUrl,
      languages: {
        en: `${siteUrl}/blog`,
        es: `${siteUrl}/es/blog`,
        it: `${siteUrl}/it/blog`,
        de: `${siteUrl}/de/blog`,
        pt: `${siteUrl}/pt/blog`,
      },
    },
  };
}

export default async function TranslatedBlogPage({
  params,
}: TranslatedBlogPageProps) {
  const { lang } = await params;

  // Validate language
  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") {
    notFound();
  }

  const posts = await getAllBlogPosts(lang as LanguageCode);
  const langConfig = getLanguageConfig(lang);

  const subheadings: Record<string, string> = {
    es: "Reflexiones sobre desarrollo web, diseño y tecnología",
    it: "Pensieri su sviluppo web, design e tecnologia",
    de: "Gedanken zu Webentwicklung, Design und Technologie",
    pt: "Reflexões sobre desenvolvimento web, design e tecnologia",
  };

  const noPosts: Record<string, string> = {
    es: "Aún no hay publicaciones. ¡Vuelve pronto!",
    it: "Ancora nessun post. Torna presto!",
    de: "Noch keine Beiträge. Schauen Sie bald wieder vorbei!",
    pt: "Ainda não há postagens. Volte em breve!",
  };

  // JSON-LD structured data for blog listing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Better Call Mo Blog",
    description: subheadings[lang],
    url: `https://bettercallmo.dev/${lang}/blog`,
    inLanguage: lang,
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
      inLanguage: lang,
      url: `https://bettercallmo.dev/${lang}/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://bettercallmo.dev/${lang}/blog/${post.slug}`,
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

      <div className="max-w-6xl mx-auto px-4 py-12" dir={langConfig.dir}>
        <header className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold">Blog</h1>
            <LanguageSwitcher currentLang={lang as LanguageCode} />
          </div>
          <p className="text-xl text-gray-400">{subheadings[lang]}</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-400">{noPosts[lang]}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/${lang}/blog/${post.slug}`}>
                  {post.frontmatter.image && (
                    <div className="aspect-video bg-gray-800">
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
                    <h2 className="text-2xl font-bold mb-2 hover:text-primary/70 transition-colors line-clamp-2 overflow-hidden text-ellipsis">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-3 overflow-hidden text-ellipsis">
                      {post.frontmatter.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <time dateTime={post.frontmatter.date}>
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          lang,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </time>
                      {post.frontmatter.readingTime && (
                        <span>• {post.frontmatter.readingTime} min</span>
                      )}
                    </div>
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.frontmatter.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary/30 text-white rounded text-xs"
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
