export interface StandardWineItem {
  name: string;
  ml175?: string;
  ml250?: string;
  bottle: string;
}

export interface SparklingWineItem {
  name: string;
  small?: string;
  smallLabel?: string;
  bottle: string;
}

export interface WineCategory {
  id: string;
  eyebrow: string;
  title: string;
  type: "standard" | "sparkling";
  items: StandardWineItem[] | SparklingWineItem[];
}

export const RED_WINES: WineCategory = {
  id: "red",
  eyebrow: "By the Glass",
  title: "Red",
  type: "standard",
  items: [
    { name: "House Red", ml175: "7.5", ml250: "9", bottle: "26" },
    { name: "Merlot", ml175: "9", ml250: "11", bottle: "30" },
    { name: "Nero D'Avola", ml175: "10", ml250: "12.2", bottle: "34" },
    { name: "Primitivo", bottle: "34" },
    { name: "Malbec", bottle: "36" },
    { name: "Lisboa Red", bottle: "36" },
    { name: "Rioja Reserva", bottle: "38" },
    { name: "Valpolicella", bottle: "58" },
  ],
};

export const WHITE_WINES: WineCategory = {
  id: "white",
  eyebrow: "By the Glass",
  title: "White",
  type: "standard",
  items: [
    { name: "House White", ml175: "7.5", ml250: "9", bottle: "26" },
    { name: "Pinot Grigio", ml175: "9", ml250: "11", bottle: "30" },
    { name: "Sauvignon Blanc", ml175: "10", ml250: "11.5", bottle: "32" },
    { name: "Verdejo", bottle: "34" },
    { name: "Gavi", bottle: "42" },
  ],
};

export const ROSE_WINES: WineCategory = {
  id: "rose",
  eyebrow: "By the Glass",
  title: "Rosé",
  type: "standard",
  items: [
    { name: "Pinot Grigio Blush", ml175: "8", ml250: "10", bottle: "28" },
    { name: "Lua Nova Vinho Verde Rosé", ml175: "9.4", ml250: "11.6", bottle: "32" },
  ],
};

export const SPARKLING_WINES: WineCategory = {
  id: "sparkling",
  eyebrow: "Bubbles",
  title: "Sparkling & Dessert Wine",
  type: "sparkling",
  items: [
    { name: "Prosecco", small: "7.5", smallLabel: "125ml", bottle: "35" },
    { name: "Moet & Chandon Champagne", bottle: "85" },
    { name: "Moscato D'Asti", bottle: "26" },
    { name: "Sauternes", small: "7", smallLabel: "50ml", bottle: "43" },
  ],
};

export const WINE_CATEGORIES: WineCategory[] = [
  RED_WINES,
  WHITE_WINES,
  ROSE_WINES,
  SPARKLING_WINES,
];

export const WINE_MENU_FOOTER =
  "All prices in GBP (£). Please drink responsibly.";
