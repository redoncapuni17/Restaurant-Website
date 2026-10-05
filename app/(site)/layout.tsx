import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";

// Layout i përbashkët për faqet publike. Navbar dhe Footer mbeten të montuar
// gjatë navigimit — ndërrohet vetëm përmbajtja.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HashScroll />
      <Navbar />
      <main className="bg-pupa-beige">{children}</main>
      <Footer />
    </>
  );
}
