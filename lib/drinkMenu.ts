export interface DrinkItem {
  name: string;
  price: string;
  description?: string;
}

export interface DrinkSection {
  id: string;
  title: string;
  titleStyle: "script" | "serif" | "block";
  note?: string;
  priceNote?: string;
  items: DrinkItem[];
}

export const COCKTAIL_SECTIONS: DrinkSection[] = [
  {
    id: "signature",
    title: "Signature Cocktails",
    titleStyle: "script",
    items: [
      { name: "Pupa's Passions", price: "12", description: "VODKA, PASSOA, RASPBERRY, PASSIONFRUIT, LEMON, LEMONADE" },
      { name: "Spicy Surprice", price: "11", description: "SPICED RUM, COINTREAU, LEMON, HONEY, LEMONADE" },
      { name: "Tequila Loca", price: "11", description: "TEQUILA, PASSIONFRUIT, LIME, LEMONADE" },
      { name: "Rhubarb Raspberry", price: "11", description: "PINK GIN, VANILLA, LIME, RHUBARB, RASPBERRY, TONIC" },
      { name: "Cherry'd Pepper", price: "11", description: "CHERRY SPICED RUM, DISARONNO, LEMON, COKE" },
      { name: "Mango Spritz", price: "10", description: "MANGO, PROSECCO, SODA" },
      { name: "Espresso Choctini", price: "12", description: "ESPRESSO, BAILEYS, VODKA, CHOCOLATE" },
    ],
  },
  {
    id: "classic",
    title: "Classic Coctails",
    titleStyle: "serif",
    items: [
      { name: "Pornstar Martini", price: "12" },
      { name: "Mojito", price: "12", description: "CLASSIC / RASPBERRY / PASSIONFRUIT / STRAWBERRY" },
      { name: "Margarita / Spicy Margarita", price: "12" },
      { name: "Old Fashioned", price: "12", description: "CLASSIC / CHERRY" },
      { name: "Aperol Spritz", price: "10" },
      { name: "Hugo Spritz", price: "10", description: "ELDERFLOWER, PROSECCO, SODA, MINT, LIME" },
      { name: "Espresso Martini", price: "12" },
      { name: "Sex on the Beach", price: "12" },
    ],
  },
];

export const SOFT_DRINKS_SECTION: DrinkSection = {
  id: "soft-drinks",
  title: "Soft Drinks",
  titleStyle: "script",
  items: [
    { name: "Coca Cola / Coke Zero / Diet Coke", price: "4" },
    { name: "San Pellegrino", price: "4", description: "LEMON / ORANGE / BLOOD ORANGE" },
    { name: "Sparkling Lemonade", price: "4", description: "FENTIMANS VICTORIAN LEMONADE" },
    { name: "Juice Bottles", price: "4", description: "FROBISHERS — APPLE / ORANGE" },
    { name: "Water 500ml", price: "4", description: "STILL / SPARKLING" },
  ],
};

export const BEER_BOTTLES_SECTION: DrinkSection = {
  id: "beer-bottles",
  title: "Beer Bottles",
  titleStyle: "block",
  note: "ALL BEER BOTTLES ARE SOLD IN QUANTITIES OF 330ML",
  items: [
    { name: "Mythos (Greek)", price: "6", description: "THE TASTE OF HOLIDAY" },
    { name: "Estrella Damm (Spanish)", price: "5.5" },
    { name: "Peroni (Italian)", price: "5.5" },
    { name: "Corona (Mexican)", price: "5.5" },
    { name: "Rekorderlig Fruit Ciders (GF)", price: "6.5", description: "STRAWBERRY&LIME OR WILD BERRY" },
    { name: "San Miguel 0% Alc.", price: "5" },
  ],
};

export const DRAUGHT_BEER_SECTION: DrinkSection = {
  id: "draught-beer",
  title: "Draught Beer",
  titleStyle: "script",
  priceNote: "PINT / 1/2 PINT",
  items: [
    { name: "Cruzcampo Lager 4.4%", price: "6.5 / 4.5", description: "SPANISH" },
  ],
};

export const SPIRITS_SECTIONS: DrinkSection[] = [
  {
    id: "whiskey",
    title: "Whiskey & Bourbon",
    titleStyle: "serif",
    priceNote: "50ML",
    items: [
      { name: "Jameson", price: "10", description: "IRISH" },
      { name: "Busker", price: "10", description: "IRISH" },
      { name: "Glenfiddich 12yr", price: "12", description: "SCOTCH" },
      { name: "The Woodsman", price: "11", description: "SCOTCH" },
      { name: "Monkey Shoulder", price: "12", description: "SCOTCH" },
      { name: "Johnnie Walker Black", price: "11", description: "SCOTCH" },
      { name: "Johnnie Walker Blue", price: "28", description: "SCOTCH" },
      { name: "Buffalo Trace", price: "12", description: "AMERICAN" },
      { name: "Jack Daniels No.7", price: "10", description: "AMERICAN" },
      { name: "Jim Beam", price: "10", description: "AMERICAN" },
      { name: "Maker's Mark", price: "12", description: "AMERICAN" },
      { name: "Gentleman Jack", price: "13", description: "AMERICAN" },
      { name: "Woodford Reserve", price: "14", description: "AMERICAN" },
    ],
  },
  {
    id: "cognac",
    title: "Cognac & Brandy",
    titleStyle: "serif",
    items: [
      { name: "Hennessy VS", price: "14", description: "COGNAC" },
      { name: "Courvoisier VS", price: "12", description: "COGNAC" },
      { name: "St Remy XO", price: "13", description: "BRANDY" },
      { name: "Vecchia Romagna", price: "10", description: "BRANDY" },
      { name: "Metaxa", price: "12", description: "BRANDY" },
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    titleStyle: "serif",
    priceNote: "50ML",
    items: [
      { name: "Absolut", price: "9" },
      { name: "Absolut Vanilla", price: "10" },
      { name: "Belvedere", price: "12" },
      { name: "Smirnoff", price: "8" },
      { name: "Zubrowka Bison", price: "10" },
    ],
  },
  {
    id: "gin",
    title: "Gin",
    titleStyle: "serif",
    items: [
      { name: "Bombay Sapphire", price: "11" },
      { name: "Gordons", price: "10" },
      { name: "Gordons Pink", price: "10" },
      { name: "Tanqueray", price: "11" },
      { name: "Hendricks", price: "13" },
    ],
  },
  {
    id: "rum",
    title: "Rum",
    titleStyle: "serif",
    items: [
      { name: "Bacardi", price: "9" },
      { name: "Bacardi Spiced", price: "9" },
      { name: "Old J Cherry", price: "10" },
      { name: "Kraken Black Spiced", price: "10" },
    ],
  },
  {
    id: "liqueurs",
    title: "Liqueurs",
    titleStyle: "serif",
    items: [
      { name: "Aperol", price: "8" },
      { name: "Baileys", price: "8" },
      { name: "Chambord", price: "8" },
      { name: "Cointreau", price: "8" },
      { name: "Disaronno", price: "10" },
      { name: "Jägermeister", price: "8" },
      { name: "Kahlua", price: "8" },
      { name: "Limoncello", price: "8" },
      { name: "St Germain", price: "10" },
      { name: "Sambuca", price: "8" },
    ],
  },
];
