"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Pencil, Trash2, X, Check, Loader2, Calendar, Upload, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/types";
import { revalidateEvents } from "@/app/actions/revalidate";

const emptyEvent: Omit<Event, "id" | "created_at"> = {
  title: "",
  description: "",
  date: "",
  time_start: "17:00",
  time_end: "22:00",
  image_url: "",
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [heroUrl, setHeroUrl] = useState<string>("");
  const [heroUploading, setHeroUploading] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; item: Partial<Event> | null }>({ open: false, item: null });
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
    fetchHero();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const fetchHero = async () => {
    const { data } = await supabase.from("site_images").select("url").eq("key", "events").maybeSingle();
    if (data?.url) setHeroUrl(data.url);
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Sesioni ka skaduar. Hyr përsëri në admin.");
      router.push("/admin/login");
      return;
    }

    setHeroUploading(true);
    const fileName = `site/events-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      alert("Gabim gjatë ngarkimit të fotos: " + uploadError.message);
      setHeroUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    const { error: dbError } = await supabase.from("site_images").upsert({
      key: "events",
      url: urlData.publicUrl,
      alt: file.name.replace(/\.[^/.]+$/, ""),
      updated_at: new Date().toISOString(),
    });

    if (dbError) {
      alert("Foto u ngarkua, por gabim në databazë: " + dbError.message);
    } else {
      setHeroUrl(urlData.publicUrl);
      await revalidateEvents();
    }
    setHeroUploading(false);
  };

  const removeHero = async () => {
    if (!confirm("A je i sigurt që do ta heqësh foton e kreut?")) return;
    if (heroUrl) {
      const fileName = heroUrl.split("/gallery/").pop();
      if (fileName) await supabase.storage.from("gallery").remove([fileName]);
    }
    await supabase.from("site_images").delete().eq("key", "events");
    setHeroUrl("");
    await revalidateEvents();
  };

  const openAdd = () => setModal({ open: true, item: { ...emptyEvent } });
  const openEdit = (event: Event) => setModal({ open: true, item: { ...event } });
  const closeModal = () => setModal({ open: false, item: null });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert("Sesioni ka skaduar. Hyr përsëri në admin.");
      router.push("/admin/login");
      return;
    }

    setUploading(true);
    const fileName = `events/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      alert("Gabim gjatë ngarkimit të fotos: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
    setModal(m => ({ ...m, item: { ...m.item!, image_url: urlData.publicUrl } }));
    setUploading(false);
  };

  const removeImage = () => setModal(m => ({ ...m, item: { ...m.item!, image_url: "" } }));

  const handleSave = async () => {
    if (!modal.item?.title || !modal.item.date) return;
    setSaving(true);

    const { id, created_at, image_url, ...rest } = modal.item as Event;
    const payload = {
      ...rest,
      ...(image_url?.trim() ? { image_url: image_url.trim() } : {}),
    };

    const { error } = (modal.item as Event).id
      ? await supabase.from("events").update(payload).eq("id", id)
      : await supabase.from("events").insert(payload);

    if (error) {
      alert("Gabim gjatë ruajtjes: " + error.message);
      setSaving(false);
      return;
    }

    await revalidateEvents();
    await fetchEvents();
    closeModal();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      alert("Gabim gjatë fshirjes: " + error.message);
      return;
    }
    await revalidateEvents();
    setEvents(events.filter(e => e.id !== id));
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Foto e kreut të faqes Events */}
      <div className="bg-white border border-pupa-warm p-5 mb-8">
        <h2 className="font-serif text-pupa-brown text-lg mb-1">Foto e kreut (Hero)</h2>
        <p className="font-sans text-pupa-brown/50 text-xs mb-4">
          Kjo foto shfaqet në krye të faqes publike Events. Pa foto = sfond elegant smerald.
        </p>
        {heroUrl ? (
          <div className="relative aspect-[16/6] w-full overflow-hidden border border-pupa-warm group">
            <Image src={heroUrl} alt="Events hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-pupa-dark/0 group-hover:bg-pupa-dark/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <label className="flex items-center gap-1.5 px-3 py-2 bg-pupa-gold text-pupa-dark font-sans text-xs cursor-pointer hover:bg-pupa-cream transition-colors">
                <input type="file" accept="image/*" className="hidden" disabled={heroUploading} onChange={handleHeroUpload} />
                {heroUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                Ndrysho
              </label>
              <button
                type="button"
                onClick={removeHero}
                className="px-3 py-2 bg-white/90 text-red-500 font-sans text-xs hover:bg-white transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Hiq
              </button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 aspect-[16/6] w-full border-2 border-dashed border-pupa-warm hover:border-pupa-gold hover:bg-pupa-beige/50 transition-colors cursor-pointer text-pupa-brown/50">
            <input type="file" accept="image/*" className="hidden" disabled={heroUploading} onChange={handleHeroUpload} />
            {heroUploading ? (
              <>
                <Loader2 size={22} className="animate-spin text-pupa-gold" />
                <span className="font-sans text-xs">Duke ngarkuar…</span>
              </>
            ) : (
              <>
                <ImageIcon size={22} />
                <span className="font-sans text-xs tracking-wide">Kliko për të ngarkuar foton e kreut</span>
              </>
            )}
          </label>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-pupa-brown">Events Management</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-pupa-gold text-pupa-dark text-sm font-sans hover:bg-pupa-cream transition-colors"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-pupa-brown/40 font-sans">
            No events yet. Click "Add Event" to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 bg-white p-5 border border-pupa-warm"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-pupa-brown flex flex-col items-center justify-center">
                  <Calendar size={16} className="text-pupa-gold mb-1" />
                  <span className="text-pupa-cream font-sans text-xs">
                    {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-pupa-brown text-lg">{event.title}</h3>
                  <p className="font-sans text-pupa-brown/60 text-sm">
                    {formatDate(event.date)} · {event.time_start} – {event.time_end}
                  </p>
                  {event.description && (
                    <p className="font-sans text-pupa-brown/60 text-sm mt-1 line-clamp-1">{event.description}</p>
                  )}
                </div>
                <div className="flex gap-2 items-start">
                  <button onClick={() => openEdit(event)} className="text-pupa-brown/50 hover:text-pupa-gold transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="text-pupa-brown/50 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      {/* Modal */}
      <AnimatePresence>
        {modal.open && modal.item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pupa-dark/60 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-pupa-brown text-xl">
                  {(modal.item as Event).id ? "Edit Event" : "New Event"}
                </h2>
                <button onClick={closeModal} className="text-pupa-brown/40 hover:text-pupa-brown">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Title *</label>
                  <input
                    type="text"
                    value={modal.item.title || ""}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, title: e.target.value } }))}
                    className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Description</label>
                  <textarea
                    value={modal.item.description || ""}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, description: e.target.value } }))}
                    rows={3}
                    className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Date *</label>
                  <input
                    type="date"
                    value={modal.item.date || ""}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, date: e.target.value } }))}
                    className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Start Time</label>
                    <input
                      type="time"
                      value={modal.item.time_start || "17:00"}
                      onChange={e => setModal(m => ({ ...m, item: { ...m.item!, time_start: e.target.value } }))}
                      className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">End Time</label>
                    <input
                      type="time"
                      value={modal.item.time_end || "22:00"}
                      onChange={e => setModal(m => ({ ...m, item: { ...m.item!, time_end: e.target.value } }))}
                      className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Image (optional)</label>
                  {modal.item.image_url ? (
                    <div className="relative aspect-video w-full overflow-hidden border border-pupa-warm group">
                      <Image src={modal.item.image_url} alt="Event" fill className="object-cover" />
                      <div className="absolute inset-0 bg-pupa-dark/0 group-hover:bg-pupa-dark/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <label className="flex items-center gap-1.5 px-3 py-2 bg-pupa-gold text-pupa-dark font-sans text-xs cursor-pointer hover:bg-pupa-cream transition-colors">
                          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleImageUpload} />
                          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                          Ndrysho
                        </label>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-3 py-2 bg-white/90 text-red-500 font-sans text-xs hover:bg-white transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 size={14} /> Hiq
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 aspect-video w-full border-2 border-dashed border-pupa-warm hover:border-pupa-gold hover:bg-pupa-beige/50 transition-colors cursor-pointer text-pupa-brown/50">
                      <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleImageUpload} />
                      {uploading ? (
                        <>
                          <Loader2 size={22} className="animate-spin text-pupa-gold" />
                          <span className="font-sans text-xs">Duke ngarkuar…</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={22} />
                          <span className="font-sans text-xs tracking-wide">Kliko për të ngarkuar foto</span>
                        </>
                      )}
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 py-2.5 border border-pupa-warm text-pupa-brown font-sans text-sm hover:bg-pupa-beige transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading}
                  className="flex-1 py-2.5 bg-pupa-brown text-pupa-cream font-sans text-sm hover:bg-pupa-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
