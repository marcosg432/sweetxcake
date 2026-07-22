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
    "Catálogo inteligente multilojas. Explore produtos, monte seu pedido e finalize no WhatsApp da unidade mais conveniente.",
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
