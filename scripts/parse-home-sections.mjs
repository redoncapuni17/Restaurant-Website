import { readFileSync } from "fs";

const home = readFileSync("scripts/tmp-home.html", "utf8");

const reel = [...home.matchAll(/gallery-reel-item[\s\S]*?data-image="(https:\/\/images\.squarespace-cdn\.com[^"]+)"/g)].map(
  (m) => m[1]
);
const uniqueReel = [...new Set(reel)];
console.log("Gallery reel count:", uniqueReel.length);
uniqueReel.forEach((u, i) => console.log(`${i + 1}. ${decodeURIComponent(u.split("/").pop())}`));

// About / fluid image blocks after gallery section
const aboutSection = home.split("gallery-reel")[1]?.split("Gallery")[1] ?? "";
const fluidImages = [...aboutSection.matchAll(/data-image="(https:\/\/images\.squarespace-cdn\.com[^"]+)"/g)].map(
  (m) => m[1]
);
const uniqueFluid = [...new Set(fluidImages)];
console.log("\nPost-gallery fluid images:", uniqueFluid.length);
uniqueFluid.slice(0, 10).forEach((u, i) => console.log(`${i + 1}. ${decodeURIComponent(u.split("/").pop())}`));

// Hero banner (first section background)
const heroMatch = home.match(/data-section-id="page"[\s\S]*?data-image="(https:\/\/images\.squarespace-cdn\.com[^"]+)"/);
console.log("\nPage hero:", heroMatch?.[1] ? decodeURIComponent(heroMatch[1].split("/").pop()) : "n/a");

// First image in document
console.log("\nFirst data-image:", decodeURIComponent((home.match(/data-image="(https:\/\/images\.squarespace-cdn\.com[^"]+)"/)?.[1] || "").split("/").pop()));
