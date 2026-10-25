import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Academic Apex Crest with Light Red & Rose Theme
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb7185" />
      <stop offset="50%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#be123c" />
    </linearGradient>
    <linearGradient id="crestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#ffe4e6" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
  </defs>
  
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <circle cx="256" cy="256" r="210" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.25" stroke-dasharray="8 8" />
  
  <circle cx="256" cy="256" r="150" fill="#18070b" fill-opacity="0.35" />
  <circle cx="256" cy="256" r="148" fill="none" stroke="url(#crestGrad)" stroke-width="4" stroke-opacity="0.8" />
  
  <path d="M 256 145 L 340 230 L 305 230 L 256 182 L 207 230 L 172 230 Z" fill="url(#crestGrad)" />

  <path d="M 256 220 C 230 205 180 205 155 220 L 155 315 C 180 300 230 300 256 315 Z" fill="#ffffff" fill-opacity="0.95" />
  <path d="M 256 220 C 282 205 332 205 357 220 L 357 315 C 332 300 282 300 256 315 Z" fill="#ffffff" fill-opacity="0.88" />
  
  <line x1="256" y1="218" x2="256" y2="315" stroke="#f43f5e" stroke-width="3" stroke-linecap="round" />
  
  <line x1="175" y1="248" x2="238" y2="248" stroke="#f43f5e" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" />
  <line x1="175" y1="268" x2="238" y2="268" stroke="#f43f5e" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" />
  <line x1="175" y1="288" x2="225" y2="288" stroke="#f43f5e" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" />
  
  <line x1="274" y1="248" x2="337" y2="248" stroke="#f43f5e" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" />
  <line x1="274" y1="268" x2="337" y2="268" stroke="#f43f5e" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" />
  <line x1="274" y1="288" x2="324" y2="288" stroke="#f43f5e" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" />

  <path d="M 256 325 L 261.5 337.5 L 275 338.5 L 264.5 347.5 L 267.5 360.5 L 256 353.5 L 244.5 360.5 L 247.5 347.5 L 237 338.5 L 250.5 337.5 Z" fill="url(#accentGrad)" />
</svg>`;

const svgBuffer = Buffer.from(svgContent);
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');

// 2. Generate PNGs using Sharp
async function generateAllPngs() {
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  await sharp(svgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(svgBuffer).resize(48, 48).png().toFile(path.join(publicDir, 'favicon.ico'));

  // Maskable icon with 10% safe zone padding
  const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="#be123c" />
    <g transform="translate(51.2, 51.2) scale(0.8)">
      ${svgContent.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
    </g>
  </svg>`;
  await sharp(Buffer.from(maskableSvg)).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  console.log('Successfully generated all PWA icons in light red academic palette!');
}

generateAllPngs().catch(console.error);
