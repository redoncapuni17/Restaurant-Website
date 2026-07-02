export type DietaryTag = "V" | "VG" | "GF";

export interface MainMenuItem {
  name: string;
  price: string;
  description?: string;
  dietary?: DietaryTag[];
  favorite?: boolean;
  note?: string;
}

export interface MainMenuSection {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  note?: string;
  items: MainMenuItem[];
}

export const STARTERS_SECTION: MainMenuSection = {
  id: "starters",
  eyebrow: "To Begin",
  title: "Starters / Small Plates",
  items: [
    {
      name: "Mediterranean Olives",
      price: "4",
      dietary: ["VG", "GF"],
    },
    {
      name: "Grilled Halloumi",
      price: "8",
      dietary: ["V", "GF"],
      description: "With organic olive oil and basil dressing.",
    },
    {
      name: "Blue Cheese Mushrooms",
      price: "9",
      dietary: ["V"],
      description: "Cooked in creamy blue cheese sauce, served with sourdough bread.",
    },
    {
      name: "Goat Cheese Fritters",
      price: "8",
      dietary: ["V"],
      description: "Breaded goat cheese, sweet chilli sauce.",
    },
    {
      name: "Saganaki Feta",
      price: "7",
      dietary: ["V"],
      favorite: true,
      description:
        "Fried Greek feta cheese wrapped in crispy filo pastry, covered in honey and sesame seeds.",
    },
    {
      name: "Calamari",
      price: "9",
      description: "Deep fried squid rings, served with tartar sauce.",
    },
    {
      name: "Stuffed Croquettes",
      price: "7",
      description: "Potato croquettes with bacon and mozzarella, served with garlic mayo.",
    },
    {
      name: "Spicy Chicken Wings",
      price: "7",
      dietary: ["GF"],
      description: "Chargrilled wings marinated in herbs and spices.",
    },
    {
      name: "Mediterranean Dips",
      price: "12",
      dietary: ["V"],
      favorite: true,
      description:
        "Perfect for sharing (for 2). A selection of 3 dips — tzatziki, spicy tomato salsa and hummus — served with pitta bread.",
    },
  ],
};

export const GRILL_SECTION: MainMenuSection = {
  id: "grill",
  eyebrow: "From the Charcoal",
  title: "Grill",
  note: "We recommend ordering a side dish to go along any of the dishes below.",
  items: [
    {
      name: "Brochettes de Poulet",
      price: "22",
      dietary: ["GF"],
      description:
        "2 skewers of chicken breast, marinated in olive oil, garlic, lemon and Mediterranean herbs. Served with a salad garnish.",
    },
    {
      name: "Brochettes d'Agneau",
      price: "24",
      dietary: ["GF"],
      description:
        "2 skewers of lamb, marinated in olive oil, garlic, and Mediterranean herbs. Served with a salad garnish.",
    },
    {
      name: "Mediterranean Meat Platter",
      price: "26",
      description:
        "Signature marinated lamb and chicken skewers with Spanish chorizo. Served with salad garnish.",
    },
    {
      name: "Lamb Supreme",
      price: "30",
      dietary: ["GF"],
      favorite: true,
      description:
        "Prime tender lamb cutlets smothered in herbs and spices. Chargrilled and served with salad garnish.",
    },
    {
      name: "Lamb Sage & Rosemary",
      price: "30",
      description: "Chargrilled lamb cutlets covered in sage and rosemary cream sauce.",
    },
    {
      name: "Pollo a la Crema",
      price: "24",
      dietary: ["GF"],
      description:
        "Marinated grilled chicken breast in white wine cream sauce with bacon and mushrooms.",
    },
    {
      name: "Pork Chops",
      price: "20",
      description:
        "Juicy chops in honey and mustard marinade. Grilled over charcoal and served with salad garnish.",
    },
    {
      name: "King Prawns",
      price: "20",
      dietary: ["GF"],
      description:
        "Mediterranean king prawns, brushed with garlic butter. Served with salad garnish.",
    },
    {
      name: "Grilled Sea Bass",
      price: "24",
      dietary: ["GF"],
      favorite: true,
      description:
        "Full fish (bone-in), perfectly grilled. Brushed with garlic butter. Served with salad garnish.",
    },
    {
      name: "Falafel Plate",
      price: "20",
      dietary: ["V"],
      note: "Vegan option available",
      description:
        "Fried falafel balls, grilled peppers, grilled mushroom, crispy salad leaves, tomato and cucumber salad, hummus, garlic & herb sauce.",
    },
  ],
};

export const STEAKS_SECTION: MainMenuSection = {
  id: "steaks",
  eyebrow: "Dry Aged",
  title: "Steaks",
  intro:
    "Artisan dry-aged steaks. Hand-selected prime cuts, meticulously dry-aged in our on-site aging cabinet for 28 to 45 days. This traditional process enhances natural marbling, yielding a profound depth of flavour, subtle nuttiness, and unmatched tenderness.",
  note: "All steaks are served with a portion of skin on chips and a choice of 1 sauce: peppercorn, blue cheese (GF). Please note: no swaps of side dishes.",
  items: [
    {
      name: "Ribeye",
      price: "34",
      dietary: ["GF"],
      favorite: true,
      description:
        "Approx. 350g / 12.5 oz. Known as the butcher's favourite, juicy and tender. Dry aged.",
    },
    {
      name: "Sirloin",
      price: "32",
      dietary: ["GF"],
      description:
        "Approx. 350g / 12.5 oz. Rich meat, full of flavour with just the right amount of fat. Dry aged.",
    },
    {
      name: "Tomahawk",
      price: "72",
      dietary: ["GF"],
      description:
        "Approx. 1kg. From our dry ageing cabinet. Huge bone-in marbled steak, rich, juicy and full of flavour. Recommended to be cooked rare or medium rare.",
    },
  ],
};

export const BURGERS_SECTION: MainMenuSection = {
  id: "burgers",
  eyebrow: "Handcrafted",
  title: "Burgers",
  note: "All burgers are served with a portion of skin on chips.",
  items: [
    {
      name: "Pupa Burger",
      price: "22",
      favorite: true,
      description:
        "Angus beef, bacon, lettuce, tomato, grilled pepper, cheese, mayo, homemade cheese sauce.",
    },
    {
      name: "Whiskey Burger",
      price: "22",
      description: "Angus beef, bacon, lettuce, tomato, cheese, BBQ whiskey & onion sauce.",
    },
    {
      name: "Chicken Burger",
      price: "22",
      description:
        "Grilled chicken breast, sweet chilli, tomato, lettuce, cheese, mayo. Make it spicy with our signature spicy marinate.",
    },
    {
      name: "Halloumi Burger",
      price: "22",
      dietary: ["V"],
      description: "Halloumi, mushroom, peppers, tomato, basil sauce, mayo, lettuce.",
    },
  ],
};

export const SHARING_SECTION: MainMenuSection = {
  id: "sharing",
  eyebrow: "For the Table",
  title: "Sharing",
  intro: "Mediterranean cuisine is all about sharing, so why not try our sharing platters!",
  note: "The meat feast is available in multiples of two only. With every feast, add 2 extra sides.",
  items: [
    {
      name: "Meat Feast for 2",
      price: "56",
      favorite: true,
      description:
        "Tender chicken and lamb skewers, pork chops, chicken wings, and Spanish chorizo on a bed of salad. Served with a choice of 2 sides.",
    },
  ],
};

export const SIDES_SECTION: MainMenuSection = {
  id: "sides",
  eyebrow: "Accompaniments",
  title: "Sides",
  items: [
    { name: "Skin on Chips", price: "4", dietary: ["V", "VG"] },
    { name: "Sweet Potato Fries", price: "6", dietary: ["V", "VG"] },
    {
      name: "Mediterranean Rice",
      price: "4",
      dietary: ["GF"],
      description: "Herbs and spices, turmeric, garlic butter, carrots and peppers.",
    },
    {
      name: "Greek Salad",
      price: "6",
      dietary: ["GF", "V"],
      favorite: true,
      description: "Feta, olives, tomato, cucumber, onion, peppers, oregano, olive oil.",
    },
    {
      name: "Mixed Salad",
      price: "4",
      dietary: ["GF", "V"],
      description: "Mixed leaves, tomato, cucumber, onion, pepper, homemade dressing.",
    },
    {
      name: "Tender Stem Broccoli",
      price: "6",
      description: "In garlic butter.",
    },
    {
      name: "Potatos & Carrots",
      price: "5",
      dietary: ["GF", "V"],
      description: "Roasted in garlic butter and Mediterranean herbs.",
    },
  ],
};

export const SAUCES_SECTION: MainMenuSection = {
  id: "sauces",
  eyebrow: "Extras",
  title: "Sauces & Dips",
  note: "All homemade",
  items: [
    { name: "Peppercorn Sauce", price: "2" },
    { name: "Blue Cheese Sauce", price: "2" },
    { name: "Hummus", price: "4" },
    { name: "Tzatziki Dip", price: "4" },
    { name: "Spicy Tomato Salsa", price: "4" },
  ],
};

export const MAIN_MENU_SECTIONS: MainMenuSection[] = [
  STARTERS_SECTION,
  GRILL_SECTION,
  STEAKS_SECTION,
  BURGERS_SECTION,
  SHARING_SECTION,
  SIDES_SECTION,
  SAUCES_SECTION,
];

export const MAIN_MENU_FOOTER =
  "(V) Vegetarian · (VG) Vegan · (GF) Gluten Free. If you have a food allergy or special dietary requirements, please inform a member of staff before ordering.";
