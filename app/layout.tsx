import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo AI Agent',
  description: 'A real AI chat assistant powered by OpenAI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
