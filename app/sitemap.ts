import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { availableLanguages, LanguageCode } from "@/lib/i18n.config";
import { locations } from "@/lib/locations";
import { services } from "@/lib/services";
import { getAllQnAs } from "@/lib/qna";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bettercallmo.dev";
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Main page & Static Pages
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  });

  sitemapEntries.push({
    url: `${baseUrl}/ask-mo`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  // 2. Pages for each language
  for (const lang of availableLanguages) {
    const blogUrl = lang === "en" ? `${baseUrl}/blog` : `${baseUrl}/${lang}/blog`;

    sitemapEntries.push({
      url: blogUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 3. Articles for each language
  for (const lang of availableLanguages) {
    const posts = await getAllBlogPosts(lang as LanguageCode);

    posts.forEach((post) => {
      const postUrl = lang === "en"
        ? `${baseUrl}/blog/${post.slug}`
        : `${baseUrl}/${lang}/blog/${post.slug}`;

      sitemapEntries.push({
        url: postUrl,
        lastModified: post.frontmatter.updated || post.frontmatter.date,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  }

  // 4. Web Developer City Pages
  locations.forEach((loc) => {
    sitemapEntries.push({
      url: `${baseUrl}/web-developer/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  });

  // 5. Service Pages
  services.forEach((service) => {
    sitemapEntries.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  // 6. Hiring Cost Pages
  locations.forEach((loc) => {
    sitemapEntries.push({
      url: `${baseUrl}/web-dev-hiring-cost/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return sitemapEntries;
}