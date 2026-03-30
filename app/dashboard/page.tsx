"use client"

import { useState } from "react"
import Link from "next/link";
import { Zap, Target, Award, CheckCircle2, Bot, Send, X, ArrowUpRight } from "lucide-react";
import StarBorder from "@/components/StarBorder";

export default function DashboardPage() {
  const [studyBuddyOpen, setStudyBuddyOpen] = useState(false)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <section className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          COMMAND <span className="text-primary italic">CENTER</span>
        </h1>
        <p className="text-muted-foreground font-medium">Welcome back, Commander. Your execution metrics are looking optimal.</p>
      </section>

      {/* Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total XP", value: "12,480", icon: <Award className="text-primary" />, trend: "+12%" },
          { label: "Execution Streak", value: "14 Days", icon: <Zap className="text-orange-400" />, trend: "Peak" },
          { label: "Missions Done", value: "48/60", icon: <CheckCircle2 className="text-emerald-400" />, trend: "80%" },
          { label: "Active Goals", value: "4", icon: <Target className="text-rose-400" />, trend: "Critical" }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-[2rem] border-white/5 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:scale-105 shadow-xl">
             <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors">
                 {stat.icon}
               </div>
               <span className="text-xs font-black px-2 py-1 rounded-full bg-white/5 text-muted-foreground group-hover:text-primary transition-colors">
                 {stat.trend}
               </span>
             </div>
             <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider mb-1">{stat.label}</p>
             <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
             
             {/* Progress Bar for specific cards if needed */}
             {stat.label === "Missions Done" && (
                <div className="w-full bg-white/5 rounded-full h-1.5 mt-4 overflow-hidden">
                  <div className="bg-primary h-full rounded-full animate-glow shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" style={{ width: "80%" }} />
                </div>
             )}
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Missions */}
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border-white/5">
           <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-black tracking-tight">ACTIVE MISSIONS</h2>
             <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
               VIEW ALL <ArrowUpRight size={14} />
             </button>
           </div>
           
           <div className="space-y-4">
             {[
               { title: "Advanced React Patterns", status: "In Progress", progress: 65 },
               { title: "System Design Frameworks", status: "Critical", progress: 20 },
               { title: "AI Integration Suite", status: "New", progress: 0 }
             ].map((mission, i) => (
               <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                 <div className="flex-1">
                   <h4 className="font-bold text-lg mb-2">{mission.title}</h4>
                   <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${mission.progress}%` }} />
                      </div>
                      <span className="text-xs font-black text-muted-foreground w-8">{mission.progress}%</span>
                   </div>
                 </div>
                 <button className="ml-6 p-3 rounded-xl bg-primary text-white scale-0 group-hover:scale-100 transition-all shadow-lg glow-primary">
                    <Zap size={18} />
                 </button>
               </div>
             ))}
           </div>
        </div>

        {/* AI Assistant Callout */}
        <div className="glass p-8 rounded-[2.5rem] border-primary/20 relative overflow-hidden flex flex-col items-center text-center justify-center">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Bot size={120} />
           </div>
           <div className="relative z-10">
             <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-primary/30 animate-pulse">
                <Bot size={40} className="text-primary" />
             </div>
             <h3 className="text-2xl font-black mb-4 tracking-tight">AI STRATEGIST</h3>
             <p className="text-muted-foreground font-medium mb-8">
               Our neural engine is ready to optimize your current learning path.
             </p>
             <StarBorder
               color="var(--primary)"
               speed="3s"
               thickness={2}
               className="w-full hover:scale-105 transition-all shadow-2xl"
               onClick={() => setStudyBuddyOpen(true)}
             >
               <span className="font-black text-lg py-1 flex items-center justify-center gap-2">
                 Initialize Sync
               </span>
             </StarBorder>
           </div>
        </div>
      </div>

      
      {/* AI Strategist Modal */}
      {studyBuddyOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="glass p-8 rounded-[3rem] border-white/10 w-full max-w-lg shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
            <button 
               onClick={() => setStudyBuddyOpen(false)}
               className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>

            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Bot className="text-primary" />
               </div>
               <div>
                 <h2 className="text-xl font-black tracking-tight">STRATEGY SYNC</h2>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Neural Link Active</p>
               </div>
            </div>

            <textarea
              className="w-full bg-black/40 border border-white/10 p-6 rounded-3xl mb-6 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground/50 resize-none font-medium text-lg leading-relaxed"
              rows={4}
              placeholder="What mission are we optimizing today?"
            />

            <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all glow-primary flex items-center justify-center gap-3">
              Generate Tactics <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

