import { Poppins } from "next/font/google";
import "../globals.css";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <NuqsAdapter>
          <div className="containeer">
              {children}
          </div>
          <ToastContainer />
      </NuqsAdapter>
      </body>
      </html>
  )
}
