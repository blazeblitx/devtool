"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  Zap, 
  Target, 
  Plus, 
  Layers, 
  Cpu, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  Bot, 
  CheckCircle2,
  Lock,
  MessageSquare
} from "lucide-react"
import StarBorder from "@/components/StarBorder";

export default function QuickStart() {
  const protocols = [
    {
      id: "ROADMAP_GEN",
      title: "Initialize Strategic Roadmap",
      subtitle: "Map your next 10x growth protocol",
      icon: <Target className="text-primary" />,
      href: "/create-roadmap",
      status: "Ready",
      complexity: "Medium"
    },
    {
      id: "MISSION_CONTROL",
      title: "Launch TaskFlow Studio",
      subtitle: "Execute agentic missions with AI alignment",
      icon: <Bot className="text-primary" />,
      href: "/dashboard/projects",
      status: "Active",
      complexity: "High"
    },
    {
      id: "SKILL_VERIFY",
      title: "Neural Assessment Loop",
      subtitle: "Validate execution bandwidth benchmarks",
      icon: <Cpu className="text-primary" />,
      href: "/dashboard/quiz",
      status: "Ready",
      complexity: "Low"
    },
    {
      id: "COMMUNITY_SYNC",
      title: "Intel Collective Sync",
      subtitle: "Broadcast and analyze global developer intel",
      icon: <MessageSquare className="text-primary" />,
      href: "/dashboard/forum",
      status: "New",
      complexity: "All Tiers"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="fixed inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-12 relative z-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase flex items-center gap-4">
             QUICK <span className="text-primary italic">START</span>
             <Zap className="text-primary animate-pulse w-8 h-8" />
          </h1>
          <p className="text-muted-foreground font-medium italic decoration-primary decoration-1 underline-offset-4 underline">Fast-track your execution protocols.</p>
        </div>
      </header>

      {/* Main Grid: Protocol Launchers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
         {protocols.map((protocol) => (
            <Link 
               key={protocol.id} 
               href={protocol.href}
               className="group glass p-8 rounded-[3rem] border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden relative"
            >
               <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  {protocol.icon}
               </div>
               
               <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-3xl border border-primary/30 flex items-center justify-center shadow-xl glow-primary group-hover:scale-110 transition-transform">
                     {protocol.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 ${protocol.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-primary bg-primary/10'}`}>
                        {protocol.status}
                     </span>
                     <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{protocol.id}</span>
                  </div>
               </div>

               <div className="mb-10">
                  <h2 className="text-2xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors uppercase">{protocol.title}</h2>
                  <p className="text-muted-foreground font-medium italic text-sm">{protocol.subtitle}</p>
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex flex-col gap-1">
                     <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest">Complexity Loadout</span>
                     <span className="text-xs font-black text-primary uppercase tracking-widest">{protocol.complexity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-[0.2em]">
                     INITIALIZE <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
               </div>
            </Link>
         ))}
      </div>

      {/* Action Recommendation Section */}
      <section className="glass p-12 rounded-[4rem] border-white/5 bg-primary/5 relative overflow-hidden group">
         <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
         <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="lg:w-1/4">
               <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center relative shadow-2xl overflow-hidden group-hover:border-primary/50 transition-all">
                  <Bot size={64} className="text-primary animate-pulse" />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-20 transition-opacity" />
               </div>
            </div>
            <div className="lg:w-3/4 text-center lg:text-left">
               <h2 className="text-3xl font-black mb-4 tracking-tight uppercase">AI STRATEGIST RECOMMENDATION</h2>
               <p className="text-muted-foreground font-medium italic text-lg mb-8 max-w-2xl leading-relaxed">
                  &ldquo;Commander, our neural nodes suggest initializing a **Tactical Roadmap** to optimize your current stack. Your current sync bandwidth is optimal for rapid expansion into **Next.js 15 Architectures**.&rdquo;
               </p>
                <Link href="/create-roadmap">
                   <StarBorder 
                      color="var(--primary)" 
                      speed="4s" 
                      thickness={2}
                      className="hover:scale-[1.05] transition-all shadow-2xl"
                   >
                      <span className="px-12 py-1.5 font-black text-lg uppercase tracking-widest whitespace-nowrap">
                         Launch Recommended Protocol
                      </span>
                   </StarBorder>
                </Link>
            </div>
         </div>
      </section>

      {/* Global Progress Placeholder */}
      <footer className="flex flex-col items-center gap-6 py-12 opacity-50 grayscale-1">
         <div className="w-full max-w-md h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-primary rounded-full animate-glow" style={{ width: '35%' }} />
         </div>
         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Total Platform Sync: 35% Completed</p>
      </footer>
    </div>
  );
}
