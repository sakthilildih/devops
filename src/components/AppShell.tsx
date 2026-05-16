import { Link, useLocation } from "@tanstack/react-router";
import { Activity, FlaskConical, Radar } from "lucide-react";
import { useEffect, useState } from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const nav = [
    { to: "/", label: "Command Center", icon: Radar },
    { to: "/scenarios", label: "Scenarios Lab", icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen grid-bg">
      <header className="sticky top-0 z-50 glass-strong border-b border-primary/20">
        <div className="px-4 sm:px-6 py-3 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="size-9 rounded-lg glass-strong glow-cyan flex items-center justify-center">
                <Activity className="size-5 text-primary" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-success pulse-ring" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">SENTINEL<span className="text-primary">.AI</span></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Autonomous Ops</div>
            </div>
          </div>

          <nav className="flex items-center gap-1 ml-2">
            {nav.map((n) => {
              const active = loc.pathname === n.to;
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                    active
                      ? "bg-primary/15 text-primary border border-primary/40 glow-cyan"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="size-3.5" />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3 text-xs font-mono">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md glass border border-success/30">
              <span className="size-1.5 rounded-full bg-success pulse-ring" />
              <span className="text-success">ALL SYSTEMS NOMINAL</span>
            </div>
            <div className="px-3 py-1.5 rounded-md glass tabular-nums min-w-[180px] text-center">
              {time ? time.toISOString().replace("T", " ").slice(0, 19) + " UTC" : "—— —— —— UTC"}
            </div>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}
