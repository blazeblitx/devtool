"use client";

import React, { useState } from "react";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  Plus, 
  Zap, 
  Shield,
  Filter,
  MoreVertical,
  ThumbsUp,
  MessageCircle
} from "lucide-react";
import StarBorder from "@/components/StarBorder";

type ForumPost = {
  id: string;
  author: string;
  role: string;
  title: string;
  content: string;
  category: string;
  upvotes: number;
  replies: number;
  time: string;
  isVerified?: boolean;
};

export default function CommunityForum() {
  const [posts] = useState<ForumPost[]>([
    {
      id: "1",
      author: "Alex Rivers",
      role: "Staff Architect",
      title: "Optimizing Next.js 15 for High-Frequency Trading Dashboards",
      content: "I've been experimenting with the new Partial Prerendering features in Next.js 15. The results for real-time data streaming are shifting the paradigm...",
      category: "Engineering",
      upvotes: 245,
      replies: 42,
      time: "2h ago",
      isVerified: true
    },
    {
      id: "2",
      author: "Sarah Chen",
      role: "AI Strategy Lead",
      title: "The Ethics of Agentic Coding Assistants in Production",
      content: "As we move towards more autonomous agents, how do we maintain the 'Human in the Loop' without bottlenecking the development speed?",
      category: "AI/ML",
      upvotes: 189,
      replies: 56,
      time: "5h ago",
      isVerified: true
    },
    {
      id: "3",
      author: "Marcus K",
      role: "Senior Frontend",
      title: "DoubleDown Design System: Best Practices for Glassmorphism",
      content: "Creating accessible glassmorphism is more about contrast ratios than just blur values. Here's my toolkit for standardizing the aesthetic...",
      category: "Design",
      upvotes: 112,
      replies: 18,
      time: "1d ago"
    }
  ]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 uppercase flex items-center gap-3">
             ELITE <span className="text-primary italic">NETWORK</span>
             <Users className="text-primary animate-pulse w-6 h-6" />
          </h1>
          <p className="text-muted-foreground font-medium italic">Synchronize intel with the global collective of high-performance developers.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input placeholder="Scan Intel..." className="bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-xs font-black uppercase tracking-widest focus:ring-1 focus:ring-primary focus:outline-none transition-all w-64" />
           </div>
           <StarBorder 
             color="var(--primary)" 
             speed="3s" 
             thickness={2}
             className="hover:scale-[1.03] transition-all shadow-xl"
             onClick={() => {}}
           >
             <span className="flex items-center gap-2 px-6 py-1.5 font-black text-sm uppercase tracking-widest whitespace-nowrap">
                <Plus size={18} /> Broadcast Entry
             </span>
           </StarBorder>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Sidebar Categories */}
        <aside className="lg:col-span-1 space-y-6">
           <div className="glass p-6 rounded-[2.5rem] border-white/5">
              <h2 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Filter size={14} className="text-primary" /> Domains
              </h2>
              <div className="space-y-1">
                 {["All Intel", "Engineering", "AI / ML", "Architecture", "Design", "DevOps"].map((cat, i) => (
                    <button key={cat} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}>
                       {cat}
                    </button>
                 ))}
              </div>
           </div>

           <div className="glass p-6 rounded-[2.5rem] border-white/5">
              <h2 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                 <TrendingUp size={14} className="text-primary" /> Trending Protocols
              </h2>
              <div className="space-y-4">
                 {["#nextjs15", "#agentic_ai", "#turbopack", "#rust_in_js"].map((tag) => (
                    <div key={tag} className="flex items-center justify-between group cursor-pointer">
                       <span className="text-[10px] font-black text-muted-foreground group-hover:text-primary transition-colors">{tag}</span>
                       <span className="text-[10px] font-bold text-muted-foreground/30">1.2k</span>
                    </div>
                 ))}
              </div>
           </div>
        </aside>

        {/* Center: Feed */}
        <main className="lg:col-span-3 space-y-6">
           {posts.map((post) => (
              <article key={post.id} className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                    <MessageSquare size={120} />
                 </div>

                 <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 font-black text-primary shadow-xl glow-primary">
                          {post.author[0]}
                       </div>
                       <div>
                          <div className="flex items-center gap-2">
                             <h3 className="font-black text-sm uppercase tracking-tight">{post.author}</h3>
                             {post.isVerified && <Shield size={12} className="text-primary" />}
                          </div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{post.role}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{post.time}</span>
                       <button className="text-muted-foreground hover:text-primary transition-colors"><MoreVertical size={18} /></button>
                    </div>
                 </div>

                 <div className="mb-8 relative z-10">
                    <h2 className="text-xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors uppercase">{post.title}</h2>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed line-clamp-3 italic">
                       &ldquo;{post.content}&rdquo;
                    </p>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-6">
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group/stat">
                          <div className="p-2 rounded-lg bg-white/5 group-hover/stat:bg-primary/20 transition-colors">
                             <ThumbsUp size={14} />
                          </div>
                          {post.upvotes}
                       </button>
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group/stat">
                          <div className="p-2 rounded-lg bg-white/5 group-hover/stat:bg-primary/20 transition-colors">
                             <MessageCircle size={14} />
                          </div>
                          {post.replies} Intel
                       </button>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{post.category}</span>
                       <button className="p-3 bg-white/5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg scale-0 group-hover:scale-100">
                          <Zap size={16} />
                       </button>
                    </div>
                 </div>
              </article>
           ))}
        </main>
      </div>

      {/* Footer Network Stats */}
      <section className="glass p-10 rounded-[3rem] border-white/5 bg-primary/5 relative overflow-hidden text-center group">
         <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
         <div className="flex justify-around items-center gap-8 flex-wrap">
            {[
               { label: "Active Nodes", val: "14.2k", icon: <Users /> },
               { label: "Daily Intel Files", val: "842", icon: <MessageSquare /> },
               { label: "Network Bandwidth", val: "99.9%", icon: <Zap /> },
               { label: "Secured Credentials", val: "Elite", icon: <Shield /> }
            ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                     {stat.icon}
                  </div>
                  <span className="text-2xl font-black tracking-tight">{stat.val}</span>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
