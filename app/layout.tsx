import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ศูนย์รับเรื่องร้องเรียนและเสนอแนะ | โรงพยาบาลหนองหาน",
  description: "ศูนย์รับเรื่องร้องเรียนและข้อเสนอแนะ โรงพยาบาลหนองหาน จังหวัดอุดรธานี",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Sarabun', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
