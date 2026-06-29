import Link from "next/link";

const menus = [
  {
    title: "Wine List",
    description: "A curated selection of Mediterranean wines to complement your meal.",
    href: "/s/wine-list-26.pdf",
    icon: "🍷",
  },
  {
    title: "Lunch Menu",
    description: "Light Mediterranean favourites, perfect for a midday escape.",
    href: "/s/PUPA-Lunch-menu.pdf",
    icon: "☀️",
  },
  {
    title: "Main Menu",
    description: "Our signature charcoal-grilled meats and Mediterranean classics.",
    href: "/s/PUPA-MENU-SUMMER-26.pdf",
    icon: "🔥",
  },
  {
    title: "Dessert Menu",
    description: "Sweet endings crafted with care and Mediterranean inspiration.",
    href: "/s/PUPA-Dessert-Menu-25.pdf",
    icon: "🍮",
  },
  {
    title: "Drink Menu",
    description: "Cocktails, spirits, soft drinks and more.",
    href: "/drink-menu",
    icon: "🥂",
  },
];

export default function MenusPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/e46e9802-bfe5-4728-8e8b-b16cb52bf6f7/Tapas+1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-pupa-dark/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3">Explore</p>
          <h1 className="font-serif text-4xl md:text-5xl text-pupa-cream font-medium">Our Menus</h1>
          <div className="w-12 h-px bg-pupa-gold mt-4" />
        </div>
      </section>

      {/* Menus Grid */}
      <section className="py-20 bg-pupa-beige">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menus.map((menu) => (
              <Link
                key={menu.title}
                href={menu.href}
                target={menu.href.endsWith(".pdf") ? "_blank" : undefined}
                className="flex items-start gap-5 bg-white border border-pupa-warm p-6 hover:border-pupa-gold hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-3xl">{menu.icon}</span>
                <div>
                  <h2 className="font-serif text-pupa-brown text-xl mb-2 group-hover:text-pupa-accent transition-colors">
                    {menu.title}
                  </h2>
                  <p className="font-sans text-pupa-brown/60 text-sm leading-relaxed">{menu.description}</p>
                  <span className="inline-block mt-3 font-sans text-xs tracking-wider uppercase text-pupa-gold">
                    {menu.href.endsWith(".pdf") ? "Download PDF →" : "View Menu →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Note */}
          <p className="text-center font-sans text-pupa-brown/40 text-sm mt-12">
            Menus are subject to seasonal changes. Please ask your server about today&apos;s specials.
          </p>
        </div>
      </section>
    </>
  );
}
