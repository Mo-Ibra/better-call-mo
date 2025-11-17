// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cold-email"],
    },
    sitemap: "https://bettercallmo.dev/sitemap.xml",
  };
}
