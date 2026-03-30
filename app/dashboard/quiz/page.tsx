"use client";

import React, { useState } from "react";
import { 
  Brain, 
  Zap, 
  Trophy, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Lock,
  Cpu,
  Layers,
  Award,
  Search,
  Filter
} from "lucide-react";

type QuizModule = {
  id: string;
  title: string;
  category: string;
  difficulty: 'Novice' | 'Architect' | 'Grandmaster';
  questions: number;
  timeLimit: string;
  rewardXP: number;
  completed: boolean;
  locked?: boolean;
};

export default function SkillVerification() {
  const [quizzes] = useState<QuizModule[]>([
    { id: '1', title: 'React Performance Ops', category: 'Frontend', difficulty: 'Architect', questions: 12, timeLimit: '15m', rewardXP: 450, completed: true },
    { id: '2', title: 'Systems Design: Scale 10x', category: 'Backend', difficulty: 'Grandmaster', questions: 8, timeLimit: '25m', rewardXP: 1200, completed: false, locked: false },
    { id: '3', title: 'Rust Memory Safety', category: 'Systems', difficulty: 'Architect', questions: 10, timeLimit: '20m', rewardXP: 800, completed: false, locked: false },
    { id: '4', title: 'AI Implementation Suite', category: 'AI/ML', difficulty: 'Novice', questions: 15, timeLimit: '12m', rewardXP: 300, completed: false, locked: false },
    { id: '5', title: 'Security: Zero Trust', category: 'Security', difficulty: 'Grandmaster', questions: 5, timeLimit: '30m', rewardXP: 1500, completed: false, locked: true },
    { id: '6', title: 'Turbopack Architecture', category: 'DevOps', difficulty: 'Architect', questions: 10, timeLimit: '18m', rewardXP: 600, completed: false, locked: true },
  ]);

  const stats = [
    { label: "Sync Level", value: "Level 14", icon: <Brain size={18} />, sub: "9,250 XP to Next" },
    { label: "Badges Earned", value: "08", icon: <Award size={18} />, sub: "Top 5% of Engineers" },
    { label: "Total Completed", value: "24", icon: <CheckCircle2 size={18} />, sub: "Across 4 Domains" }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 uppercase flex items-center gap-3">
             NEURAL <span className="text-primary italic">ASSESSMENT</span>
             <Zap className="text-primary animate-pulse w-6 h-6" />
          </h1>
          <p className="text-muted-foreground font-medium italic">Validate your execution bandwidth and secure elite-tier credentials.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input placeholder="Filter Protocols..." className="bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-xs font-bold focus:ring-1 focus:ring-primary focus:outline-none transition-all w-64" />
           </div>
           <button className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all text-muted-foreground">
              <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {stats.map((s, i) => (
           <div key={i} className="glass p-8 rounded-[2rem] border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all">
              <div className="absolute -top-4 -right-4 bg-primary/5 p-8 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 mb-4 relative z-10">
                 <div className="p-3 bg-primary/20 rounded-2xl text-primary glow-primary">
                    {s.icon}
                 </div>
                 <span className="text-sm font-black text-muted-foreground uppercase tracking-widest">{s.label}</span>
              </div>
              <h3 className="text-3xl font-black mb-2 relative z-10">{s.value}</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">{s.sub}</p>
           </div>
         ))}
      </div>

      {/* Main Grid: Quiz Modules */}
      <div>
         <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-xl font-black tracking-tight uppercase flex items-center gap-2">
               <Layers className="text-primary" /> Active Protocols
            </h2>
            <div className="flex gap-2">
               {['All', 'Frontend', 'Backend', 'Security'].map((cat) => (
                 <button key={cat} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${cat === 'All' ? 'bg-primary text-white shadow-lg' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}>
                    {cat}
                 </button>
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                className={`glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group transition-all duration-500 flex flex-col min-h-[380px] ${quiz.locked ? 'opacity-60 grayscale' : 'hover:border-primary/50 hover:-translate-y-2'}`}
              >
                 {/* Visual Background Elements */}
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    {quiz.category === 'Frontend' ? <Layers size={100} /> : <Cpu size={100} />}
                 </div>
                 
                 {/* Status Badges */}
                 <div className="flex justify-between items-start mb-8 relative z-10">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 ${quiz.difficulty === 'Grandmaster' ? 'bg-rose-500/10 text-rose-400' : quiz.difficulty === 'Architect' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-400'}`}>
                       {quiz.difficulty}
                    </span>
                    {quiz.completed && (
                       <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                          <CheckCircle2 size={10} /> Verified
                       </div>
                    )}
                    {quiz.locked && (
                       <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 text-muted-foreground rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                          <Lock size={10} /> Locked
                       </div>
                    )}
                 </div>

                 {/* Content */}
                 <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-black mb-4 tracking-tight leading-[1.1] group-hover:text-primary transition-colors">
                       {quiz.title}
                    </h3>
                    <p className="text-[10px] font-black text-muted-foreground mb-10 tracking-[0.2em] uppercase">Ref: PROTOCOL_{quiz.id}_ALPHA</p>
                    
                    <div className="grid grid-cols-2 gap-y-6">
                       <div className="space-y-1">
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Loadout</span>
                          <div className="flex items-center gap-2 text-xs font-bold">
                             <Target size={14} className="text-primary" /> {quiz.questions} Targets
                          </div>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Duration</span>
                          <div className="flex items-center gap-2 text-xs font-bold">
                             <Clock size={14} className="text-primary" /> {quiz.timeLimit} Window
                          </div>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Sync Yield</span>
                          <div className="flex items-center gap-2 text-xs font-bold">
                             <Zap size={14} className="text-orange-400" /> +{quiz.rewardXP} XP
                          </div>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Domain</span>
                          <div className="flex items-center gap-2 text-xs font-bold">
                             <Layers size={14} className="text-primary" /> {quiz.category}
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Footer Button */}
                 <div className="mt-12 pt-8 border-t border-white/5 relative z-10">
                    <button 
                      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 ${quiz.locked ? 'bg-white/5 cursor-not-allowed text-muted-foreground' : 'bg-primary text-white hover:scale-[1.03] active:scale-95 shadow-xl glow-primary'}`}
                      disabled={quiz.locked}
                    >
                       {quiz.completed ? 'Re-Sync Intel' : quiz.locked ? 'Neural Link Required' : 'Initialize Assessment'}
                       {!quiz.completed && !quiz.locked && <ArrowRight size={14} />}
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Global Milestone Progress (Bottom) */}
      <section className="glass p-10 rounded-[3rem] border-white/5 bg-primary/5 relative overflow-hidden text-center group">
         <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
         
         <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Trophy size={32} className="text-primary glow-primary" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter mb-4">PLATINUM ENGINEER MILESTONE</h2>
            <p className="text-muted-foreground max-w-lg mb-8 text-sm font-medium italic"> Complete 4 more Architect-level protocols to unlock the **Elite Network Tier** and priority execution status.</p>
            
            <div className="w-full max-w-md h-2 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
                <div className="h-full bg-primary rounded-full animate-glow" style={{ width: '75%' }} />
            </div>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">75% Sync Progress</span>
         </div>
      </section>
    </div>
  );
}
