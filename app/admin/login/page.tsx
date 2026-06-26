"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-pupa-brown flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-pupa-cream mb-2">Pupa Restaurant</h1>
          <p className="font-sans text-pupa-gold text-xs tracking-[0.3em] uppercase">Admin Panel</p>
          <div className="w-12 h-px bg-pupa-gold mx-auto mt-4" />
        </div>

        {/* Form */}
        <div className="bg-pupa-beige/10 border border-pupa-gold/20 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-sans text-xs tracking-wider uppercase text-pupa-warm mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pupa-gold" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-pupa-dark/30 border border-pupa-gold/20 text-pupa-cream font-sans text-sm focus:outline-none focus:border-pupa-gold transition-colors"
                  placeholder="admin@puparestaurant.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs tracking-wider uppercase text-pupa-warm mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pupa-gold" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-pupa-dark/30 border border-pupa-gold/20 text-pupa-cream font-sans text-sm focus:outline-none focus:border-pupa-gold transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-pupa-gold/60 hover:text-pupa-gold"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-sans text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-pupa-warm/40 text-xs mt-6">
          Protected area — Pupa Restaurant & Bar
        </p>
      </motion.div>
    </div>
  );
}
