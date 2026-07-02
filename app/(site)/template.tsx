"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/constants";

export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Faqja kryesore hapet menjëherë — pa animacion që lë boshllëk midis navbar-it
  if (isHome) {
    return <>{children}</>;
  }

  // Faqet e tjera: vetëm fade, pa lëvizje vertikale (shmang gap-in e bardhë)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
