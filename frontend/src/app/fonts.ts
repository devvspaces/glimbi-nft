import { Irish_Grover, Inika } from "next/font/google";
import "./globals.css";

export const irish = Irish_Grover({
  subsets: ["latin"],
  weight: ["400"],
});

export const inika = Inika({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const irishVariable = irish.style.fontFamily;
