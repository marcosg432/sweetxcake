import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sweet Cheesecake — Catálogo Inteligente",
    template: "%s | Sweet Cheesecake",
  },
  description:
    "Cheesecakes, bolos artesanais, lanches e doces. Peça pelo cardápio digital e finalize no WhatsApp da unidade mais próxima.",
  metadataBase: new URL("https://sweetoficial.com.br"),
  openGraph: {
    title: "Sweet Cheesecake",
    description:
      "Cheesecakes, bolos artesanais, lanches e doces. Peça pelo cardápio digital e finalize no WhatsApp da unidade mais próxima.",
    url: "https://sweetoficial.com.br",
    siteName: "Sweet Cheesecake",
    images: [
      {
        url: "/images/brand/logo-sweet-cheesecake.png",
        width: 512,
        height: 512,
        alt: "Sweet Cheesecake",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/images/brand/logo-sweet-cheesecake.png",
    apple: "/images/brand/logo-sweet-cheesecake.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface-1 text-foreground">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
