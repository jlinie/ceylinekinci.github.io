export const PALETTE = [
  "#E2DC54", // Lime Green
  "#266433", // Forest Green
  "#DFEFCA", // Mint Green
  "#032F98", // Deep Blue
  "#F45C27", // Tangerine
  "#ADD0EE", // Sky Blue
  "#6D2D59", // Berry Purple
  "#D1C4E9", // Lavender
];

export function colorForSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 33 + slug.charCodeAt(i)) | 0;
  const idx = Math.abs(h * 7) % PALETTE.length; 
  return PALETTE[idx];
}

export function isLight(hex: string) {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  const hsp = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
  return hsp > 180;
}
