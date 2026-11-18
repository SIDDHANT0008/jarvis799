'use client';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QrPage() {
  const [url, setUrl] = useState('');
  const [png, setPng] = useState('');
  useEffect(() => {
    const env = process.env.NEXT_PUBLIC_SITE_URL;
    setUrl(env || window.location.origin);
  }, []);
  const local = /localhost|127\.0\.0\.1|192\.168\./.test(url);
  useEffect(() => {
    if (!url || local) return setPng('');
    QRCode.toDataURL(url, { width: 1024, margin: 2, errorCorrectionLevel: 'H', color: { dark: '#c2185b', light: '#ffffff' } }).then(setPng);
  }, [url, local]);
  return (
    <div className="qr">
      <h2>QR Code 💗</h2>
      <p>Open this page on your <b>deployed</b> site, or paste the live URL:</p>
      <input value={url} onChange={(e) => setUrl(e.target.value.trim())} placeholder="https://your-site.vercel.app" />
      {local && <p style={{ color: '#c2185b' }}>⚠️ That is a local address, it won’t work on her phone. Deploy first and use the live URL.</p>}
      {png && (<><img src={png} alt="QR code" /><br /><br />
        <a className="btn" href={png} download="kavita-surprise-qr.png" style={{ textDecoration: 'none', display: 'inline-block' }}>Download PNG ⬇️</a></>)}
    </div>
  );
}
