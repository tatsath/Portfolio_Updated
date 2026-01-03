import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hariom Tatsat",
  description: "Democratizing Financial AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3crect width='100' height='100' rx='20' fill='%23232020'/%3e%3ctext y='.9em' x='50%25' text-anchor='middle' font-family='Inter, sans-serif' font-size='80' fill='%23ffffff'%3eH%3c/text%3e%3c/svg%3e"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (window.AOS) {
                  window.AOS.init({
                    duration: 800,
                    easing: 'ease-in-out-quad',
                    once: true
                  });
                }
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

