export default function Loading() {
  return (
    <div className="min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center bg-pupa-beige gap-4">
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        <div className="absolute inset-0 border-2 border-pupa-gold/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-pupa-gold rounded-full animate-spin" />
      </div>
      <p className="font-sans text-pupa-brown/40 text-xs tracking-widest uppercase">Loading</p>
    </div>
  );
}
