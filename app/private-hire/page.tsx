import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const features = [
  { icon: "🍽", title: "Exclusive Dining", desc: "The entire restaurant is yours for a truly private experience." },
  { icon: "🥩", title: "Bespoke Menu", desc: "Work with our chefs to create a custom Mediterranean menu." },
  { icon: "🍷", title: "Curated Drinks", desc: "From Mediterranean wines to signature cocktails." },
  { icon: "✨", title: "Event Planning", desc: "Our team will help coordinate every detail of your event." },
];

export default function PrivateHirePage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/49fdae99-a36f-4616-bbca-cf5b5e4d36ac/Pupa+-+018.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pupa-dark/70 to-pupa-dark/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">Celebrate in Style</p>
          <h1 className="font-serif text-5xl md:text-6xl text-pupa-cream font-medium leading-tight mb-4">
            Private Hire
          </h1>
          <div className="w-16 h-px bg-pupa-gold mb-6" />
          <p className="font-sans text-pupa-warm max-w-xl text-sm md:text-base leading-relaxed mb-8">
            Host your special occasion at Pupa. Whether it&apos;s a birthday, anniversary, corporate dinner, or celebration — 
            we create unforgettable Mediterranean experiences.
          </p>
          <a
            href="mailto:info@puparestaurant.com?subject=Private Hire Enquiry"
            className="px-8 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream transition-all duration-300"
          >
            Enquire Now
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-pupa-beige">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">What We Offer</p>
            <h2 className="font-serif text-4xl text-pupa-brown font-medium">The Pupa Experience</h2>
            <div className="w-12 h-px bg-pupa-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map(f => (
              <div key={f.title} className="flex gap-5 p-6 bg-white border border-pupa-warm">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-serif text-pupa-brown text-xl mb-2">{f.title}</h3>
                  <p className="font-sans text-pupa-brown/60 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-pupa-brown text-center p-10 md:p-14">
            <h3 className="font-serif text-pupa-cream text-3xl mb-3">Ready to Plan Your Event?</h3>
            <p className="font-sans text-pupa-warm text-sm mb-8 max-w-md mx-auto">
              Get in touch with us to discuss your requirements. We&apos;ll create a bespoke package just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@puparestaurant.com?subject=Private Hire Enquiry"
                className="px-8 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream transition-all duration-300"
              >
                Email Us
              </a>
              <a
                href="tel:01614004830"
                className="px-8 py-3.5 border border-pupa-cream text-pupa-cream font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream hover:text-pupa-dark transition-all duration-300"
              >
                0161 400 4830
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
