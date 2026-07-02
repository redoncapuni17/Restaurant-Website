const res = await fetch("https://www.puparestaurant.com/");
const html = await res.text();

// Order of first appearance in HTML (useful for gallery/about blocks)
const re =
  /https:\/\/images\.squarespace-cdn\.com\/content\/v1\/63750e9f0d23390c9402c839\/[^"'\s)]+\.(?:jpg|jpeg|png|JPG|webp)/g;
const seen = new Set();
const ordered = [];
for (const m of html.matchAll(re)) {
  const base = m[0].split("?")[0];
  if (!seen.has(base)) {
    seen.add(base);
    ordered.push(base);
  }
}

console.log("Ordered unique images on homepage:", ordered.length);
ordered.forEach((u, i) => console.log(`${String(i + 1).padStart(2, "0")}. ${decodeURIComponent(u.split("/").pop())}`));

// Look for hero / banner hints
for (const needle of ["banner", "hero", "gallery", "about", "Our Story", "Gallery", "data-image"]) {
  const idx = html.indexOf(needle);
  if (idx !== -1) {
    const snippet = html.slice(Math.max(0, idx - 120), idx + 220).replace(/\s+/g, " ");
    console.log(`\n[${needle}]`, snippet.slice(0, 280));
  }
}
