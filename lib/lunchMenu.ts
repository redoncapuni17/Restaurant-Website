import type { DietaryTag } from "./mainMenu";

export interface LunchMenuItem {
  name: string;
  price: string;
  description?: string;
  dietary?: DietaryTag[];
}

export interface LunchMenuSection {
  id: string;
  title: string;
  note?: string;
  items: LunchMenuItem[];
}

export const SMALL_PLATES_SECTION: LunchMenuSection = {
  id: "small-plates",
  title: "Small Plates",
  note: "Any 3 for £16",
  items: [
    {
      name: "Patatas Bravas",
      price: "8",
      dietary: ["V"],
      description: "Fried chunks of potato with spicy tomato salsa and garlic aioli.",
    },
    {
      name: "Calamari",
      price: "10",
      description: "Lightly battered squid rings fried to golden perfection with tartar sauce.",
    },
    {
      name: "Spicy Wings",
      price: "8",
      dietary: ["GF"],
      description: "Mid wings in spicy marinade — charcoal grilled.",
    },
    {
      name: "Grilled Halloumi",
      price: "9",
      dietary: ["V", "GF"],
      description: "Grilled halloumi cheese with garlic basil sauce.",
    },
    {
      name: "Goat Cheese Fritter",
      price: "9",
      dietary: ["V"],
      description: "Goat cheese medallion, deep fried served with sweet chilli sauce.",
    },
    {
      name: "Feta Saganaki",
      price: "9",
      dietary: ["V"],
      description:
        "Feta cheese wrapped in Greek filo pastry, fried and covered in honey & sesame seeds.",
    },
    {
      name: "Croquettas",
      price: "8",
      description: "Potato croquettes with cheese and bacon. Served with garlic aioli.",
    },
  ],
};

export const BIG_PLATES_SECTION: LunchMenuSection = {
  id: "big-plates",
  title: "Big Plates",
  items: [
    {
      name: "Chicken Souvlaki",
      price: "16",
      description: "Marinated chicken skewer cooked over charcoal, salad, pitta, tzatziki.",
    },
    {
      name: "Lamb Souvlaki",
      price: "17",
      description: "Marinated lamb skewer cooked over charcoal, salad, pitta, tzatziki.",
    },
    {
      name: "Grilled Chicken Breast",
      price: "16",
      dietary: ["GF"],
      description:
        "Marinated chicken breast over Greek village salad (feta, olives, tomato, cucumber, onion, bell peppers).",
    },
    {
      name: "Cheeseburger",
      price: "16",
      description: "Angus beef, bacon, cheese, pickle, tomato and salad.",
    },
    {
      name: "King Prawns Pasta",
      price: "18",
      description: "King prawns in creamy tomato sauce with garlic, chilli & onion.",
    },
    {
      name: "Beef Ragu Pasta",
      price: "16",
      description: "Slow cooked beef ragu with tomato, onion & garlic.",
    },
    {
      name: "Falafel Salad",
      price: "15",
      dietary: ["V"],
      description:
        "Falafel on mixed leaf salad with homemade salad dressing, tomato, peppers and cucumber.",
    },
  ],
};

export const LUNCH_ADDONS: LunchMenuItem[] = [
  { name: "Skin-on Chips", price: "3", dietary: ["V"] },
  { name: "Mediterranean Rice", price: "3", dietary: ["V", "GF"] },
];

export const LUNCH_MENU_FOOTER =
  "(V) Vegetarian · (GF) Gluten Free. If you suffer from any food allergies or intolerances, please make your server aware before placing your order. Due to the size of our kitchen, we cannot guarantee a 100% allergen-free environment.";
