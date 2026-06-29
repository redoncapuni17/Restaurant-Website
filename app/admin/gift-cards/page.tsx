"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Loader2, Check } from "lucide-react";
import Image from "next/image";
import {
  GIFT_CARDS_DEFAULTS,
  GIFT_CARDS_TEXT_FIELDS,
  GIFT_CARDS_IMAGE_DEFAULTS,
} from "@/lib/giftCards";
import { revalidateGiftCards } from "@/app/actions/revalidate";

const IMAGE_SLOTS = [
  { key: "giftcards_hero", label: "Hero Background", desc: "Foto e sfondit në krye të faqes (shfaqet zbehtë)" },
  { key: "giftcards_card", label: "Gift Card Visual", desc: "Imazhi i kartës që shfaqet në mes të faqes" },
];

export default function AdminGiftCards() {
  const [values, setValues] = useState<Record<string, string>>(GIFT_CARDS_DEFAULTS);
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [{ data: content }, { data: imgs }] = await Promise.all([
      supabase.from("site_content").select("key, value"),
      supabase.from("site_images").select("key, url").in("key", ["giftcards_hero", "giftcards_card"]),
    ]);

    const next = { ...GIFT_CARDS_DEFAULTS };
    content?.forEach((row) => {
      if (row.value != null) next[row.key] = row.value;
    });
    setValues(next);

    const imgMap: Record<string, string> = {};
    imgs?.forEach((row) => {
      if (row.url) imgMap[row.key] = row.url;
    });
    setImages(imgMap);
    setLoading(false);
  };

  const ensureSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Sesioni ka skaduar. Hyr përsëri në admin.");
      router.push("/admin/login");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!(await ensureSession())) return;
    setSaving(true);

    const rows = GIFT_CARDS_TEXT_FIELDS.map((f) => ({
      key: f.key,
      value: values[f.key] ?? "",
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("site_content").upsert(rows);
    if (error) {
      alert("Gabim gjatë ruajtjes: " + error.message);
      setSaving(false);
      return;
    }

    await revalidateGiftCards();
    setSaving(false);
  };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!(await ensureSession())) return;

    setUploadingKey(key);
    const fileName = `site/${key}-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file, { upsert: true });
    if (uploadError) {
      alert("Gabim gjatë ngarkimit: " + uploadError.message);
      setUploadingKey(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    const { error: dbError } = await supabase.from("site_images").upsert({
      key,
      url: urlData.publicUrl,
      alt: file.name.replace(/\.[^/.]+$/, ""),
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      alert("Foto u ngarkua, por gabim në databazë: " + dbError.message);
    } else {
      setImages((m) => ({ ...m, [key]: urlData.publicUrl }));
      await revalidateGiftCards();
    }
    setUploadingKey(null);
  };

  const handleRemoveImage = async (key: string) => {
    if (!confirm("A je i sigurt që do ta heqësh këtë foto?")) return;
    const current = images[key];
    if (current) {
      const fileName = current.split("/gallery/").pop();
      if (fileName) await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("site_images").delete().eq("key", key);
    setImages((m) => {
      const next = { ...m };
      delete next[key];
      return next;
    });
    await revalidateGiftCards();
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded" />)}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-2xl text-pupa-brown">Gift Cards</h1>
        <a href="/gift-cards" target="_blank" className="font-sans text-xs text-pupa-gold hover:underline">
          → Shiko faqen
        </a>
      </div>
      <p className="font-sans text-pupa-brown/60 text-sm mb-8">
        Konfiguro tekstet dhe fotot e faqes publike Gift Cards.
      </p>

      {/* Imazhet */}
      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        {IMAGE_SLOTS.map((slot) => {
          const url = images[slot.key];
          const fallback = GIFT_CARDS_IMAGE_DEFAULTS[slot.key];
          const isUploading = uploadingKey === slot.key;
          return (
            <div key={slot.key} className="bg-white border border-pupa-warm p-4">
              <h3 className="font-serif text-pupa-brown text-base mb-1">{slot.label}</h3>
              <p className="font-sans text-pupa-brown/50 text-xs mb-4">{slot.desc}</p>

              <div className="relative aspect-video bg-pupa-warm/30 overflow-hidden mb-4 flex items-center justify-center">
                {url || fallback ? (
                  <Image src={url || fallback} alt={slot.label} fill className="object-contain" />
                ) : (
                  <span className="font-sans text-pupa-brown/30 text-xs">Pa foto</span>
                )}
                {!url && fallback && (
                  <span className="absolute bottom-1 right-1 bg-pupa-dark/70 text-pupa-cream text-[0.6rem] px-1.5 py-0.5 font-sans">
                    default
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-widest uppercase hover:bg-pupa-cream transition-colors cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => handleUpload(slot.key, e)} />
                  {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {url ? "Ndrysho" : "Ngarko"}
                </label>
                {url && (
                  <button onClick={() => handleRemoveImage(slot.key)} className="px-3 py-2.5 border border-red-300 text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tekstet */}
      <div className="bg-white border border-pupa-warm p-6 space-y-5">
        {GIFT_CARDS_TEXT_FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                rows={3}
                className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown resize-none"
              />
            ) : (
              <input
                type="text"
                value={values[f.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
              />
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-pupa-brown text-pupa-cream font-sans text-sm tracking-widest uppercase hover:bg-pupa-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          Ruaj ndryshimet
        </button>
      </div>
    </div>
  );
}
