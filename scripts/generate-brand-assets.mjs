import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

/* ── Twitter Profile Pic (400×400) ─────────────────────────── */

const profileSvg = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#111827"/>
  <!-- Bar 1: short — dark teal -->
  <path d="M118,310 L118,228 Q118,220 126,220 L162,220 Q170,220 170,228 L170,310Z" fill="#0f766e"/>
  <!-- Bar 2: medium — cyan -->
  <path d="M170,310 L170,148 Q170,140 178,140 L214,140 Q222,140 222,148 L222,310Z" fill="#06b6d4"/>
  <!-- Bar 3: tall — amber -->
  <path d="M222,310 L222,78 Q222,70 230,70 L266,70 Q274,70 274,78 L274,310Z" fill="#d97706"/>
</svg>`;

/* ── Twitter Header (1500×500) ─────────────────────────────── */

const headerSvg = `
<svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="hline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0f766e"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1500" height="500" fill="#111827"/>

  <!-- Left accent stripe -->
  <rect x="0" y="0" width="6" height="500" fill="url(#accent)"/>

  <!-- Decorative bars — right -->
  <g opacity="0.04">
    <path d="M1220,500 L1220,340 Q1220,332 1228,332 L1264,332 Q1272,332 1272,340 L1272,500Z" fill="white"/>
    <path d="M1280,500 L1280,220 Q1280,212 1288,212 L1324,212 Q1332,212 1332,220 L1332,500Z" fill="white"/>
    <path d="M1340,500 L1340,100 Q1340,92 1348,92 L1384,92 Q1392,92 1392,100 L1392,500Z" fill="white"/>
  </g>

  <!-- Decorative bars — left -->
  <g opacity="0.04">
    <path d="M80,500 L80,370 Q80,362 88,362 L124,362 Q132,362 132,370 L132,500Z" fill="white"/>
    <path d="M140,500 L140,260 Q140,252 148,252 L184,252 Q192,252 192,260 L192,500Z" fill="white"/>
    <path d="M200,500 L200,140 Q200,132 208,132 L244,132 Q252,132 252,140 L252,500Z" fill="white"/>
  </g>

  <!-- Center icon (scale 5, centered) -->
  <g transform="translate(678, 80) scale(5)">
    <path d="M4,30 L4,22 Q4,20 6,20 L9,20 Q11,20 11,22 L11,30Z" fill="#0f766e"/>
    <path d="M11,30 L11,13 Q11,11 13,11 L16,11 Q18,11 18,13 L18,30Z" fill="#06b6d4"/>
    <path d="M18,30 L18,5 Q18,3 20,3 L23,3 Q25,3 25,5 L25,30Z" fill="#d97706"/>
  </g>

  <!-- "CreatiCalc" -->
  <text x="750" y="298" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="52" font-weight="700" fill="white" text-anchor="middle">CreatiCalc</text>

  <!-- Tagline -->
  <text x="750" y="350" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="24" fill="white" fill-opacity="0.65" text-anchor="middle">Free Calculators for Content Creators</text>

  <!-- Bottom gradient line -->
  <rect x="72" y="430" width="1356" height="2" rx="1" fill="url(#hline)"/>
</svg>`;

async function main() {
  // Twitter profile pic
  await sharp(Buffer.from(profileSvg))
    .resize(400, 400)
    .png()
    .toFile(resolve(ROOT, 'public/twitter-profile.png'));
  console.log('✓ public/twitter-profile.png (400×400)');

  // Twitter header
  await sharp(Buffer.from(headerSvg))
    .resize(1500, 500)
    .png()
    .toFile(resolve(ROOT, 'public/twitter-header.png'));
  console.log('✓ public/twitter-header.png (1500×500)');

  // Favicon.ico from icon.svg
  const iconSvg = readFileSync(resolve(ROOT, 'src/app/icon.svg'));
  const png16 = await sharp(iconSvg).resize(16, 16).png().toBuffer();
  const png32 = await sharp(iconSvg).resize(32, 32).png().toBuffer();

  // Build ICO manually (two sizes: 16×16 + 32×32)
  const ico = buildIco([
    { png: png16, width: 16, height: 16 },
    { png: png32, width: 32, height: 32 },
  ]);
  writeFileSync(resolve(ROOT, 'src/app/favicon.ico'), ico);
  console.log('✓ src/app/favicon.ico (16×16 + 32×32)');
}

/** Build a minimal ICO file from PNG buffers */
function buildIco(images) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * images.length;
  let dataOffset = headerSize + dirSize;

  // ICO header: reserved(2) + type(2) + count(2)
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = ICO
  header.writeUInt16LE(images.length, 4);

  const dirEntries = [];
  const dataBuffers = [];

  for (const { png, width, height } of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // data size
    entry.writeUInt32LE(dataOffset, 12); // data offset

    dirEntries.push(entry);
    dataBuffers.push(png);
    dataOffset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...dataBuffers]);
}

main().catch(console.error);
