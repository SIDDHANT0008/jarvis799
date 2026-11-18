import QRCode from 'qrcode';
const url = process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL;
if (!url || /localhost|127\.0\.0\.1|192\.168\./.test(url) || !/^https:\/\//.test(url)) {
  console.error('Usage: npm run qr -- https://your-deployed-site.vercel.app\n(Must be a public https URL, not localhost.)');
  process.exit(1);
}
await QRCode.toFile('kavita-surprise-qr.png', url, { width: 1024, margin: 2, errorCorrectionLevel: 'H', color: { dark: '#c2185b', light: '#ffffff' } });
console.log('Saved kavita-surprise-qr.png ->', url);
