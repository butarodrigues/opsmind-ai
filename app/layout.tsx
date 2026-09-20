import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpsMind AI",
  description:
    "Intelligence. Technology. Transformation. Soluções em IA, Dados, Cibersegurança, Compliance, Investigação e Formação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}