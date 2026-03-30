"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaDiscord,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";
import { Menu, X, Rocket } from "lucide-react";
import ClickSpark from "@/components/ClickSpark";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname?.() || "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/30 min-h-screen">
        <ClerkProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark" 
            enableSystem
            disableTransitionOnChange={false}
          >
            <ClickSpark
              sparkColor="#fff"
              sparkCount={12}
              sparkSize={12}
              sparkRadius={20}
              duration={500}
            >
              <div className="flex flex-col min-h-screen">
                {isDashboard ? (
                  <main className="flex-1 overflow-x-hidden">{children}</main>
                ) : (
                  <>
                    {/* Premium Floating Header */}
                    <header
                      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
                        scrolled ? "pt-4" : "pt-8"
                      }`}
                    >
                      <nav 
                        className={`max-w-7xl mx-auto glass rounded-[2rem] px-6 py-3 flex items-center justify-between transition-all duration-500 ${
                          scrolled ? "shadow-2xl border-white/10" : "border-white/5"
                        }`}
                      >
                        <Link
                          href="/"
                          className="flex items-center gap-3 group"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center glow-primary group-hover:rotate-12 transition-transform duration-500">
                            <Rocket className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent group-hover:to-primary transition-all duration-300">
                            DoubleDown
                          </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                          <Link href="/#features" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Capabilities</Link>
                          <Link href="/about" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">About</Link>
                          <Link href="/#pricing" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                          <div className="h-4 w-[1px] bg-white/10 mx-2" />
                          <ThemeSwitcher />
                          
                          <SignedOut>
                            <Link href="/sign-in">
                              <button className="px-6 py-2.5 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-all">
                                Login
                              </button>
                            </Link>
                          </SignedOut>

                          <SignedIn>
                            <div className="flex items-center gap-4">
                              <UserButton afterSignOutUrl="/" />
                              <Link href="/dashboard">
                                <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:scale-105 transition-all glow-primary">
                                  Dashboard
                                </button>
                              </Link>
                            </div>
                          </SignedIn>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center gap-4">
                          <ThemeSwitcher />
                          <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 text-muted-foreground hover:text-foreground"
                          >
                            {mobileOpen ? <X /> : <Menu />}
                          </button>
                        </div>
                      </nav>

                      {/* Mobile Menu */}
                      <div className={`md:hidden absolute top-full left-6 right-6 mt-4 transition-all duration-500 ${
                        mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                      }`}>
                        <div className="glass rounded-[2rem] p-6 flex flex-col gap-6 items-center text-center shadow-2xl">
                          <Link href="/#features" onClick={() => setMobileOpen(false)} className="text-xl font-bold">Capabilities</Link>
                          <Link href="/about" onClick={() => setMobileOpen(false)} className="text-xl font-bold">About</Link>
                          <Link href="/#pricing" onClick={() => setMobileOpen(false)} className="text-xl font-bold">Pricing</Link>
                          <SignedOut>
                            <Link href="/sign-in" className="w-full">
                              <button className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg">Login</button>
                            </Link>
                          </SignedOut>
                          <SignedIn>
                            <Link href="/dashboard" className="w-full">
                              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg">Dashboard</button>
                            </Link>
                          </SignedIn>
                        </div>
                      </div>
                    </header>

                    <main className="flex-1">{children}</main>

                    {/* Modern Footer */}
                    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
                      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="md:col-span-1">
                          <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-primary">
                              <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter">DoubleDown</span>
                          </Link>
                          <p className="text-muted-foreground leading-relaxed mb-8">
                            The elite execution platform for developers who refuse to settle for average. 
                            Double down on your skills, brand, and career.
                          </p>
                          <div className="flex gap-4">
                            {[FaGithub, FaLinkedin, FaInstagram, FaDiscord].map((Icon, i) => (
                              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-muted-foreground hover:text-primary">
                                <Icon size={18} />
                              </a>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Platform</h4>
                          <ul className="space-y-4 text-muted-foreground font-medium">
                            <li><Link href="/#features" className="hover:text-foreground transition-colors">Roadmaps</Link></li>
                            <li><Link href="/#features" className="hover:text-foreground transition-colors">Skill Hub</Link></li>
                            <li><Link href="/#features" className="hover:text-foreground transition-colors">Job Matching</Link></li>
                            <li><Link href="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Company</h4>
                          <ul className="space-y-4 text-muted-foreground font-medium">
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                            <li><a href="mailto:info@DoubleDown.com" className="hover:text-foreground transition-colors">Contact</a></li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-primary">Join the Elite</h4>
                          <p className="text-sm text-muted-foreground mb-6 font-medium">
                            Subscribe to our intelligence reports on the developer market.
                          </p>
                          <form className="relative">
                            <input 
                              type="email" 
                              placeholder="Email address" 
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                            <button type="submit" className="absolute right-2 top-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:scale-105 transition-all text-white">
                              <FaArrowRight size={12} />
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <p>&copy; {new Date().getFullYear()} DoubleDown. Built for the 1%.</p>
                        <div className="flex gap-8">
                          <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                          <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                        </div>
                      </div>
                    </footer>
                  </>
                )}
              </div>
            </ClickSpark>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
