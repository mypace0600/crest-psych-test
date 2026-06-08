import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://crest-psych-test.vercel.app";
const title = "디지몬, 나의 선택받은 문장은?! | 디지몬 문장 심리검사";
const description =
  "디지몬 어드벤처 문장 테스트. 용기, 우정, 순수, 사랑, 지식, 성실, 희망, 빛 중 나의 선택받은 문장을 확인해보세요.";
const ogImage = "/og-crest-v2.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "디지몬, 나의 선택받은 문장은?!",
  keywords: [
    "디지몬",
    "디지몬 문장",
    "디지몬 문장 테스트",
    "디지몬 심리테스트",
    "디지몬 어드벤처",
    "선택받은 아이들",
    "용기의 문장",
    "우정의 문장",
    "순수의 문장",
    "사랑의 문장",
    "지식의 문장",
    "성실의 문장",
    "희망의 문장",
    "빛의 문장",
    "문장 심리검사",
  ],
  authors: [{ name: "Crest Psych Test" }],
  creator: "Crest Psych Test",
  other: {
    title,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "디지몬, 나의 선택받은 문장은?!",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 604,
        alt: "디지몬 문장 심리검사의 8개 문장 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "디지몬, 나의 선택받은 문장은?!",
    url: siteUrl,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web",
    inLanguage: "ko-KR",
    description,
    keywords:
      "디지몬, 디지몬 문장, 디지몬 문장 테스트, 디지몬 심리테스트, 디지몬 어드벤처, 선택받은 아이들, 문장 심리검사",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
  };

  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
