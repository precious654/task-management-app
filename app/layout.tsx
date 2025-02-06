import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "300", "400", "500", "600", "700"]
});


export const metadata: Metadata = {
  title: "TaskManager",
  description: "Keep track of your tasks",
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
        <div className="containeer">
            {children}
        </div>
      </body>
    </html>
  );
}
