"use client";

import React from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  ChevronLeft,
  Star
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground p-6 md:p-12 lg:p-24 animate-in fade-in duration-700">
      <div className="fixed inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group uppercase font-black text-xs tracking-widest">
           <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Intelligence Central
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Summary & Trust */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-primary/20 bg-primary/5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-[10px] font-black tracking-widest uppercase text-primary">Architect Protocol Alpha</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight">
                UPGRADE TO <br />
                <span className="text-primary italic">ELITE EXECUTION.</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-lg italic">
                You&apos;re initializing the ARCHITECT protocol. This layer unlocks advanced AI alignment, 
                high-signal job matching, and automated brand synthesis.
              </p>
            </div>

            <div className="space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/50 border-b border-white/5 pb-4">Protocol Benefits</h3>
               <div className="grid grid-cols-1 gap-4">
                  {[
                    "AI-Adaptive Multi-Step Roadmaps",
                    "Early-Stage Job Intelligence Feed",
                    "Elite Portfolio Engineering (No-Code)",
                    "Direct Neural Link to Senior Mentors",
                    "Priority Bandwidth for TaskFlow Studio"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all">
                       <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                       </div>
                       <span className="text-sm font-black uppercase tracking-tight text-foreground/80">{benefit}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border-white/10 bg-primary/5 text-center">
               <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
               <p className="text-xs font-black uppercase tracking-widest text-muted-foreground leading-relaxed">
                  SECURED BY ELITE ENCRYPTION. <br /> NO DATA RETAINED POST-SYNC.
               </p>
            </div>
          </div>

          {/* Right: Checkout Interface */}
          <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/5 bg-white/[0.02] shadow-2xl relative overflow-hidden flex flex-col h-full ring-1 ring-white/10">
             <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
             
             <div className="relative z-10 flex-1">
                <h2 className="text-2xl font-black mb-8 tracking-tight uppercase flex items-center gap-3">
                   <CreditCard className="text-primary" /> TRANSACTION LOG
                </h2>

                <div className="space-y-8 mb-12">
                   <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest border-b border-white/5 pb-6">
                      <span className="text-muted-foreground">Architect Protocol (Annual)</span>
                      <span className="text-foreground">$144.00 / YR</span>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                         <span>Subtotal Sync</span>
                         <span>$144.00</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 bg-emerald-400/5 px-2 py-1 rounded-md">
                         <span>Collective Discount (-20%)</span>
                         <span>-$28.80</span>
                      </div>
                   </div>

                   <div className="flex justify-between items-center pt-8 border-t border-white/10">
                      <span className="text-xl font-black uppercase tracking-tighter">Total Loadout Cost</span>
                      <div className="text-right">
                         <span className="text-3xl font-black text-primary">$115.20</span>
                         <p className="text-[10px] font-black text-muted-foreground uppercase opacity-50 mt-1">Billed Annually</p>
                      </div>
                   </div>
                </div>

                {/* Card Template (Mock) */}
                <div className="bg-gradient-to-br from-[#12121e] to-black rounded-3xl p-8 border border-white/10 mb-12 shadow-2xl group transition-all hover:border-primary/50">
                   <div className="flex justify-between items-start mb-12">
                      <div className="w-12 h-8 bg-white/10 rounded-md" />
                      <Lock className="text-primary/30" size={16} />
                   </div>
                   <div className="space-y-2 mb-8">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">Operational Identity</p>
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                   </div>
                   <div className="flex justify-between gap-4">
                      <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-1/4 bg-white/5 rounded animate-pulse" />
                   </div>
                </div>

                <button className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-xl hover:scale-[1.02] transition-all glow-primary shadow-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-4 group mb-6">
                   AUTHORIZE PAYMENT <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>

                <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-30 italic">
                   Clicking authorize initiates a secure handoff to our global payment bridge.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
