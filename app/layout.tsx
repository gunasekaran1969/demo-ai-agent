import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo AI Agent',
  description: 'A demo AI agent that works without API keys',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
