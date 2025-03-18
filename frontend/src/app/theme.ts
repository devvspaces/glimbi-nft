/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import { inika, irish } from "./fonts";

export const theme = extendTheme({
    fonts: {
      heading: irish.style.fontFamily,
      body: inika.style.fontFamily,
    }
});