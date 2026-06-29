// Gjendje ngarkimi e menjëhershme gjatë navigimit drejt faqeve dinamike.
// Shfaqet sapo klikohet linku (pa pritur serverin) → navigim që ndihet i shpejtë.
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-pupa-beige">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-pupa-gold/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-pupa-gold rounded-full animate-spin" />
      </div>
    </div>
  );
}
