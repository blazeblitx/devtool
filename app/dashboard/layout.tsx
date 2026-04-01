"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Brain,
  FileText,
  Users,
  Calendar,
  StickyNote,
  Bot,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
  Menu,
  Zap
} from "lucide-react"

import { UserButton } from "@clerk/nextjs";
import FlowingMenu from "@/components/FlowingMenu";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, tooltip: "Overview" },
  { name: "TaskFlow Studio", href: "/dashboard/projects", icon: Bot, tooltip: "Agentic Mission Control" },
  { name: "Quiz Center", href: "/dashboard/quiz", icon: Brain, tooltip: "Test your knowledge" },
  { name: "Resume Builder", href: "/dashboard/resume", icon: FileText, tooltip: "Build your resume" },
  { name: "Community Forum", href: "/dashboard/forum", icon: Users, tooltip: "Connect with others" },
  { name: "Notes / To-Do", href: "/dashboard/notes", icon: StickyNote, tooltip: "Manage your tasks" },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar, tooltip: "Schedule events" }
]

// Enhanced Quick Actions data with better organization make it more interactive and visually appealing

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Quick Actions Component with FlowingMenu integration
  const QuickActionsSection = () => {
    const flowingItems = [
      { link: '/create-roadmap', text: 'Tactical Roadmap', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop' },
      { link: '/dashboard/projects', text: 'TaskFlow Studio', image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop' },
      { link: '/dashboard/quiz', text: 'Neural Assessment', image: 'https://images.unsplash.com/photo-1620712943543-bcc4638d71d0?q=80&w=800&auto=format&fit=crop' },
      { link: '/dashboard/resume', text: 'Resume Engineer', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
      <div className="mb-16">
        <div className="flex items-center justify-between mb-10 px-2">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
               CORE <span className="text-primary italic">PROTOCOLS</span>
               <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            </h2>
            <p className="text-muted-foreground font-medium italic mt-2 opacity-70">Initialize high-frequency execution sequences.</p>
          </div>
        </div>

        <div className="h-[400px] lg:h-[600px] relative glass rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
          <FlowingMenu 
            items={flowingItems}
            speed={12}
            textColor="rgba(255,255,255,0.9)"
            bgColor="rgba(10,10,15,0.4)"
            marqueeBgColor="var(--primary)"
            marqueeTextColor="#fff"
            borderColor="rgba(255,255,255,0.05)"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-foreground selection:bg-primary/30 antialiased overflow-hidden">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* sidebar Component */}
      <aside
        id="dashboard-sidebar"
        className={`
          fixed lg:static inset-y-0 left-0 z-[70]
          ${sidebarCollapsed ? 'w-24' : 'w-72'} 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#0d0d12]/80 backdrop-blur-2xl border-r border-white/5 
          flex flex-col transition-all duration-500 ease-in-out
          shadow-2xl
        `}
        role="navigation"
        aria-label="Dashboard sidebar navigation"
      >
        {/* Logo/Brand */}
        <div className="h-24 flex items-center justify-between px-8 border-b border-white/5">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg glow-primary">
                <Zap size={18} className="text-white" />
              </div>
              <div className="font-extrabold text-xl tracking-tighter uppercase italic">
                Double<span className="text-primary">Down</span>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-10 h-10 bg-primary rounded-xl mx-auto flex items-center justify-center shadow-lg glow-primary">
              <Zap size={20} className="text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary transition-all duration-300"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto no-scrollbar" aria-label="Dashboard navigation">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500
                    ${isActive
                      ? "bg-primary text-white shadow-2xl glow-primary scale-[1.02]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-1"
                    }
                    ${sidebarCollapsed ? 'justify-center px-0' : ''}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0 transition-transform duration-500 group-hover:scale-110`} />
                  {!sidebarCollapsed && <span className="truncate">{link.name}</span>}
                  {isActive && !sidebarCollapsed && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </Link>

                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-6 px-4 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-[100] shadow-2xl glow-primary"
                    role="tooltip"
                  >
                    {link.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-[6px] border-transparent border-r-primary" />
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-white/5">
          <Link href="/dashboard/settings">
            <button
              className={`
              flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-500 w-full
              ${sidebarCollapsed ? 'justify-center px-0' : ''}
              `}
              title={sidebarCollapsed ? "Settings" : undefined}
            >
              <Settings className={`${sidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />

        {/* Enhanced Header */}
        <header
          className="h-24 bg-[#0a0a0f]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-50 shrink-0 shadow-lg"
          role="banner"
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              aria-label="Open sidebar menu"
            >
              <Menu size={22} className="text-muted-foreground" />
            </button>
            <div>
               <h1 className="text-2xl font-black tracking-tight uppercase flex items-center gap-3">
                  SYSTEM <span className="text-primary italic">INTERFACE</span>
               </h1>
               <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Neural_Link_Stable</p>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Extended Search Bar */}
            <div className="relative hidden xl:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="dashboard-search"
                type="search"
                placeholder="Scan Database..."
                className="pl-14 pr-6 py-4 w-[400px] bg-white/5 border border-white/5 rounded-2xl text-xs font-bold placeholder:text-muted-foreground/30 focus:bg-white/10 focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-500"
              />
            </div>

            {/* User Profile Hook */}
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-xl transition-all duration-500 hover:scale-110 shadow-xl border border-primary/20"
                  }
                }}
              />
            </div>
          </div>
        </header>

        {/* Unified Page Content Container */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10" role="main">
          <div className="max-w-[1600px] mx-auto">
            {pathname === '/dashboard' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <QuickActionsSection />
                {children}
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  )
}