import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consultoría Integral de Pensiones Ley 73 | IMSS",
  description: "Asesoría especializada en pensiones Ley 73 IMSS. Calculadora Modalidad 40, análisis de elegibilidad y estrategias de jubilación para trabajadores mexicanos.",
  keywords: "pensión IMSS, Ley 73, Modalidad 40, calculadora pensiones, asesoría jubilación, elegibilidad pensión",
  authors: [{ name: "Sergio", url: "https://pensiones-consulting.mx" }],
  openGraph: {
    title: "Consultoría Integral de Pensiones - Ley 73 IMSS",
    description: "Descubre cuánto recibirás de pensión bajo Ley 73. Herramientas, casos prácticos y asesoría especializada.",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Pensiones Modalidad 40",
    description: "Analiza tu eligibilidad y estima tu pensión IMSS Ley 73",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="canonical" href="https://pensiones-consulting.mx" />
        <link rel="icon" href="/favicon.ico" />

        {/* Google Analytics */}
        {/* TODO: Reemplaza G-XXXXXXXXXX con tu ID real de Google Analytics */}
        {/* Para obtenerlo: Google Analytics → Admin → Data Streams → Tu sitio → Measurement ID (formato: G-XXXXXXX) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NHY7BGK2DF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NHY7BGK2DF');
          `}
        </Script>

        {/* Structured Data - Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Consultoría Integral de Pensiones",
              description: "Asesoría especializada en pensiones IMSS Ley 73",
              url: "https://pensiones-consulting.mx",
              telephone: "+525512345678",
              email: "mi.consultor.pensiones@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MX",
                addressLocality: "Ciudad de México"
              }
            })
          }}
        />

        {/* Structured Data - LocalBusiness */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Consultoría Integral de Pensiones",
              image: "https://pensiones-consulting.mx/logo.png",
              description: "Asesoría especializada en pensiones mexicanas",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ciudad de México",
                addressCountry: "MX"
              },
              telephone: "+525512345678",
              url: "https://pensiones-consulting.mx",
              serviceType: "Asesoría Financiera Pensiones"
            })
          }}
        />

        {/* SEO: Allow indexation */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
