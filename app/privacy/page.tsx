import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy | DoubleDown',
  description: 'How DoubleDown collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <article className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-[2.5rem] border-white/5 shadow-2xl">
        <header className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            PRIVACY <span className="text-primary italic">POLICY</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed">
            How DoubleDown collects, uses, and protects your personal information when you use our elite execution engine and services.
          </p>
        </header>

        <div className="space-y-12 text-muted-foreground font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">01</span>
              Information We Collect
            </h2>
            <div className="space-y-4">
              <p><strong className="text-foreground">Account Information:</strong> We collect information you provide when registering, including name, email address, username, and profile details.</p>
              <p><strong className="text-foreground">Usage Data:</strong> We automatically collect information about how you use our platform, including pages visited, features used, learning progress, and interaction patterns.</p>
              <p><strong className="text-foreground">Community Contributions:</strong> Content you submit to open-source repositories, community discussions, and educational materials.</p>
              <p><strong className="text-foreground">Technical Information:</strong> Device information, IP address, browser type, and interaction cookies for platform functionality.</p>
              <p><strong className="text-foreground">Payment Information:</strong> Billing details for premium services, processed securely through third-party processors. We do not store complete payment card information.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">02</span>
              How We Use Your Information
            </h2>
            <p className="mb-4">We use collected information to:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
              {[
                "Provide and improve our tools",
                "Personalize learning experiences",
                "Process secure payments",
                "Facilitate community interactions",
                "Send critical security alerts",
                "Analyze peak performance metrics"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">03</span>
              Information Sharing
            </h2>
            <p>
              <strong>Community Content:</strong> Your contributions are publicly visible and may be shared under open-source licenses.
            </p>
            <p className="mt-4">
              <strong>Service Providers:</strong> We share info with trusted providers who assist in operations (payment, analytics, support).
            </p>
            <p className="mt-4">
              We do <span className="text-foreground font-black">not</span> sell personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">04</span>
              Data Protection
            </h2>
            <p>We implement industry-standard security measures including:</p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3 italic"><span className="text-primary">•</span> Encryption of data in transit and at rest</li>
              <li className="flex items-center gap-3 italic"><span className="text-primary">•</span> Strict authentication and access controls</li>
              <li className="flex items-center gap-3 italic"><span className="text-primary">•</span> Regular security assessments and updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm font-black">05</span>
              Contact Info
            </h2>
            <p>
              For privacy-related questions or concerns, reach out to our elite support team at:
            </p>
            <a href="mailto:info@DoubleDown.com" className="inline-block mt-4 text-primary font-black text-xl hover:scale-105 transition-all">
              info@DoubleDown.com
            </a>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-white/10">
          <p className="text-sm italic">
            By using DoubleDown, you acknowledge that you have read and understood this Privacy Policy and consent to our privacy practices as described herein.
          </p>
        </footer>
      </article>
    </main>
  );
}