"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Search, 
  Plus, 
  Layers, 
  Settings, 
  Send, 
  Bot, 
  CheckCircle2, 
  Maximize2
} from "lucide-react";
import StarBorder from "@/components/StarBorder";

// Types
type Message = {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  status?: 'pending' | 'success' | 'executing';
};

type Mission = {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'urgent';
  progress: number;
  lastUpdate: string;
};

const missionCode: Record<string, string> = {
  '1': `/** \n * MISSION: Neural Roadmap V3 \n * DESIGNATION: Lead Tactical Architect\n */\n\nexport const initializeNeuralEngine = async (config: EngineConfig) => {\n  const strategy = await DoubleDownAI.synthesize({\n    objective: config.target,\n    priority: "performance",\n    optimizationLevel: 10\n  });\n\n  return new NeuralLink({\n    adapter: "next-turbo",\n    realtime: true,\n    visualize: strategy.roadmap\n  });\n};\n\n// TaskFlow Agent is scanning...\nexport const optimizeViewport = (missionId: string) => {\n  console.log("NEURAL CORE: Analyzing viewport drift...");\n  // Logic pending analysis...\n};`,
  '2': `/** \n * MISSION: React-Flow Integration \n * STATE: Active Analysis\n */\n\nimport { ReactFlowProvider } from 'reactflow';\nimport { createEdgeSystem } from '@/lib/flows';\n\n// Implementing custom node types\nexport const CodeBlockNode = ({ data }) => {\n  return (\n    <div className="glass p-4 rounded-xl">\n      <pre>{data.code}</pre>\n      <Handle type="source" position={Position.Bottom} />\n    </div>\n  );\n};\n\n// Awaiting architecture decision on edge routing...`,
  '3': `/** \n * MISSION: Auth Security Audit \n * STATUS: Completed\n */\n\nimport { currentUser } from '@clerk/nextjs';\nimport { redirect } from 'next/navigation';\n\nexport const requireEliteAccess = async () => {\n  const user = await currentUser();\n  \n  if (!user || user.publicMetadata.role !== 'elite') {\n     console.error("[SECURITY] Unauthorized access attempt detected.");\n     redirect('/checkout/pro');\n  }\n  \n  return {\n    granted: true,\n    user\n  };\n};`
};

export default function TaskFlowStudio() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: '1', title: 'Neural Roadmap V3', status: 'urgent', progress: 65, lastUpdate: '2m ago' },
    { id: '2', title: 'React-Flow Integration', status: 'active', progress: 40, lastUpdate: '1h ago' },
    { id: '3', title: 'Auth Security Audit', status: 'completed', progress: 100, lastUpdate: '1d ago' },
  ]);

  const [activeMission, setActiveMission] = useState<Mission>(missions[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `Hey there! 👋 I've got your workspace ready for our current mission: **${missions[0].title}**. What would you like to tackle today?` }
  ]);
  
  const [terminalLogs, setTerminalLogs] = useState<{type: string, text: string, color: string}[]>([
    {type: 'INIT', text: 'Established link to DoubleDown-01', color: 'text-primary'},
    {type: 'SCAN', text: 'Found 14 potential optimization points', color: 'text-muted-foreground'},
    {type: 'EXEC', text: '> listening for mission commands...', color: 'text-muted-foreground italic'}
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [terminalLogs]);

  const handleMissionSelect = (m: Mission) => {
    if (m.id === activeMission.id) return;
    setActiveMission(m);
    setMessages([{ id: Date.now().toString(), role: 'assistant', content: `Awesome! We've switched over to **${m.title}**. I've updated your code editor and logs. Ready when you are!` }]);
    setTerminalLogs(prev => [
      ...prev,
      { type: 'SWAP', text: `> Context switched to mission ID: ${m.id}`, color: 'text-primary' },
    ]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTerminalLogs(prev => [...prev, { type: 'CMD', text: `> executing user command: "${userMsg.content}"`, color: 'text-muted-foreground italic' }]);

    setTimeout(() => {
      const toolMsg: Message = { id: (Date.now()+1).toString(), role: 'tool', content: "Taking a quick look into that for you...", status: 'executing' };
      setMessages(prev => [...prev, toolMsg]);
      setTerminalLogs(prev => [...prev, { type: 'EXEC', text: '> executing tool: analysis_engine...', color: 'text-muted-foreground italic' }]);
      
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === toolMsg.id ? { ...m, status: 'success', content: "All done! I've found a great approach." } : m));
        setIsTyping(false);
        setTerminalLogs(prev => [...prev, { type: 'OK', text: '[OK] Execution successful. State synchronized.', color: 'text-emerald-400' }]);

        setMessages(prev => [...prev, { 
          id: (Date.now()+2).toString(), 
          role: 'assistant', 
          content: `Got it! I'm working on your request: "${userMsg.content.substring(0, 30)}${userMsg.content.length > 30 ? '...' : ''}". I've also updated your progress on this mission. You're doing great! 🚀` 
        }]);

        if (activeMission.progress < 100) {
          const newProgress = Math.min(100, activeMission.progress + 15);
          const newStatus = newProgress === 100 ? 'completed' : activeMission.status;
          
          setMissions(prev => prev.map(m => m.id === activeMission.id ? { ...m, progress: newProgress, status: newStatus } : m));
          setActiveMission(prev => ({...prev, progress: newProgress, status: newStatus}));
        }
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-140px)] lg:overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 lg:pb-0">
      <aside className="w-full h-[400px] lg:h-auto lg:w-72 glass rounded-[2.5rem] border-white/5 flex flex-col overflow-hidden shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black tracking-tight uppercase">MISSIONS</h2>
            <button className="p-0.5 rounded-xl transition-all">
              <StarBorder color="var(--primary)" speed="4s" thickness={1} className="p-0 rounded-xl">
                <div className="p-1 px-1.5 flex items-center justify-center">
                  <Plus size={18} />
                </div>
              </StarBorder>
            </button>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input placeholder="Filter..." className="w-full bg-black/40 border border-white/10 p-3 pl-10 rounded-xl text-xs font-bold" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {missions.map((m) => (
            <button 
              key={m.id}
              onClick={() => handleMissionSelect(m)}
              className={`w-full text-left p-4 rounded-2xl border transition-all group ${activeMission.id === m.id ? 'bg-primary/10 border-primary/30 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
            >
              <div className="flex justify-between items-start mb-2">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${m.status === 'urgent' ? 'text-rose-400' : m.status === 'completed' ? 'text-emerald-400' : 'text-primary'}`}>
                    {m.status}
                 </span>
                 <span className="text-[10px] font-bold text-muted-foreground">{m.lastUpdate}</span>
              </div>
              <h3 className="font-bold text-sm mb-3 group-hover:text-primary transition-colors">{m.title}</h3>
              <div className="flex items-center gap-3">
                 <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${m.status === 'urgent' ? 'bg-rose-400' : 'bg-primary'}`} 
                      style={{ width: `${m.progress}%` }} 
                    />
                 </div>
                 <span className="text-[10px] font-black text-muted-foreground">{m.progress}%</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
           <StarBorder
             color="var(--primary)"
             speed="6s"
             thickness={2}
             className="w-full hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest"
           >
             <div className="py-2.5 flex items-center justify-center gap-2">
               <Layers size={14} /> View Archived Intel
             </div>
           </StarBorder>
        </div>
      </aside>

      <main className="flex-1 flex flex-col gap-4 overflow-hidden min-h-[600px] lg:min-h-0 shrink-0 relative z-10">
         <div className="glass h-16 rounded-3xl border-white/5 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
               <div className="p-2 bg-primary/20 rounded-xl text-primary">
                  <Cpu size={18} />
               </div>
               <div>
                  <h1 className="text-sm font-black tracking-widest uppercase">{activeMission.title}</h1>
                  <p className="text-[8px] font-black text-muted-foreground tracking-[.3em]">NEURAL_CORE_V2.0</p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground"><Settings size={18} /></button>
               <button className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground"><Maximize2 size={18} /></button>
            </div>
         </div>

         <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
            <div className="flex-[2] glass rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col">
               <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-4">
                  <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">doubledown-core.ts</span>
               </div>
               <div className="flex-1 p-6 font-mono text-xs overflow-y-auto bg-black/20">
                  <pre className="text-muted-foreground opacity-80 leading-relaxed whitespace-pre-wrap">
                     <code>
                        {missionCode[activeMission.id]}
                     </code>
                  </pre>
               </div>
            </div>

            <div className="flex-1 glass rounded-[2.5rem] border-white/5 flex flex-col overflow-hidden">
               <div className="h-10 border-b border-white/5 bg-white/5 flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                     <Terminal size={12} className="text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Agent_Logs</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-bold text-muted-foreground">LIVE</span>
                  </div>
               </div>
               <div ref={terminalRef} className="flex-1 p-4 font-mono text-[9px] overflow-y-auto space-y-2 bg-black/40">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className={log.color}>
                      {log.type === 'CMD' || log.type === 'EXEC' || log.type === 'SWAP' ? log.text : `[${log.type}] ${log.text}`}
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                     <span className="text-primary">&gt;</span>
                     <span className="w-1.5 h-3 bg-primary animate-pulse" />
                  </div>
               </div>
            </div>
         </div>
      </main>

      <aside className="w-full h-[600px] lg:h-auto lg:w-96 glass rounded-[2.5rem] border-white/5 flex flex-col overflow-hidden scale-in relative z-20 shrink-0">
         <div className="p-6 border-b border-white/5 bg-white/5 shrink-0">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                   <Bot size={22} className="text-primary relative z-10" />
               </div>
               <div>
                  <h2 className="text-sm font-black tracking-tight uppercase">THE STRATEGIST</h2>
                  <div className="flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Active Intelligence</span>
                  </div>
               </div>
            </div>
         </div>

         <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m) => (
               <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  {m.role === 'tool' ? (
                     <div className="flex items-center gap-3 px-4 py-3 bg-black/40 border border-white/5 rounded-2xl text-[10px] font-bold italic text-muted-foreground mb-4">
                        {m.status === 'executing' ? (
                           <Zap size={12} className="text-primary animate-pulse" />
                        ) : (
                           <CheckCircle2 size={12} className="text-emerald-400" />
                        )}
                        {m.content}
                     </div>
                  ) : (
                     <div className={`max-w-[85%] p-5 rounded-3xl ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none glow-primary' : 'bg-white/5 text-foreground rounded-tl-none border border-white/10'}`}>
                        <p className="text-xs font-medium leading-relaxed">{m.content}</p>
                     </div>
                  )}
               </div>
            ))}
            {isTyping && (
               <div className="flex items-center gap-2 p-5 bg-white/5 border border-white/10 rounded-3xl rounded-tl-none w-20">
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
               </div>
            )}
         </div>

         <div className="p-6 bg-white/5 shrink-0 border-t border-white/5 flex flex-col items-center">
            <div className="relative group w-full mb-6">
               <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Update mission parameters..." 
                  className="w-full bg-black/40 border border-white/10 p-5 rounded-3xl pr-16 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-muted-foreground/30 resize-none font-medium text-xs leading-relaxed"
                  rows={2}
               />
               <StarBorder 
                  color="var(--primary)" 
                  speed="2s" 
                  thickness={2}
                  className="absolute right-2 bottom-6 hover:scale-105 transition-all"
                  onClick={handleSend}
               >
                  <div className="p-1.5 px-2 flex items-center justify-center">
                    <Send size={18} />
                  </div>
               </StarBorder>
            </div>
            {/* Added buffer room at bottom so Clerk dev tool doesn't obscure the input box easily */}
            <div className="h-6 opacity-0 pointer-events-none w-full" aria-hidden="true" />
         </div>
      </aside>
    </div>
  );
}
