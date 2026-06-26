"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/components/admin/AdminShell";

// Cache në memorie — navigimi mes faqeve admin nuk pret auth përsëri
let authReady = false;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [ready, setReady] = useState(isLogin || authReady);

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }

    if (authReady) {
      setReady(true);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      if (!session) {
        router.replace("/admin/login");
      } else {
        authReady = true;
        setReady(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        authReady = false;
        if (!isLogin) router.replace("/admin/login");
      } else {
        authReady = true;
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!ready) return null;

  return <AdminShell>{children}</AdminShell>;
}
