"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Zap, Trophy, Target, Rocket, Shield, Star, CheckCircle2 } from "lucide-react";
import StarBorder from "@/components/StarBorder";

// Feature Card Component with Glassmorphism
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <article 
    className={`glass p-8 rounded-3xl glow-border transition-all duration-500 hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-4`}
    style={{ animationDelay: delay }}
  >
    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 glow-primary">
      {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7 text-primary" })}
    </div>
    <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-lg">
      {description}
    </p>
  </article>
);

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard = ({ quote, name, role, avatar }: TestimonialCardProps) => (
  <blockquote className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91243 16 4.01695 16H7.01695C7.56923 16 8.01695 15.5523 8.01695 15V9C8.01695 8.44772 7.56923 8 7.01695 8H3.01695C2.46467 8 2.01695 8.44772 2.01695 9V11C2.01695 11.5523 1.56923 12 1.01695 12H0.0169531V5H10.017V15C10.017 18.3137 7.33065 21 4.01695 21H2.017Z" />
      </svg>
    </div>
    <p className="text-lg mb-8 relative z-10 italic text-foreground/90 leading-relaxed">
      &ldquo;{quote}&rdquo;
    </p>
    <footer className="flex items-center gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
        <Image src={avatar} alt={name} fill className="object-cover" />
      </div>
      <div>
        <cite className="font-bold not-italic text-foreground">{name}</cite>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </footer>
  </blockquote>
);

const App = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-sm font-medium tracking-wide uppercase">New: AI Roadmap 2.0 is live</span>
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            DOUBLE DOWN <br />
            <span className="bg-gradient-to-r from-primary via-violet-400 to-indigo-500 bg-clip-text text-transparent">
              ON YOUR CAREER.
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            The all-in-one execution engine for developers. Build smarter roadmaps, 
            master new stacks, and land your next 10x role with AI-powered precision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
              <StarBorder 
                color="var(--primary)" 
                speed="3s" 
                thickness={2}
                className="hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3 font-black text-xl px-4 py-1">
                   Get Started Free <ArrowRight className="w-6 h-6" />
                </span>
              </StarBorder>
            </Link>
            <Link href="#features">
              <button className="px-10 py-5 glass text-foreground rounded-2xl font-bold text-xl hover:bg-white/5 transition-all duration-300 border border-white/10">
                View Capabilities
              </button>
            </Link>
          </div>

          {/* Hero Image/Mockup Placeholder */}
          <Link href="/dashboard/projects" className="block mt-24 relative max-w-6xl mx-auto group animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-indigo-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-75 transition duration-1000" />
            <div className="glass rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative bg-black/40">
              <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3" />
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="ml-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-50">TaskFlow_Studio_v1.0.4</div>
              </div>
              <div className="aspect-video flex items-center justify-center relative">
                <div className="text-primary animate-pulse font-mono flex flex-col items-center z-20">
                   <Target className="w-20 h-20 mb-6 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                   <span className="text-2xl tracking-[0.3em] font-black uppercase text-white">INITIALIZE INTERFACE</span>
                   <span className="mt-4 text-xs tracking-widest text-primary/60 font-black flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-primary animate-ping" /> CLICK TO LAUNCH PROTOCOL
                   </span>
                </div>
                {/* Background simulated code */}
                <div className="absolute inset-0 p-8 opacity-10 font-mono text-[10px] text-primary space-y-2 overflow-hidden select-none">
                  <p>{`> Initializing neural_link_v4.2...`}</p>
                  <p>{`> Synchronizing with edge_node_sigma...`}</p>
                  <p>{`> Authenticating user session_admin...`}</p>
                  <p>{`> Loading execution_protocols... [DONE]`}</p>
                  <p>{`> [SYSTEM] All nodes active. Awaiting command.`}</p>
                  <p>{`import { TaskFlow } from "@doubledown/core";`}</p>
                  <p>{`const agent = new TaskFlow({ mode: "aggressive" });`}</p>
                  <p>{`agent.execute("master_nextjs_deployment");`}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-muted-foreground uppercase tracking-[0.2em] font-bold text-sm mb-12">
            Accelerating growth at top engineering teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
            {/* Mockup Logos */}
            {['SYNERGY', 'VORTEX', 'NEXUS', 'PRISM', 'APEX'].map(name => (
              <span key={name} className="text-3xl font-black tracking-tighter hover:text-primary transition-colors cursor-default">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
              Engineered for <span className="text-primary">Extreme</span> Efficiency
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to bypass years of trial and error. 
              Execution-ready tools for the modern developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/create-roadmap">
              <FeatureCard 
                icon={<Target />}
                title="Precision Roadmaps"
                description="AI-generated paths that evolve with your progress. Stop guessing what to learn next."
                delay="0s"
              />
            </Link>
            <Link href="/dashboard/quick-start">
              <FeatureCard 
                icon={<Zap />}
                title="Turbocharged Learning"
                description="Curated high-signal resources indexed by difficulty and market demand."
                delay="0.1s"
              />
            </Link>
            <Link href="/dashboard/projects">
              <FeatureCard 
                icon={<Rocket />}
                title="Job Intelligence"
                description="Predictive matching that finds roles before they hit the major boards."
                delay="0.2s"
              />
            </Link>
            <Link href="/dashboard/resume">
              <FeatureCard 
                icon={<Shield />}
                title="Professional Brand"
                description="Automated portfolio and resume engineering that passes elite ATS scanners."
                delay="0.3s"
              />
            </Link>
            <Link href="/dashboard/quiz">
              <FeatureCard 
                icon={<Trophy />}
                title="Skill Verification"
                description="Interactive assessments and proofs of work that developers actually respect."
                delay="0.4s"
              />
            </Link>
            <Link href="/dashboard/forum">
              <FeatureCard 
                icon={<Star />}
                title="Elite Mentorship"
                description="Connect with senior engineers who have already walked your path."
                delay="0.5s"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
                Vetted by the <br /> 
                <span className="text-primary italic">Best.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join a community of 50,000+ ambitious developers who stopped settling for average.
              </p>
              <div className="flex -space-x-4 mb-8">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-muted overflow-hidden">
                     <Image src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" width={48} height={48} />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-background bg-primary flex items-center justify-center text-xs font-bold">
                  +50k
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <TestimonialCard 
                quote="DoubleDown took me from a stuck Junior to a Senior Engineer at a Tier 1 startup in 8 months."
                name="Sarah Johnson"
                role="Senior Frontend @ VORTEX"
                avatar="https://i.pravatar.cc/150?u=sarah"
              />
              <TestimonialCard 
                quote="The AI roadmap suggested exactly what I was missing. It's like having a Staff Engineer in your pocket."
                name="Michael Chen"
                role="Backend Architect"
                avatar="https://i.pravatar.cc/150?u=mike"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-primary/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-12 tracking-tight">Pick Your Pace</h2>
          
          <div className="flex justify-center items-center gap-4 mb-16">
            <span className={`text-lg font-bold ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 rounded-full bg-primary/20 p-1 relative transition-colors border border-primary/30"
            >
              <div className={`w-6 h-6 rounded-full bg-primary transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
            <span className={`text-lg font-bold ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly <span className="text-green-500 text-sm ml-2">(-20%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-2">Hobby</h3>
              <p className="text-muted-foreground mb-6">For the curious</p>
              <div className="text-5xl font-black mb-8">$0</div>
              <ul className="space-y-4 mb-10 text-left w-full">
                {['Standard Roadmaps', 'Community Access', 'Basic Analytics'].map(feat => (
                  <li key={feat} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {feat}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="w-full mt-auto">
                <button className="w-full py-4 glass rounded-2xl font-bold hover:bg-white/5 transition-all border border-white/10">
                  Join Free
                </button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center border-primary/50 relative glow-primary scale-105 shadow-2xl">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                Most Powerful
              </div>
              <h3 className="text-2xl font-bold mb-2">Architect</h3>
              <p className="text-muted-foreground mb-6">For the ambitious</p>
              <div className="text-5xl font-black mb-2">${isYearly ? '12' : '15'}</div>
              <p className="text-xs font-bold text-muted-foreground mb-8">per month, billed {isYearly ? 'annually' : 'monthly'}</p>
              <ul className="space-y-4 mb-10 text-left w-full">
                {['AI-Adaptive Roadmaps', 'Early Job Match', 'CV Engineering', 'Priority Support'].map(feat => (
                  <li key={feat} className="flex items-center gap-3 font-black">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {feat}
                  </li>
                ))}
              </ul>
              <Link href="/sign-in?redirect_url=/checkout/pro" className="w-full mt-auto">
                <StarBorder
                  color="var(--primary)"
                  speed="2s"
                  thickness={3}
                  className="w-full hover:scale-105 transition-all"
                >
                  <span className="font-black tracking-widest uppercase py-1 px-8 inline-block select-none">
                    Start Elevating
                  </span>
                </StarBorder>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-2">Squad</h3>
              <p className="text-muted-foreground mb-6">For high-growth teams</p>
              <div className="text-5xl font-black mb-8">Custom</div>
              <ul className="space-y-4 mb-10 text-left w-full">
                {['Team Dashboard', 'Internal Benchmarks', 'Recruiter Access', 'API Access'].map(feat => (
                  <li key={feat} className="flex items-center gap-3 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {feat}
                  </li>
                ))}
              </ul>
              <a href="mailto:sales@DoubleDown.com" className="w-full mt-auto">
                <button className="w-full py-4 glass rounded-2xl font-bold hover:bg-white/5 transition-all border border-white/10">
                  Contact Sales
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto glass p-12 lg:p-24 rounded-[3rem] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight">
              STOP SETTLING. <br />
              <span className="text-primary">EXECUTE NOW.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
              Join the elite circle of developers who use DoubleDown to outpace the market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                <StarBorder 
                  color="var(--primary)" 
                  speed="4s" 
                  thickness={4}
                  className="hover:scale-110 transition-all duration-500"
                >
                  <span className="font-black tracking-tighter text-3xl px-12 py-4 inline-block italic">
                    INITIALIZE ACCOUNT
                  </span>
                </StarBorder>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
