import "./globals.css";
import { Montserrat, Tiny5 } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ["latin"],
})

export const tiny5 = Tiny5({
  weight: "400"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
