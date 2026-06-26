"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Trash2, Loader2 } from "lucide-react";
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

  useEffect(() => {
    fetchImages();
  }, []);

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
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="font-serif text-2xl text-pupa-brown mb-6">Gallery Management</h1>

      {/* Upload Zone — shfaqet menjëherë */}
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-pupa-gold/40 hover:border-pupa-gold cursor-pointer bg-white transition-colors mb-8 group">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={28} className="text-pupa-gold animate-spin" />
            <span className="font-sans text-sm text-pupa-brown/60">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={28} className="text-pupa-gold/50 group-hover:text-pupa-gold transition-colors" />
            <span className="font-sans text-sm text-pupa-brown/60">
              Click to upload images
            </span>
          </div>
        )}
      </label>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square skeleton rounded" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="text-center py-16 font-sans text-pupa-brown/40">
          No images yet. Upload your first image above.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square group overflow-hidden bg-pupa-warm"
            >
              <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="200px" />
              <div className="absolute inset-0 bg-pupa-dark/0 group-hover:bg-pupa-dark/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id, img.url)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
