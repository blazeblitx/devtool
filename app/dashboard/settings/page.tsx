"use client";

import { UserProfile } from "@clerk/nextjs";
import { Settings, Shield, Zap, Lock } from "lucide-react";

export default function DashboardSettings() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="fixed inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-12 relative z-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase flex items-center gap-4">
             SYSTEM <span className="text-primary italic">CONFIG</span>
             <Settings className="text-primary animate-pulse w-7 h-7" />
          </h1>
          <p className="text-muted-foreground font-medium italic decoration-primary decoration-1 underline-offset-4 underline">Calibrate your neural interface and security parameters.</p>
        </div>
      </header>

      {/* Main Settings Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
         {/* Left: Security Briefing */}
         <aside className="lg:col-span-1 space-y-6">
            <div className="glass p-8 rounded-[3rem] border-white/5 bg-primary/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Shield size={80} />
               </div>
               <h2 className="text-xl font-black mb-6 tracking-tight uppercase flex items-center gap-3">
                  <Lock className="text-primary" size={20} /> ENCRYPTED DATA
               </h2>
               <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-6 italic">
                  All synchronization data is end-to-end encrypted. Your identity is proxied through our secure Clerk-DoubleDown bridge.
               </p>
               <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                     <span>Neural Link</span>
                     <span className="text-emerald-400">SECURE</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                     <span>Dossier Forge</span>
                     <span className="text-emerald-400">PRIVATE</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/5">
                     <span>Session Key</span>
                     <span className="text-primary italic">ACTIVE</span>
                  </div>
               </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border-white/5 text-center">
               <Zap className="text-primary mx-auto mb-4 animate-pulse" />
               <h3 className="text-sm font-black uppercase tracking-widest mb-2">PRO STATUS</h3>
               <p className="text-xs font-bold text-muted-foreground/60 mb-6 uppercase tracking-widest">Architect Plan Active</p>
               <button className="w-full py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10">
                  Manage Subscription
               </button>
            </div>
         </aside>

         {/* Right: Clerk Profile */}
         <div className="lg:col-span-2 glass p-4 md:p-8 rounded-[3rem] border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
            <div className="clerk-dark-override scale-95 origin-top">
               <UserProfile 
                  path="/dashboard/settings" 
                  routing="path"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent border-none shadow-none text-white",
                      navbar: "hidden", // We already have a sidebar
                      pageScrollBox: "p-0",
                      headerTitle: "text-2xl font-black uppercase tracking-tight text-white",
                      headerSubtitle: "text-muted-foreground font-medium italic",
                      profileSectionTitle: "text-primary font-black uppercase tracking-widest text-[10px] border-b border-white/5 pb-2 mb-6",
                      userPreviewMainIdentifier: "text-white font-black",
                      userPreviewSecondaryIdentifier: "text-muted-foreground font-medium italic",
                      buttonPrimary: "bg-primary hover:bg-primary/80 text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl shadow-xl glow-primary transition-all",
                      formButtonPrimary: "bg-primary hover:bg-primary/80 text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl shadow-xl glow-primary transition-all",
                      formFieldInput: "bg-black/40 border-white/10 rounded-xl text-white font-medium p-4 focus:ring-1 focus:ring-primary focus:outline-none transition-all",
                      formFieldLabel: "text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2",
                      badge: "bg-primary/20 text-primary border-primary/30 rounded-full font-black text-[10px] px-3",
                      profilePage__account: "m-0",
                    }
                  }}
               />
            </div>
            
            {/* Custom Background Aesthetic for Clerk box */}
            <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
         </div>
      </div>
    </div>
  )
}
