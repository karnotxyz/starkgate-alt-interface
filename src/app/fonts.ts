import { Cairo, Comic_Neue } from "next/font/google";

export const comicNeue_700 = Comic_Neue({
	weight: "700",
	subsets: ["latin"],
});

export const baseFont = Cairo({ subsets: ["latin"] });
