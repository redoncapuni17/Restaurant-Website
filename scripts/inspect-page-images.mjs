import { writeFileSync } from "fs";

async function page(name, url) {
  const res = await fetch(url);
  const html = await res.text();
  writeFileSync(`scripts/tmp-${name}.html`, html);
  return html;
}

const home = await page("home", "https://www.puparestaurant.com/");
const gift = await page("gift", "https://www.puparestaurant.com/gift-cards");
const events = await page("events", "https://www.puparestaurant.com/events");
const privateHire = await page("private", "https://www.puparestaurant.com/private-hire");
const menus = await page("menus", "https://www.puparestaurant.com/menus");

function firstDataImage(html) {
  const m = html.match(/data-image="(https:\/\/images\.squarespace-cdn\.com[^"]+)"/);
  return m?.[1] ?? null;
}

function allDataImages(html) {
  return [...html.matchAll(/data-image="(https:\/\/images\.squarespace-cdn\.com[^"]+)"/g)].map((m) => m[1]);
}

function galleryFromProps(html) {
  const m = html.match(/data-props='(\{[\s\S]*?\})'\s+data-current-context/);
  if (!m) return [];
  try {
    const props = JSON.parse(m[1].replace(/&quot;/g, '"'));
    return (props.images || []).map((img) => img.assetUrl || img.mediaFocalPoint?.url).filter(Boolean);
  } catch {
    return [];
  }
}

function sectionBackgrounds(html) {
  return [...html.matchAll(/background-image:\s*url\((https:\/\/images\.squarespace-cdn\.com[^)]+)\)/g)].map(
    (m) => m[1]
  );
}

console.log("HOME hero:", firstDataImage(home));
console.log("HOME gallery props:", galleryFromProps(home).map((u) => decodeURIComponent(u.split("/").pop())));
console.log("HOME all data-image count:", allDataImages(home).length);
console.log("HOME data-images:", allDataImages(home).map((u) => decodeURIComponent(u.split("/").pop())));

for (const [name, html] of [
  ["gift-cards", gift],
  ["events", events],
  ["private-hire", privateHire],
  ["menus", menus],
]) {
  console.log(`\n${name} first data-image:`, firstDataImage(html));
  console.log(`${name} backgrounds:`, sectionBackgrounds(html).map((u) => decodeURIComponent(u.split("/").pop())));
}

// Menu subpages
for (const slug of ["main-menu", "lunch-menu", "wine-list", "drink-menu", "dessert-menu"]) {
  const html = await page(slug, `https://www.puparestaurant.com/${slug}`);
  console.log(`\n${slug} backgrounds:`, sectionBackgrounds(html).map((u) => decodeURIComponent(u.split("/").pop())));
  console.log(`${slug} first data-image:`, firstDataImage(html));
}
