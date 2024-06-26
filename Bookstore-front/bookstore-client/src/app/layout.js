import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bookstore",
  description: "Online Bookstore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar">
          <Link href="/customers" className="nav-link">
            Customers
          </Link>
          <Link href="/orders" className="nav-link">
            Orders
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
