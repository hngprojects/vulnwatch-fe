import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "VulnWatch AI — Intelligent Vulnerability Detection";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  icons: {
    icon: "/images/logo-auth.png",
  },
  title: {
    default: appName,
    template: `%s · ${appName}`,
  },
  description: `${appName} — a Next.js 16 starter.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
