import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Target, Zap, ArrowRight, ShieldCheck, Globe, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | DoubleDown',
  description: 'Learn more about DoubleDown – the elite execution platform for developers. Our mission is to help you double down on your career.',
};

const AboutPage = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10">
            <span className="text-sm font-black tracking-widest uppercase text-primary">Our Story</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight">
            BUILT FOR THE <br />
            <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">AMBITIOUS 1%.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
            DoubleDown started with a simple realization: the gap between &quot;good&quot; and &quot;elite&quot; 
            developers isn&apos;t just talent—it&apos;s execution. We built the engine to bridge that gap.
          </p>
        </section>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Target size={120} />
            </div>
            <h3 className="text-3xl font-black mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              To provide every developer with a high-fidelity roadmap to mastery. 
              We eliminate the noise and focus on high-signal growth that the market actually values.
            </p>
          </div>
          <div className="glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Rocket size={120} />
            </div>
            <h3 className="text-3xl font-black mb-6">Our Vision</h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              A world where career progression is deterministic, not accidental. 
              Where your effort is multiplied by intelligent tools designed for peak performance.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-black mb-16 tracking-tight text-center">Core Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe className="text-primary" />, title: "Market Context", desc: "Skills linked to real-world demand." },
              { icon: <ShieldCheck className="text-primary" />, title: "Integrity", desc: "Vetted resources, zero fluff." },
              { icon: <Users className="text-primary" />, title: "Community", desc: "Elite minds pushing each other." },
              { icon: <Zap className="text-primary" />, title: "Velocity", desc: "Fast tracking your progression." }
            ].map((v, i) => (
              <div key={i} className="glass p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all duration-500 group">
                <div className="mb-4 group-hover:scale-110 transition-transform">{v.icon}</div>
                <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass p-12 lg:p-20 rounded-[3rem] text-center border-primary/20 relative overflow-hidden">
           <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
           <div className="relative z-10">
             <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
               READY TO <span className="text-primary">DOUBLE DOWN?</span>
             </h2>
             <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
               Stop following the crowd. Start following the strategy.
             </p>
             <Link href="/sign-in">
                <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xl hover:scale-105 transition-all glow-primary flex items-center gap-3 mx-auto">
                  Initialize Your Path <ArrowRight />
                </button>
             </Link>
           </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
