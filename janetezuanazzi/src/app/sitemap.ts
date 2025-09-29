import type { MetadataRoute } from "next";

const routes = [
  "",
  "#funcionalidades",
  "#planos",
  "#contato",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.janetezuanazzi.com";

  return routes.map((segment) => ({
    url: segment ? `${baseUrl}/${segment}` : baseUrl,
    lastModified: new Date(),
  }));
}
