import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GiftCardsPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-pupa-brown" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/74b2cf5f-39bf-474b-a9bb-e7231a1bc82f/IMG_9196.jpg')`,
            backgroundSize: "cover",
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3">Give the Gift of</p>
          <h1 className="font-serif text-4xl md:text-5xl text-pupa-cream font-medium">Gift Cards</h1>
          <div className="w-12 h-px bg-pupa-gold mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-pupa-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">Mediterranean Dining</p>
          <h2 className="font-serif text-3xl text-pupa-brown font-medium mb-6">
            The Perfect Gift for Food Lovers
          </h2>
          <div className="w-12 h-px bg-pupa-gold mx-auto mb-8" />
          <p className="font-sans text-pupa-brown/70 leading-relaxed mb-10">
            Give someone special the experience of Pupa Restaurant — freshly grilled Mediterranean meats, 
            warm atmosphere, and unforgettable flavours in the heart of Manchester&apos;s Northern Quarter.
          </p>

          {/* Gift Card Visual */}
          <div className="max-w-sm mx-auto mb-12">
            <img
              src="https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/532ae05f-75cd-4ca3-92df-c6d449fe43ce/Untitled+%28500+x+100+px%29-2.png"
              alt="Pupa Gift Card"
              className="w-full"
            />
          </div>

          {/* In-store notice */}
          <div className="bg-pupa-brown text-pupa-cream py-8 px-10 mb-8">
            <p className="font-sans text-pupa-gold text-xs tracking-widest uppercase mb-3">Available In Store</p>
            <p className="font-serif text-2xl mb-2">Physical Gift Cards</p>
            <p className="font-sans text-pupa-warm text-sm">
              Visit us at 37 Turner Street, Manchester NQ to purchase a physical gift card — the perfect present for any occasion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01614004830"
              className="px-8 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-sm tracking-widest uppercase hover:bg-pupa-dark transition-all duration-300"
            >
              Call to Order: 0161 400 4830
            </a>
            <a
              href="mailto:info@puparestaurant.com?subject=Gift Card Enquiry"
              className="px-8 py-3.5 border border-pupa-brown text-pupa-brown font-sans text-sm tracking-widest uppercase hover:bg-pupa-brown hover:text-pupa-cream transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
