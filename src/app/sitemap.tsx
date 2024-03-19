import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const routes = siteConfig.mainNav.map((route) => ({
		url: `${siteConfig.siteUrl}${route.href}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
