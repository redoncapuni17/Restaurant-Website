"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Save, Loader2 } from "lucide-react";
import type { OpeningHours } from "@/types";

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AdminHours() {
  const [hours, setHours] = useState<OpeningHours[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchHours();
  }, []);

  const fetchHours = async () => {
    const { data } = await supabase.from("opening_hours").select("*");
    if (data) {
      const sorted = DAYS_ORDER.map(day => data.find(h => h.day === day)!).filter(Boolean);
      setHours(sorted);
    }
    setLoading(false);
  };

  const updateHour = (id: string, field: keyof OpeningHours, value: OpeningHours[keyof OpeningHours]) => {
    setHours((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const updated = { ...h, [field]: value };
        // Kur hapet një ditë e mbyllur, vendos orare default nëse mungojnë
        if (field === "is_closed" && value === false) {
          if (!updated.open_time) updated.open_time = "17:00";
          if (!updated.close_time) updated.close_time = "22:00";
        }
        return updated;
      })
    );
  };

  const handleSave = async () => {
    setSaving(true);
    let hasError = false;
    for (const hour of hours) {
      const { error } = await supabase.from("opening_hours").update({
        open_time: hour.is_closed ? null : hour.open_time,
        close_time: hour.is_closed ? null : hour.close_time,
        is_closed: hour.is_closed,
      }).eq("id", hour.id);
      if (error) hasError = true;
    }
    setSaving(false);
    if (hasError) {
      alert("Disa orare nuk u ruajtën. Kontrollo që je i loguar si admin.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-pupa-brown">Opening Hours</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-pupa-gold text-pupa-dark text-sm font-sans hover:bg-pupa-cream transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
        {loading ? (
          <div className="space-y-4">
            {[...Array(7)].map((_, i) => <div key={i} className="skeleton h-16 rounded" />)}
          </div>
        ) : (
          <div className="space-y-3">
            {hours.map((hour, i) => (
              <motion.div
                key={hour.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-white p-4 border border-pupa-warm"
              >
                <span className="font-sans text-pupa-brown w-28 text-sm">{hour.day}</span>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hour.is_closed}
                    onChange={e => updateHour(hour.id, "is_closed", e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="font-sans text-sm text-pupa-brown/60">Closed</span>
                </label>

                {!hour.is_closed && (
                  <div className="flex items-center gap-3 ml-auto">
                    <input
                      type="time"
                      value={hour.open_time || ""}
                      onChange={e => updateHour(hour.id, "open_time", e.target.value)}
                      className="border border-pupa-warm px-2 py-1.5 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                    />
                    <span className="font-sans text-pupa-brown/40 text-sm">–</span>
                    <input
                      type="time"
                      value={hour.close_time || ""}
                      onChange={e => updateHour(hour.id, "close_time", e.target.value)}
                      className="border border-pupa-warm px-2 py-1.5 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                    />
                  </div>
                )}

                {hour.is_closed && (
                  <span className="ml-auto font-sans text-sm text-red-400">CLOSED</span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <p className="font-sans text-pupa-brown/40 text-xs mt-6 text-center">
          Çdo ditë është e pavarur. Shëno &quot;Closed&quot; vetëm për ditët që restoranti nuk punon, pastaj kliko Save Changes.
        </p>
    </div>
  );
}
