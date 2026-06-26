"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/admin/login");
      else fetchImages();
    };
    checkUser();
  }, [router]);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order");
    if (data) setImages(data);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (!error && uploadData) {
        const { data: urlData } = supabase.storage
          .from("gallery")
          .getPublicUrl(fileName);

        await supabase.from("gallery_images").insert({
          url: urlData.publicUrl,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          order: images.length + 1,
        });
      }
    }
    await fetchImages();
    setUploading(false);
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    const fileName = url.split("/").pop();
    if (fileName) await supabase.storage.from("gallery").remove([fileName]);
    await supabase.from("gallery_images").delete().eq("id", id);
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-pupa-beige">
      <nav className="bg-pupa-brown px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard" className="text-pupa-warm hover:text-pupa-gold">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-serif text-pupa-cream text-lg">Gallery Management</h1>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-pupa-gold/40 hover:border-pupa-gold cursor-pointer bg-white transition-colors duration-300 group">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={32} className="text-pupa-gold animate-spin" />
                <span className="font-sans text-sm text-pupa-brown/60">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload size={32} className="text-pupa-gold/50 group-hover:text-pupa-gold transition-colors" />
                <span className="font-sans text-sm text-pupa-brown/60">
                  Click to upload images or drag and drop
                </span>
                <span className="font-sans text-xs text-pupa-brown/40">PNG, JPG, WEBP</span>
              </div>
            )}
          </label>
        </motion.div>

        {/* Images Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square skeleton rounded" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-pupa-brown/40">No images yet. Upload your first image above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square group overflow-hidden bg-pupa-warm"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-pupa-dark/0 group-hover:bg-pupa-dark/50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(img.id, img.url)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-pupa-dark/60 px-3 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-sans text-pupa-cream text-xs truncate">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
