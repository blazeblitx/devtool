"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { 
  Users, 
  Zap, 
  MessageSquare, 
  UserPlus,
  X
} from "lucide-react";

// Dynamically import ReactFlow to avoid SSR issues
const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });
import { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

// Mock Data
const syncMatches = [
  { id: '1', name: 'Alara V', role: 'Staff Rust Engineer', sync: 98, missions: ['Core-V2', 'Security-Alpha'] },
  { id: '2', name: 'Marcus K', role: 'Frontend Architect', sync: 85, missions: ['Dashboard-UI'] },
  { id: '3', name: 'Elena R', role: 'AI Strategist', sync: 92, missions: ['Neural-Core'] },
  { id: '4', name: 'Kael O', role: 'DevOps Lead', sync: 74, missions: ['Scaling-Turbo'] },
];

export default function NeuralLink() {
  const [selectedNode, setSelectedNode] = useState<typeof syncMatches[0] | null>(null);

  // ReactFlow setup
  const nodes = [
    { id: 'user', position: { x: 400, y: 300 }, data: { label: 'YOU' }, type: 'input', style: { border: '2px solid #a855f7', background: 'rgba(168, 85, 247, 0.1)', color: '#fff', padding: '20px', borderRadius: '50px', fontWeight: '900', boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' } },
    ...syncMatches.map((m, i) => ({
      id: m.id,
      position: { x: 400 + 400 * Math.cos(i * 1.5), y: 300 + 300 * Math.sin(i * 1.5) },
      data: { label: `${m.name}\n${m.sync}% SYNC` },
      style: { border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '15px', borderRadius: '24px', fontSize: '10px', fontWeight: 'bold', width: 140, boxShadow: '0 4px 12px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }
    }))
  ];

  const edges = syncMatches.map(m => ({
    id: `e-user-${m.id}`,
    source: 'user',
    target: m.id,
    animated: true,
    style: { stroke: m.sync > 90 ? '#a855f7' : m.sync > 80 ? '#3b82f6' : 'rgba(255,255,255,0.2)', strokeWidth: 2 }
  }));

  const onNodeClick = useCallback((event: React.MouseEvent, node: { id: string }) => {
    if (node.id === 'user') return;
    const match = syncMatches.find(m => m.id === node.id);
    setSelectedNode(match || null);
  }, []);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-white/5 shrink-0">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 uppercase flex items-center gap-3">
             NEURAL <span className="text-primary italic">LINK</span>
             <Users className="text-primary animate-pulse w-6 h-6" />
          </h1>
          <p className="text-muted-foreground font-medium italic">Synchronize with elite developers to multiply your execution bandwidth.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-xl glow-primary hover:scale-[1.03] transition-all text-sm uppercase tracking-widest">
              <UserPlus size={18} /> Broadcast Sync Request
           </button>
        </div>
      </div>

      {/* Main Workspace: Graph and Panel */}
      <div className="flex-1 flex gap-4 overflow-hidden">
         {/* Graph Visualization */}
         <div className="flex-1 glass rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-6 left-6 z-10 space-y-2">
               <div className="flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">42 Active Nodes</span>
               </div>
               <div className="flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/10 rounded-xl">
                  <Zap size={10} className="text-orange-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">12 Sync Sessions Live</span>
               </div>
            </div>

            <ReactFlow 
              nodes={nodes} 
              edges={edges}
              onNodeClick={onNodeClick}
              fitView
              minZoom={0.2}
              maxZoom={1.5}
            >
              <Background gap={25} color="#1e293b" />
              <Controls className="bg-white/5 border border-white/10 rounded-xl overflow-hidden fill-white" />
              <MiniMap style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }} nodeColor="#a855f7" />
            </ReactFlow>

            <div className="absolute bottom-6 right-6 z-10 italic text-[10px] font-bold text-muted-foreground opacity-40">
               Click node to initialize handshake...
            </div>
         </div>

         {/* Selection Detailed Panel */}
         <div className={`w-96 glass rounded-[2.5rem] border-white/5 flex flex-col overflow-hidden transition-transform duration-500 ${selectedNode ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)] absolute right-0'}`}>
            <div className="p-8 border-b border-white/5 bg-white/5 relative">
               <button 
                onClick={() => setSelectedNode(null)} 
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
               >
                  <X size={18} className="text-muted-foreground" />
               </button>
               <div className="w-20 h-20 bg-primary/20 rounded-[2rem] border border-primary/30 flex items-center justify-center mb-6 shadow-xl glow-primary">
                  <span className="text-3xl font-black text-primary">{selectedNode?.name[0]}</span>
               </div>
               <h2 className="text-2xl font-black tracking-tight mb-2 uppercase">{selectedNode?.name}</h2>
               <p className="text-xs font-black text-primary tracking-widest uppercase">{selectedNode?.role}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
               {/* Metrics Section */}
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-l-2 border-primary pl-3">Execution_Metrics_</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Sync Match</div>
                        <div className="text-xl font-black text-primary">{selectedNode?.sync}%</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Missions</div>
                        <div className="text-xl font-black text-primary">{selectedNode?.missions.length}</div>
                     </div>
                  </div>
               </div>

               {/* Active Context Section */}
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-l-2 border-primary pl-3">Neural_Missions_</h3>
                  <div className="flex flex-wrap gap-2">
                     {selectedNode?.missions.map((m: string) => (
                        <span key={m} className="px-3 py-1.5 bg-black/40 border border-white/5 rounded-xl text-[10px] font-black tracking-widest uppercase text-muted-foreground">
                           {m}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Bio/Context Mock */}
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-l-2 border-primary pl-3">Strategic_Intelligence_</h3>
                  <p className="text-xs font-medium leading-relaxed italic text-muted-foreground/80">
                     Experienced in optimizing high-concurrency systems and architectural scaling. Current focus is on modular frontend ecosystems.
                  </p>
               </div>
            </div>

            <div className="p-8 bg-white/5 border-t border-white/5 space-y-4">
               <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl glow-primary hover:scale-[1.03] transition-all flex items-center justify-center gap-3">
                  Initialize Sync <Zap size={14} />
               </button>
               <button className="w-full py-4 glass bg-transparent border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.25em] hover:bg-white/5 transition-all text-muted-foreground flex items-center justify-center gap-3">
                  Secure Comms <MessageSquare size={14} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
