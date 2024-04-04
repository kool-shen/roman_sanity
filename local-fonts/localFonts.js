import localFont from "next/font/local";

export const TeX_Regular = localFont({
  src: "../public/fonts/texgyreheroscn-regular.otf",
  display: "swap",
  variable: "--texRegular",
});

export const TeX_Italic = localFont({
  src: "../public/fonts/texgyreheroscn-italic.otf",
  display: "swap",
  variable: "--texItalic",
});

export const TeX_Bold = localFont({
  src: "../public/fonts/texgyreheroscn-bold.otf",
  display: "swap",
  variable: "--texBold",
});
