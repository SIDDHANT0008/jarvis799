import './globals.css';
export const metadata = {
  title: 'For Kavita ❤️ | My Pyaara Baccha',
  description: 'A little surprise, made with lots of love 💗',
  openGraph: { title: 'For Kavita ❤️', description: 'Someone made something special just for you...' }
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffe3ee' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
