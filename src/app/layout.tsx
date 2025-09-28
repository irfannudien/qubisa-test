import { Metadata } from "next";

import Header from "@/components/Header";
import "./globals.css";
import { ReduxProvider } from "@/provider/ReduxProvider";
import NotistackProvider from "@/provider/NotistackProvider";

export const metadata: Metadata = {
  title: "Qubisa Clone",
  description: "Qubisa Test App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NotistackProvider>
            <Header />
            {children}
          </NotistackProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
