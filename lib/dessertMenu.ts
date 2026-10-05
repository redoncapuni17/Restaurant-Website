import type { MenuItem } from "./menuTypes";

export type { MenuItem };

export const DESSERT_ITEMS: MenuItem[] = [
  {
    name: "Baked Cheesecake",
    price: "8",
    description:
      "vanilla cheesecake with hint of lemon, topped with homemade fruit compote. Served with vanilla ice cream.",
  },
  {
    name: "Chocolate Lava Cake",
    price: "9",
    description:
      "chocolate cake with rich and intense liquid chocolate core. Baked to order so please allow 15min waiting time.",
  },
  {
    name: "Crème Brûlée",
    price: "7",
    description: "custard crème base topped with caramelised brown sugar.",
  },
  {
    name: "Tiramisu",
    price: "8",
    description:
      "coffee flavoured dessert with layers of mascarpone cream and ladyfingers biscuits.",
  },
  {
    name: "Ice Cream",
    price: "7",
    description:
      "Madagascan vanilla ice cream with berry compote and digestive biscuit.",
  },
];

export const COFFEE_ITEMS: MenuItem[] = [
  { name: "Espresso / Doppio", price: "3 / 3.5" },
  { name: "Macchiato", price: "3.5" },
  { name: "Cortado", price: "3.5" },
  { name: "Cappuccino", price: "3.5" },
  { name: "Latte", price: "3.5" },
  {
    name: "Teas",
    price: "3",
    description: "ENGLISH BREAKFAST, EARL GREY, GREEN, PEPPERMINT",
  },
];

export const ALCOHOLIC_COFFEE_ITEMS: MenuItem[] = [
  { name: "Irish Coffee", price: "9" },
  { name: "Baileys Coffee", price: "9" },
  { name: "Brandy Coffee", price: "9" },
  { name: "Espresso Martini", price: "12" },
  { name: "Espresso Choctini", price: "11" },
];

export const DESSERT_WINE_ITEMS: MenuItem[] = [
  {
    name: "Castelnau de Suduiraut (France)",
    price: "7",
    priceSecondary: "43",
    description:
      "aromas of fragrant orange blossom, spices and fudge.",
  },
  {
    name: "Araldica Moscato d'Asti (Italy)",
    price: "",
    priceSecondary: "28",
    description:
      "delicate and aromatic with fine bubbles. Fresh peach, pear and elegant zest.",
  },
];
