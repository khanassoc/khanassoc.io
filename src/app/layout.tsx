import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "./globals.css";
import { Shell } from "@/components/ui";

export const metadata: Metadata = {
  metadataBase: new URL("https://khanassoc.io"),
  title: {
    default: "Khan Associates · Tax preparation in DFW",
    template: "%s · Khan Associates",
  },
  description:
    "Tax preparation, planning, and IRS representation for individuals and small businesses. $200 per filing.",
};

export const viewport: Viewport = {
  themeColor: "#113D8A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
