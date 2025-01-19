import MyContextProvider from "@/lib/providers/MyContextProvider";
import { NextUiProvider } from "@/lib/providers/NextUIProvider";
import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
import type { Metadata } from "next";

import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "Dashboard ",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={` font-lato antialiased`}
      >
        <MyContextProvider>
          <ReduxStoreProvider>
            <NextUiProvider>
              <Toaster />
              <div className="text-[#02060A]">{children}</div>
            </NextUiProvider>
          </ReduxStoreProvider>
        </MyContextProvider>
      </body>
    </html>
  );
}
