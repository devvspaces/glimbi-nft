import { Irish_Grover, Inika, Aldrich } from "next/font/google";
import "./globals.css";

export const irish = Irish_Grover({
  subsets: ["latin"],
  weight: ["400"],
});

export const inika = Inika({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const aldrich = Aldrich({
  subsets: ["latin"],
  weight: ["400"],
});

export const irishVariable = irish.style.fontFamily;
export const inikaVariable = inika.style.fontFamily;
export const aldrichVariable = aldrich.style.fontFamily;
