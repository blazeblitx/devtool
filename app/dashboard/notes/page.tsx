"use client";

import { useState } from "react";
import { Plus, X, Search, StickyNote, Calendar, ChevronRight, Send, Trash2 } from "lucide-react";
import StarBorder from "@/components/StarBorder";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Tactical Execution", content: "Focus on high-signal growth metrics for the next sprint. Eliminate any fluff from the core logic.", date: "2025-09-30", category: "Strategy" },
    { id: 2, title: "Neural Sync Protocol", content: "Integrate the AI strategist into the main command center. Ensure low latency and high accuracy.", date: "2025-09-29", category: "Dev" },
    { id: 3, title: "Market Domination", content: "Analyze competitor patterns and double down on unique value propositions.", date: "2025-09-28", category: "Business" }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", category: "Strategy" });

  const handleAddNote = () => {
    if (newNote.title.trim() === "" && newNote.content.trim() === "") return;
    
    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      date: new Date().toISOString().split('T')[0]
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "", category: "Strategy" });
    setIsModalOpen(false);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">
            INTEL <span className="text-primary italic">VAULT</span>
          </h1>
          <p className="text-muted-foreground font-medium italic decoration-primary decoration-1 underline-offset-4 underline">Secure storage for your strategic breakthroughs.</p>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Search Bar - Aesthetic Only */}
           <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-sm text-muted-foreground focus-within:border-primary/50 transition-all">
              <Search size={16} />
              <input placeholder="Search Intel..." className="bg-transparent border-none outline-none placeholder:text-muted-foreground/30 font-bold" />
           </div>

          <StarBorder 
            color="var(--primary)" 
            speed="3s" 
            thickness={2}
            className="hover:scale-105 transition-all shadow-xl"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="flex items-center gap-2 px-6 py-1.5 font-black text-sm uppercase tracking-widest whitespace-nowrap">
               <Plus className="w-5 h-5" /> New Entry
            </span>
          </StarBorder>
        </div>
      </div>

      {/* Categories / Filter placeholder */}
      <div className="flex flex-wrap gap-3">
        {["Strategy", "Dev", "Business", "Research", "Archives"].map((cat, i) => (
          <button key={i} className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-tighter transition-all ${i === 0 ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/5 text-muted-foreground hover:border-white/20'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className="glass p-6 md:p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden flex flex-col min-h-[300px]"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
               <StickyNote size={80} />
            </div>

            <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{note.category}</span>
                <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">{note.title}</h3>
              </div>
              <button 
                onClick={() => deleteNote(note.id)}
                className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all scale-110 opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-8 flex-1 relative z-10 line-clamp-6">
              {note.content}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 relative z-10">
               <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <Calendar size={12} className="text-primary" /> {note.date}
               </div>
               <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 group/btn">
                  ANALYZE <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        ))}
        
        {/* Empty state entry */}
        {notes.length === 0 && (
          <div className="glass p-12 rounded-[2.5rem] border-dashed border-white/10 text-center col-span-full py-32">
             <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 mx-auto animate-pulse">
                <Search size={40} className="text-muted-foreground/30" />
             </div>
             <h3 className="text-2xl font-black mb-2 tracking-tight">VAULT EMPTY</h3>
             <p className="text-muted-foreground font-medium italic">No tactical data found. Initialize your first entry below.</p>
             <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 px-8 py-3 bg-white/5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
             >
               Initialize Entry
             </button>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="glass p-10 rounded-[3rem] border-white/10 w-full max-w-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Plus size={160} />
            </div>

            <div className="flex justify-between items-center mb-10 relative z-10">
              <h2 className="text-3xl font-black tracking-tight uppercase">NEW <span className="text-primary italic">INTEL</span></h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">Identifier</label>
                <input
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none font-bold text-lg placeholder:text-muted-foreground/30"
                  placeholder="Intel Headline..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">Strategic Objective</label>
                <div className="flex flex-wrap gap-2">
                   {["Strategy", "Dev", "Business", "Research"].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setNewNote({...newNote, category: cat})}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${newNote.category === cat ? 'bg-primary text-white glow-primary' : 'bg-white/5 border border-white/5 text-muted-foreground hover:border-white/20'}`}
                      >
                         {cat}
                      </button>
                   ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">Tactical Data</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  rows={6}
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-3xl focus:ring-2 focus:ring-primary focus:outline-none font-medium leading-relaxed placeholder:text-muted-foreground/30 resize-none"
                  placeholder="Detail your breakthrough here..."
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-12 relative z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-4 text-muted-foreground hover:text-white font-black uppercase text-xs tracking-widest transition-all"
              >
                Abort
              </button>
              <StarBorder
                color="var(--primary)"
                speed="2s"
                thickness={2}
                className="hover:scale-105 transition-all shadow-xl"
                onClick={handleAddNote}
              >
                <span className="flex items-center gap-3 px-10 py-2 font-black text-sm uppercase tracking-widest whitespace-nowrap">
                   Commit Data <Send size={18} />
                </span>
              </StarBorder>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}