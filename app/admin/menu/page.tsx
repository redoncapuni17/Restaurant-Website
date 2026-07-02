"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import type { MenuItem } from "@/types";

const CATEGORIES = ["starter", "main", "dessert", "drink", "wine"] as const;

const emptyItem: Omit<MenuItem, "id" | "created_at"> = {
  name: "",
  description: "",
  price: 0,
  category: "main",
  available: true,
};

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("main");
  const [modal, setModal] = useState<{ open: boolean; item: Partial<MenuItem> | null }>({ open: false, item: null });
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("category").order("name");
    if (data) setItems(data);
    setLoading(false);
  };

  const openAdd = () => setModal({ open: true, item: { ...emptyItem } });
  const openEdit = (item: MenuItem) => setModal({ open: true, item: { ...item } });
  const closeModal = () => setModal({ open: false, item: null });

  const handleSave = async () => {
    if (!modal.item?.name || !modal.item.price) return;
    setSaving(true);
    if ((modal.item as MenuItem).id) {
      const { id, created_at, ...updates } = modal.item as MenuItem;
      await supabase.from("menu_items").update(updates).eq("id", id);
    } else {
      await supabase.from("menu_items").insert(modal.item);
    }
    await fetchItems();
    closeModal();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("menu_items").delete().eq("id", id);
    setItems(items.filter(i => i.id !== id));
  };

  const filtered = items.filter(i => i.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-pupa-brown">Menu Management</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-pupa-gold text-pupa-dark text-sm font-sans hover:bg-pupa-cream transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>
        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-sans text-sm capitalize transition-all ${
                activeCategory === cat
                  ? "bg-pupa-brown text-pupa-cream"
                  : "bg-white text-pupa-brown border border-pupa-warm hover:border-pupa-brown"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-16 rounded" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-pupa-brown/40 font-sans">
            No {activeCategory} items yet. Click &quot;Add Item&quot; to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-white p-4 border border-pupa-warm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-pupa-brown">{item.name}</span>
                    {!item.available && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 font-sans">Unavailable</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="font-sans text-pupa-brown/60 text-sm mt-0.5">{item.description}</p>
                  )}
                </div>
                <span className="font-serif text-pupa-brown text-lg">£{item.price.toFixed(2)}</span>
                <button onClick={() => openEdit(item)} className="text-pupa-brown/50 hover:text-pupa-gold transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-pupa-brown/50 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
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
                  {(modal.item as MenuItem).id ? "Edit Item" : "New Item"}
                </h2>
                <button onClick={closeModal} className="text-pupa-brown/40 hover:text-pupa-brown">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Name *</label>
                  <input
                    type="text"
                    value={modal.item.name || ""}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, name: e.target.value } }))}
                    className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Description</label>
                  <textarea
                    value={modal.item.description || ""}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, description: e.target.value } }))}
                    rows={2}
                    className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Price (£) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={modal.item.price || ""}
                      onChange={e => setModal(m => ({ ...m, item: { ...m.item!, price: parseFloat(e.target.value) } }))}
                      className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs tracking-wider uppercase text-pupa-brown/60 mb-1 font-sans">Category</label>
                    <select
                      value={modal.item.category || "main"}
                      onChange={e => setModal(m => ({ ...m, item: { ...m.item!, category: e.target.value as any } }))}
                      className="w-full border border-pupa-warm px-3 py-2 font-sans text-sm focus:outline-none focus:border-pupa-brown bg-white capitalize"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="available"
                    checked={modal.item.available ?? true}
                    onChange={e => setModal(m => ({ ...m, item: { ...m.item!, available: e.target.checked } }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="available" className="font-sans text-sm text-pupa-brown">Available on menu</label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-pupa-warm text-pupa-brown font-sans text-sm hover:bg-pupa-beige transition-colors"
                >
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
