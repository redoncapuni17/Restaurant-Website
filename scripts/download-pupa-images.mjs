import { mkdir, writeFile } from "fs/promises";
import path from "path";

const BASE = "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839";
const q = (file) => `${BASE}/${file}?format=2500w`;

/** Mapped to paths in lib/siteConfig.ts */
const SITE_IMAGE_MAP = {
  "heroes/home.jpg": q("74b2cf5f-39bf-474b-a9bb-e7231a1bc82f/IMG_9196.jpg"),
  "about/about-1.jpg": q("ba7493cf-b472-4f2e-a68e-1b1be9089fac/Pupa+outside+restaurant.jpg"),
  "about/about-2.jpg": q("163c455a-9d60-4c6a-ad94-cf540bf8f1e8/IMG_7003.jpg"),
  "about/about-3.jpg": q("35c1b579-e4c2-4639-aae6-f05eceab594a/IMG_6877.jpg"),
  "heroes/menus.jpg": q("2bd35ee9-63ac-4420-af44-5eccd8c24414/Meat+table.jpg"),
  "heroes/main-menu.jpg": q("0e9f73aa-e508-4e6d-b328-c5281a5ae85e/Pupa+Steak+-+001.jpg"),
  "heroes/lunch.jpg": q("536722fe-d0db-41ca-9651-dfab62b90a48/Burger+Picture.jpg"),
  "heroes/wine.jpg": q("155bf0fb-21cc-4805-afd3-f00a5c2d40eb/IMG_2276.jpeg"),
  "heroes/drink.jpg": q("bfc7d002-ecfc-4341-8830-3ba9fd2d1ee1/drink-menu_page-0001.jpg"),
  "heroes/dessert.jpg": q("a8358cdf-acb2-48f4-bd45-bdd27034861e/IMG_2600.jpeg"),
  "heroes/private-hire.jpg": q("eac1c05c-3444-482d-a7a5-9dc8da2a3910/tempImageYbLGpy.jpg"),
  "heroes/events.jpg": q("1737127353128-4R6NB04FUSGBQ2X17C1I/unsplash-image-fJQWrVnvrWw.jpg"),
  "gift-cards/hero.jpg": q("74b2cf5f-39bf-474b-a9bb-e7231a1bc82f/IMG_9196.jpg"),
  "gift-cards/card.png": `${BASE}/532ae05f-75cd-4ca3-92df-c6d449fe43ce/Untitled+%28500+x+100+px%29-2.png?format=1500w`,
};

/** Homepage gallery reel (puparestaurant.com) — first 6 used in site grid */
const GALLERY_REEL = [
  "3919327a-c155-4056-b0f0-822d9b2e314c/Steak+Carrousel+2.jpg",
  "60d0a77f-aa4f-4ba2-8672-e047999a6320/tempImageqWw5g5.png",
  "0e9f73aa-e508-4e6d-b328-c5281a5ae85e/Pupa+Steak+-+001.jpg",
  "04c297d8-efe1-45d2-81a9-450b7d6479e3/IMG_5430.jpg",
  "175f7e12-a103-4c64-b696-d90bf510ea99/Pupa+Steak+-+016.jpg",
  "cf8571a5-0ccf-446a-b6c1-0105d022a71e/F17FBA2C-A039-4CD9-BA34-1177FA138FCE.jpeg",
  "155bf0fb-21cc-4805-afd3-f00a5c2d40eb/IMG_2276.jpeg",
  "3383dcf9-52c3-4787-a09b-318629e8601e/tempImageAQGyyO.png",
  "a68ca5c7-b5e5-479e-883d-531ac41398c1/tempImage1DDMRn.jpg",
  "a1cdc279-1987-455f-9142-196e91f0be87/IMG_7386.JPG",
  "88837077-0178-49f9-878e-35f88ad96709/tempImageeyr4XM.jpg",
  "b30bd910-fc04-4e2e-83d5-52628a8dedca/tempImagecAp8jq.png",
  "a43ce913-572c-492c-993d-c545303d4002/IMG_2218.jpeg",
  "ed9b3424-7a56-4451-80dc-ef6fb8287032/IMG_0517.jpeg",
  "a07cf9b4-078a-4a79-82f8-bb1e511ea93d/tempImage9tMITb.png",
  "899f676a-f87f-43e2-bcbe-be1d91bd8b17/tempImageU2Ax0D.png",
  "a1a9adb4-b693-41d2-9517-cf703c13b3ab/tempImageVX5am9.png",
  "cd759955-283d-42fd-8400-5cc11cc02044/tempImagew3aOjI.png",
  "163c455a-9d60-4c6a-ad94-cf540bf8f1e8/IMG_7003.jpg",
  "f976ace7-a1c5-4b48-beed-4eeed4562148/IMG_6874.jpg",
  "35c1b579-e4c2-4639-aae6-f05eceab594a/IMG_6877.jpg",
  "536722fe-d0db-41ca-9651-dfab62b90a48/Burger+Picture.jpg",
  "2bd35ee9-63ac-4420-af44-5eccd8c24414/Meat+table.jpg",
  "59ac28e8-7ad4-4007-84c5-72bc5a89a47d/Party+Image+1.jpg",
  "40a4a227-8598-4b2d-89c1-60f06c7d8c95/Party+image+2.JPG",
  "ba7493cf-b472-4f2e-a68e-1b1be9089fac/Pupa+outside+restaurant.jpg",
  "636883a6-6f31-47f8-8ca9-abac42cfa405/Steak+Carrousel+1.jpg",
  "e46e9802-bfe5-4728-8e8b-b16cb52bf6f7/Tapas+1.jpg",
  "8e802979-dac1-45b9-898d-92c90c73e321/Tapas+2.jpg",
  "74b2cf5f-39bf-474b-a9bb-e7231a1bc82f/IMG_9196.jpg",
  "16a16c79-0468-484b-8bef-7ae425d6a612/IMG_9114.jpg",
  "6f10be68-3a1d-42b2-9c9e-e3cba645adf3/IMG_9123.jpg",
  "e8001259-28b4-4b2c-bed5-09acfeccf613/IMG_9145.jpg",
  "68522bde-1ac7-4bc3-88c7-0ab0e4ae4e13/IMG_9136.jpg",
  "71d4d9aa-5dab-41c1-87ed-99ced3cb04a7/Pupa+-+002.jpg",
  "b7a4765e-c88b-4f71-9efd-b56cc44b8373/Pupa+-+007.jpg",
  "49fdae99-a36f-4616-bbca-cf5b5e4d36ac/Pupa+-+018.jpg",
  "e0ca0e1c-f12f-47c6-9aea-908f8688e4bf/IMG_2631.JPG",
  "a8358cdf-acb2-48f4-bd45-bdd27034861e/IMG_2600.jpeg",
];

const EVENTS = [
  "1737656074652-YUEUNN0GS3C3PBYS0GU4/Pupa+20+Jan+-+013.jpg",
  "3603b59c-bc0b-4004-9d80-f05c0f77e5ba/Pupa+20+Jan+-+016.jpg",
  "1695989424340-7GW7DIIBVY104EE8NVSS/WhatsApp+Image+2023-09-29+at+13.08.51.jpeg",
  "1691250595452-GLQT9E246KIR523CR92W/AE7CF261-5C08-4985-B9DC-9AD012C8BF05_1_102_o.jpeg",
  "30783a0f-06aa-4365-9abd-0329a2cd22b3/IMG_8138.jpg",
];

const PRIVATE_HIRE = [
  "3216de19-fe24-44af-905d-f68ee76a0c50/tempImage3ecpp1.png",
  "651e7a30-2565-40be-a8b6-dd3f29f199ef/tempImageTIdPmz.png",
  "6bd6bc1a-8e1b-4b8c-a2f3-a5f674872596/tempImageCxNJDa.png",
  "47693139-83cb-4728-96cb-e8b393952710/tempImage4iRiig.png",
  "fd56201f-9fcd-4a6b-a0f4-27d740b031d7/tempImagep8ISxe.png",
  "4e74541b-60b8-4e4e-8402-5b6af2657562/IMG_2406.jpeg",
  "d66c1132-4e60-40e2-a7ee-2a82200fedd7/IMG_2272.jpeg",
];

const DRINK_MENU_PAGES = [
  "bfc7d002-ecfc-4341-8830-3ba9fd2d1ee1/drink-menu_page-0001.jpg",
  "60260f29-2f47-4295-b27f-35604348ce93/drink-menu_page-0002.jpg",
  "03d8ca2d-e67a-4bb2-8fe7-52ca87cf7a10/drink-menu_page-0003.jpg",
];

const root = path.join(process.cwd(), "public", "images");

function extFromFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".png") return ".png";
  if (ext === ".jpeg" || ext === ".jpg" || ext === ".JPG".toLowerCase()) return ".jpg";
  return ".jpg";
}

async function download(relPath, url) {
  const dest = path.join(root, relPath);
  await mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`OK ${relPath} (${Math.round(buf.length / 1024)} KB)`);
}

console.log("Downloading site images...\n");

for (const [rel, url] of Object.entries(SITE_IMAGE_MAP)) {
  await download(rel, url);
}

for (let i = 0; i < GALLERY_REEL.length; i++) {
  const file = GALLERY_REEL[i];
  const num = String(i + 1).padStart(2, "0");
  await download(`gallery/${num}${extFromFile(file)}`, q(file));
}

for (let i = 0; i < EVENTS.length; i++) {
  const file = EVENTS[i];
  const slug = decodeURIComponent(file.split("/").pop()).replace(/[^a-zA-Z0-9.-]+/g, "-").toLowerCase();
  await download(`events/${slug}`, q(file));
}

for (let i = 0; i < PRIVATE_HIRE.length; i++) {
  const file = PRIVATE_HIRE[i];
  const slug = decodeURIComponent(file.split("/").pop());
  await download(`private-hire/${slug}`, q(file));
}

for (let i = 0; i < DRINK_MENU_PAGES.length; i++) {
  await download(`menus/drink-page-${i + 1}.jpg`, q(DRINK_MENU_PAGES[i]));
}

console.log("\nDone.");
