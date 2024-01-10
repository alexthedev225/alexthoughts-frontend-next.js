import { Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "./ClientLayout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Alex Thoughts",
  description: "Alex Thoughts is a blog personal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
