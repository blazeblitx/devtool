"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { 
  Search, 
  Map as MapIcon, 
  Plus, 
  Zap, 
  Download, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Trash2, 
  Layers,
  CheckCircle2,
  Clock
} from "lucide-react";
import skillsData from "../data/skills.json";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Dynamically import ReactFlow to avoid SSR issues
const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });
import { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

// Interface for Skill Data
interface Skill {
  id: string;
  name: string;
  category?: string;
  description?: string;
}

export default function TacticalArchitect() {
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [customRoadmap, setCustomRoadmap] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

  // Load saved roadmap or set defaults
  useEffect(() => {
    const savedTitle = localStorage.getItem("doubleDownRoadmapTitle");
    const savedRoadmap = localStorage.getItem("doubleDownRoadmapNodes");
    
    if (savedTitle) {
      setRoadmapTitle(JSON.parse(savedTitle));
    } else {
      setRoadmapTitle("ELITE_ENGINEERING_CORE");
    }

    if (savedRoadmap && JSON.parse(savedRoadmap).length > 0) {
      setCustomRoadmap(JSON.parse(savedRoadmap));
    } else {
      // Default initial roadmap for better UX
      const demoSkills = skillsData.slice(0, 4) as Skill[];
      setCustomRoadmap(demoSkills);
    }
  }, []);

  // Save roadmap
  useEffect(() => {
    if (roadmapTitle) localStorage.setItem("doubleDownRoadmapTitle", JSON.stringify(roadmapTitle));
    if (customRoadmap.length > 0) localStorage.setItem("doubleDownRoadmapNodes", JSON.stringify(customRoadmap));
  }, [roadmapTitle, customRoadmap]);

  // Filter skills based on search
  const filteredSkills = skillsData.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add skill
  const addSkillToRoadmap = (skillToAdd: Skill) => {
    if (!customRoadmap.some((skill) => skill.id === skillToAdd.id)) {
      setCustomRoadmap([...customRoadmap, skillToAdd]);
    }
  };

  // Remove skill
  const removeSkillFromRoadmap = (skillToRemoveId: string) => {
    setCustomRoadmap(customRoadmap.filter((s) => s.id !== skillToRemoveId));
  };

  // Clear all skills
  const clearRoadmap = () => {
    if (confirm("Confirm Protocol Termination: Clear all roadmap data?")) {
      setCustomRoadmap([]);
    }
  };

  // Move skill up in order
  const moveSkillUp = (index: number) => {
    if (index === 0) return;
    const newRoadmap = [...customRoadmap];
    [newRoadmap[index - 1], newRoadmap[index]] = [newRoadmap[index], newRoadmap[index - 1]];
    setCustomRoadmap(newRoadmap);
  };

  // Move skill down in order
  const moveSkillDown = (index: number) => {
    if (index === customRoadmap.length - 1) return;
    const newRoadmap = [...customRoadmap];
    [newRoadmap[index], newRoadmap[index + 1]] = [newRoadmap[index + 1], newRoadmap[index]];
    setCustomRoadmap(newRoadmap);
  };

  // ReactFlow nodes & edges
  const nodes = customRoadmap.map((skill, index) => ({
    id: skill.id.toString(),
    type: 'default',
    data: { 
      label: (
        <div className="p-4 rounded-2xl bg-[#12121e]/90 border border-white/10 backdrop-blur-xl group hover:border-primary transition-all shadow-2xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Step {index + 1}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); removeSkillFromRoadmap(skill.id); }}
              className="p-1 rounded-md hover:bg-rose-500/20 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
          <span className="text-sm font-black uppercase tracking-tight text-white block truncate">{skill.name}</span>
          {skill.category && (
            <div className="mt-2 text-[9px] font-black text-primary/60 uppercase tracking-widest bg-primary/5 py-1 px-3 rounded-full inline-block border border-primary/10">
              {skill.category}
            </div>
          )}
        </div>
      )
    },
    position: { x: index * 280, y: (index % 2 === 0 ? 150 : 350) },
    draggable: true,
  }));

  const edges = customRoadmap
    .map((_, index) => {
      if (index === 0) return null;
      return {
        id: `e${customRoadmap[index - 1].id}-${customRoadmap[index].id}`,
        source: customRoadmap[index - 1].id.toString(),
        target: customRoadmap[index].id.toString(),
        animated: true,
        style: { stroke: '#a855f7', strokeWidth: 4, filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.5))' },
      };
    })
    .filter((edge): edge is NonNullable<typeof edge> => edge !== null);

  // PDF Download logic
  const downloadPDF = async () => {
    if (!roadmapRef.current || customRoadmap.length === 0) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(roadmapRef.current, {
        backgroundColor: "#0a0a0f",
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width * ratio, canvas.height * ratio);
      pdf.save(`${roadmapTitle || "doubledown-roadmap"}.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error("Dossier generation error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground p-8 lg:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="fixed inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-12 relative z-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase flex items-center gap-4">
             TACTICAL <span className="text-primary italic">ARCHITECT</span>
             <MapIcon className="text-primary animate-pulse w-8 h-8" />
          </h1>
          <p className="text-muted-foreground font-medium italic decoration-primary decoration-1 underline-offset-4 underline">Map your high-signal execution protocols.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
           <button onClick={clearRoadmap} className="px-6 py-3 glass border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-rose-500/50 transition-all flex items-center gap-2 text-muted-foreground">
             <Trash2 className="w-4 h-4" /> Purge
           </button>
           <button 
             onClick={downloadPDF} 
             disabled={isDownloading || customRoadmap.length === 0}
             className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl glow-primary hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3"
           >
             {isDownloading ? <Clock className="animate-spin w-4 h-4" /> : downloadSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
             {isDownloading ? "GENERATING..." : downloadSuccess ? "Dossier Ready" : "Export Intel"}
           </button>
        </div>
      </header>

      {/* Title Input */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
         <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000" />
            <input
               type="text"
               className="relative w-full bg-[#0d0d12] border border-white/10 p-8 rounded-3xl text-2xl font-black tracking-tighter text-center uppercase focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground/10"
               placeholder="Designate Mission Title (e.g., MASTER_NEXTJS_2025)"
               value={roadmapTitle}
               onChange={(e) => setRoadmapTitle(e.target.value)}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 relative z-10">
        {/* Skill Arsenal (Sidebar) */}
        <aside className="xl:col-span-1 glass bg-white/[0.02] p-8 rounded-[3rem] border-white/5 flex flex-col h-[800px]">
           <div className="mb-8">
              <h2 className="text-xl font-black tracking-tight uppercase mb-6 flex items-center gap-2">
                 <Layers size={18} className="text-primary" /> ARSENAL
              </h2>
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                 <input 
                    placeholder="Scan Skills..." 
                    className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-primary outline-none" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>

           <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar">
              {filteredSkills.map((skill) => {
                 const isAdded = customRoadmap.some(s => s.id === skill.id);
                 return (
                    <div key={skill.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                       <div className="flex-1">
                          <p className="text-[10px] font-black uppercase tracking-widest group-hover:text-primary transition-colors truncate">{skill.name}</p>
                          <p className="text-[8px] font-bold text-muted-foreground uppercase opacity-50 mt-1">{skill.id}</p>
                       </div>
                       <button 
                         onClick={() => addSkillToRoadmap(skill)}
                         disabled={isAdded}
                         className={`p-2 rounded-xl transition-all ${isAdded ? 'text-emerald-400 bg-emerald-500/10' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}
                       >
                         {isAdded ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                       </button>
                    </div>
                 );
              })}
           </div>

           <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <span>{filteredSkills.length} Total Units</span>
              <span>{customRoadmap.length} Locked In</span>
           </div>
        </aside>

        {/* Neural Canvas (Main) */}
        <div className="xl:col-span-3 space-y-8">
           {/* Strategy Management List */}
           <div className="glass bg-white/[0.02] p-8 rounded-[3rem] border-white/5">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-xl font-black tracking-tight uppercase flex items-center gap-3">
                    <Zap className="text-primary" size={18} /> EXECUTION ORDER
                 </h2>
                 {customRoadmap.length > 0 && <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{customRoadmap.length} NODES INITIALIZED</span>}
              </div>

              {customRoadmap.length === 0 ? (
                 <div className="py-20 text-center flex flex-col items-center justify-center opacity-30">
                    <Zap size={60} className="mb-4 animate-pulse text-muted-foreground" />
                    <p className="font-black uppercase tracking-widest text-sm text-muted-foreground">Awaiting Intelligence Selection...</p>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                    {customRoadmap.map((skill, index) => (
                       <div key={skill.id} className="p-5 rounded-2xl bg-[#0d0d12] border border-white/5 flex items-center justify-between group hover:border-primary/50 transition-all shadow-xl">
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-[10px] font-black shadow-inner">
                                {index + 1}
                             </div>
                             <span className="text-xs font-black uppercase tracking-widest">{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <button onClick={() => moveSkillUp(index)} disabled={index === 0} className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-20 transition-all"><ChevronUp size={16} /></button>
                             <button onClick={() => moveSkillDown(index)} disabled={index === customRoadmap.length - 1} className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-20 transition-all"><ChevronDown size={16} /></button>
                             <button onClick={() => removeSkillFromRoadmap(skill.id)} className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all"><Trash2 size={16} /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>

           {/* Visualization Engine */}
           <div className="glass bg-black p-0 rounded-[3rem] border-white/5 h-[600px] relative overflow-hidden group">
              <div className="absolute top-6 left-6 z-10 flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl">
                 <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Neural Link Visualization</span>
              </div>
              
              <div 
                ref={roadmapRef}
                className="w-full h-full bg-[#0a0a0f] relative"
              >
                 <ReactFlow 
                   nodes={nodes} 
                   edges={edges} 
                   fitView
                   minZoom={0.2}
                   maxZoom={1}
                 >
                    <Background gap={25} color="#1e293b" />
                    <Controls className="fill-white bg-white/5 border-white/10 rounded-xl overflow-hidden" />
                 </ReactFlow>
                 
                 {/* Aesthetic Grid overlay */}
                 <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
              </div>

              <div className="absolute bottom-6 right-6 z-10 italic text-[10px] font-bold text-muted-foreground opacity-30">
                 Dossier Ref: ARC-RDM-LOG-01
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
