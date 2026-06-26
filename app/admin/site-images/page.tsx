"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";

interface Slot {
  key: string;
  label: string;
  desc: string;
}

const SLOTS: Slot[] = [
  { key: "hero", label: "Hero Background", desc: "Foto e madhe e sfondit në krye të faqes" },
  { key: "about_1", label: "About — Foto 1", desc: "Foto kryesore vertikale (seksioni Our Story)" },
  { key: "about_2", label: "About — Foto 2", desc: "Foto e vogël katrore" },
  { key: "about_3", label: "About — Foto 3", desc: "Foto e vogël katrore" },
];

type ImageMap = Record<string, { url: string; alt: string }>;

export default function AdminSiteImages() {
  const [images, setImages] = useState<ImageMap>({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("site_images").select("key, url, alt");
    if (data) {
      const map: ImageMap = {};
      data.forEach((row) => {
        map[row.key] = { url: row.url, alt: row.alt || "" };
      });
      setImages(map);
    }
    setLoading(false);
  };

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);
    const fileName = `site/${key}-${Date.now()}-${file.name}`;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Sesioni ka skaduar. Hyr përsëri në admin.");
      router.push("/admin/login");
      setUploadingKey(null);
      return;
    }

    const { error: uploadError } = await supabase.storage.from("gallery").upload(fileName, file, {
      upsert: true,
    });

    if (uploadError) {
      alert("Gabim gjatë ngarkimit në Storage: " + uploadError.message);
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
      await fetchImages();
    }
    setUploadingKey(null);
  };

  const handleDelete = async (key: string) => {
    if (!confirm("A je i sigurt që do ta heqësh këtë foto?")) return;
    const current = images[key];
    if (current?.url) {
      const fileName = current.url.split("/gallery/").pop();
      if (fileName) await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("site_images").delete().eq("key", key);
    const next = { ...images };
    delete next[key];
    setImages(next);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="font-serif text-2xl text-pupa-brown mb-2">Homepage Images</h1>
      <p className="font-sans text-pupa-brown/60 text-sm mb-8">
        Këto foto shfaqen në faqen kryesore (Hero dhe seksioni Our Story). Nëse një
        slot është bosh, ai përdor një fallback elegant pa foto.
      </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 skeleton rounded" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SLOTS.map((slot, i) => {
              const current = images[slot.key];
              const isUploading = uploadingKey === slot.key;
              return (
                <div key={slot.key} className="bg-white border border-pupa-warm p-4">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-serif text-pupa-brown text-base">{slot.label}</h3>
                  </div>
                  <p className="font-sans text-pupa-brown/50 text-xs mb-4">{slot.desc}</p>

                  {/* Preview */}
                  <div className="relative aspect-video bg-pupa-warm/40 overflow-hidden mb-4 flex items-center justify-center">
                    {current?.url ? (
                      <Image src={current.url} alt={current.alt} fill className="object-cover" />
                    ) : (
                      <span className="font-sans text-pupa-brown/30 text-xs">Pa foto</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-widest uppercase hover:bg-pupa-cream transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => handleUpload(slot.key, e)}
                      />
                      {isUploading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Upload size={14} />
                      )}
                      {current?.url ? "Ndrysho" : "Ngarko"}
                    </label>
                    {current?.url && (
                      <button
                        onClick={() => handleDelete(slot.key)}
                        className="px-3 py-2.5 border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
