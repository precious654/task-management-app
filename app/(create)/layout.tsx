import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "600", "700"]
});

export const metadata = {
  title: 'Create Task',
  description: 'Create task and projects',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={`${poppins.className}`}>
        <div className="containeer">
          {children}
        </div>
      </body>
      </html>
  )
}
