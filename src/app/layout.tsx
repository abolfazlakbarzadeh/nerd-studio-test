import type { Metadata } from "next";
import "@/assets/globals.scss";
import MonicaLayout from "./components/monica_layout";

export const metadata: Metadata = {
  title: "Nerd Studio",
  description: "Made by Abolfazl Akbarzadeh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MonicaLayout>{children}</MonicaLayout>
      </body>
    </html>
  );
}
