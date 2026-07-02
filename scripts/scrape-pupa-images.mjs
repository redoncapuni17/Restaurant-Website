const pages = [
  ["home", "https://www.puparestaurant.com/"],
  ["menus", "https://www.puparestaurant.com/menus"],
  ["main-menu", "https://www.puparestaurant.com/main-menu"],
  ["lunch-menu", "https://www.puparestaurant.com/lunch-menu"],
  ["wine-list", "https://www.puparestaurant.com/wine-list"],
  ["drink-menu", "https://www.puparestaurant.com/drink-menu"],
  ["dessert-menu", "https://www.puparestaurant.com/dessert-menu"],
  ["events", "https://www.puparestaurant.com/events"],
  ["gift-cards", "https://www.puparestaurant.com/gift-cards"],
  ["private-hire", "https://www.puparestaurant.com/private-hire"],
];

const re =
  /https:\/\/images\.squarespace-cdn\.com\/content\/v1\/63750e9f0d23390c9402c839\/[^"'\s)]+\.(?:jpg|jpeg|png|JPG|webp)/g;

for (const [name, url] of pages) {
  const res = await fetch(url);
  const html = await res.text();
  const urls = [
    ...new Set((html.match(re) || []).map((u) => u.split("?")[0])),
  ];
  console.log(`\n### ${name} (${urls.length})`);
  for (const u of urls) {
    console.log(`${u.split("/").pop()} -> ${u}?format=1500w`);
  }
}
