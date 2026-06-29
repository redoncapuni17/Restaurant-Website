import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Layout i përbashkët për faqet publike. Navbar-i dhe Footer-i rrinë të montuar
// gjatë navigimit (si te admini) → ndërrohet vetëm përmbajtja, pa remount dhe
// pa rifetch të Footer-it. Kjo e bën navigimin të menjëhershëm.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
