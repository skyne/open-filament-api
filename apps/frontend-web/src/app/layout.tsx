import './global.css';

export const metadata = {
  title: 'Open Filament API - Filament Management System',
  description: 'Manage your 3D printing filament inventory with ease. Track, organize, and categorize different filament types.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
