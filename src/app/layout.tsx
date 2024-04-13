import type { Metadata } from "next";
import "@/assets/globals.scss";
import MonicaLayout from "./components/monica_layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
        <AntdRegistry>
          <MonicaLayout>{children}</MonicaLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
