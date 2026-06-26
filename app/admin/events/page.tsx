"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Pencil, Trash2, X, Check, Loader2, Calendar } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/types";

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
  const [modal, setModal] = useState<{ open: boolean; item: Partial<Event> | null }>({ open: false, item: null });
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const openAdd = () => setModal({ open: true, item: { ...emptyEvent } });
  const openEdit = (event: Event) => setModal({ open: true, item: { ...event } });
  const closeModal = () => setModal({ open: false, item: null });

  const handleSave = async () => {
    if (!modal.item?.title || !modal.item.date) return;
    setSaving(true);
    if ((modal.item as Event).id) {
      const { id, created_at, ...updates } = modal.item as Event;
      await supabase.from("events").update(updates).eq("id", id);
    } else {
      await supabase.from("events").insert(modal.item);
    }
    await fetchEvents();
    closeModal();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await supabase.from("events").delete().eq("id", id);
    setEvents(events.filter(e => e.id !== id));
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
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
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Image URL (optional)</label>
                  <input
                    type="url"
                    value={modal.item.image_url || ""}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, image_url: e.target.value } }))}
                    className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 py-2.5 border border-pupa-warm text-pupa-brown font-sans text-sm hover:bg-pupa-beige transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
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
