import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service | DoubleDown',
  description: 'The terms and conditions for using the DoubleDown elite execution engine.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <article className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-[2.5rem] border-white/5 shadow-2xl">
        <header className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            TERMS OF <span className="text-primary italic">SERVICE</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed">
            These Terms of Service constitute a binding agreement between you ("User") and DoubleDown governing your use of our elite execution engine and services.
          </p>
        </header>

        <div className="space-y-12 text-muted-foreground font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">01</span>
              Platform Overview
            </h2>
            <p className="mt-3 leading-relaxed">
              By accessing DoubleDown, you agree to these Terms. Our platform provides high-fidelity learning resources for Web Development, Data Structures & Algorithms, AI/ML, interactive coding tools, and structured roadmaps designed for market-leading performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">02</span>
              Registration & Security
            </h2>
            <p className="mt-3 leading-relaxed">
              You must provide accurate intelligence for registration and maintain peak operational security for your account. You are solely responsible for all activities under your credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">03</span>
              Acceptable Use
            </h2>
            <p className="mb-4 text-foreground font-bold italic underline decoration-primary decoration-2">Users are strictly prohibited from:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none text-sm uppercase tracking-widest font-black">
              {[
                "Illegal or harmful content",
                "IP rights violations",
                "Unauthorized systems access",
                "Harassment or deception",
                "Malicious contributions",
                "Automated data extraction"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">04</span>
              Intellectual Property
            </h2>
            <p className="mb-4 italic">
              All proprietary tools, roadmaps, and content are protected by global intellectual property laws. 
              Users receive a limited, revocable license for personal elite educational use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">05</span>
              Disclaimers
            </h2>
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 font-mono text-sm">
              THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES. DOUBLEDOWN MAKES NO GUARANTEES REGARDING SPECIFIC EDUCATIONAL OUTCOMES OR CAREER VELOCITY.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">06</span>
              Contact
            </h2>
            <p>
              For legal inquiries regarding these Terms:
            </p>
            <a href="mailto:legal@DoubleDown.com" className="inline-block mt-4 text-primary font-black text-xl hover:scale-105 transition-all">
              legal@DoubleDown.com
            </a>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-white/10">
          <p className="text-sm italic font-medium">
            By using DoubleDown, you acknowledge that you have read, understood, and agree to be bound by these elite terms of service.
          </p>
        </footer>
      </article>
    </main>
  );
}