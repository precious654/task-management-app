import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "300", "400", "500", "600", "700"]
});


export const metadata: Metadata = {
  title: "TaskManager",
  description: "Keep track of your dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
          <div className="containeer py-3">
              <div className="md:flex gap-4 h-full">
                  <Sidebar/>
                  {children}
                  <Navbar />
              </div>
          </div>
      </body>
    </html>
  );
}
