import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes, Cpu, MemoryStick, GitBranch, Database, ShieldAlert, Lock, Zap,
  Globe, AlertOctagon, Activity, HardDrive, ChevronRight, CheckCircle2,
  Loader2, FlaskConical, ArrowRight, Play, RotateCcw,
} from "lucide-react";
import { SCENARIOS, type Scenario } from "@/lib/mock-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Boxes, Cpu, MemoryStick, GitBranch, Database, ShieldAlert, Lock, Zap,
  Globe, AlertOctagon, Activity, HardDrive,
};

const STEPS = [
  "Generating incident",
  "Streaming telemetry",
  "Detecting anomaly",
  "Running correlation",
  "Identifying root cause",
  "AI reasoning",
  "Human approval",
  "Executing self-healing",
  "Verifying recovery",
  "Restoring health score",
];

const sevClass = (s: Scenario["severity"]) => ({
  Low: "border-info/40 text-info bg-info/10",
  Medium: "border-warn/40 text-warn bg-warn/10",
  High: "border-error/40 text-error bg-error/10",
  Critical: "border-critical/40 text-critical bg-critical/10 pulse-ring",
}[s]);

export function ScenariosLab() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-72 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="relative flex items-center gap-4">
          <div className="size-12 rounded-xl glass-strong flex items-center justify-center glow-purple">
            <FlaskConical className="size-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Self-Healing Scenarios Lab</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Trigger production-grade failure scenarios and watch autonomous recovery in real time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SCENARIOS.map((s) => {
          const Icon = ICONS[s.icon] ?? AlertOctagon;
          return (
            <motion.button
              key={s.id}
              whileHover={{ y: -3 }}
              onClick={() => setSelected(s)}
              className="glass rounded-xl p-4 text-left relative overflow-hidden group hover:border-primary/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-10 rounded-lg glass flex items-center justify-center border border-primary/30">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${sevClass(s.severity)}`}>
                    {s.severity}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2 min-h-[2.5em]">{s.description}</p>

                <div className="space-y-1.5 text-[10px] font-mono">
                  <Row label="Systems" value={s.systems.slice(0, 2).join(", ")} />
                  <Row label="Blast radius" value={s.blastRadius} />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">AI Risk</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-14 h-1 bg-muted/40 rounded-full overflow-hidden">
                        <div className={`h-full ${s.risk > 80 ? "bg-error" : s.risk > 60 ? "bg-warn" : "bg-success"}`} style={{ width: `${s.risk}%` }} />
                      </div>
                      <span className="tabular-nums text-foreground">{s.risk}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1 text-[10px] text-primary group-hover:translate-x-1 transition-transform">
                  <Play className="size-3" /> RUN SIMULATION <ChevronRight className="size-3" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && <ScenarioRunner scenario={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground/90 truncate">{value}</span>
    </div>
  );
}

function ScenarioRunner({ scenario, onClose }: { scenario: Scenario; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setStep(0); setCompletedActions([]); setDone(false);
    let cancelled = false;
    (async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
        if (cancelled) return;
        setStep(i + 1);
        if (i === 7) {
          // execute self-healing actions
          for (let a = 0; a < scenario.actions.length; a++) {
            await new Promise((r) => setTimeout(r, 500));
            if (cancelled) return;
            setCompletedActions((arr) => [...arr, a]);
          }
        }
      }
      setDone(true);
    })();
    return () => { cancelled = true; };
  }, [scenario]);

  function restart() {
    setStep(0); setCompletedActions([]); setDone(false);
    setTimeout(() => {
      // re-run by re-invoking effect via key change in parent — simpler: trigger reload of same scenario
      const s = scenario;
      onClose();
      setTimeout(() => {
        // not ideal but fine for demo
        (window as any).__rerunScenario?.(s);
      }, 50);
    }, 50);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="glass-strong rounded-2xl w-full max-w-5xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 glass-strong border-b border-primary/20 p-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Live Simulation</div>
            <h2 className="text-xl font-bold">{scenario.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {done && (
              <button onClick={restart} className="px-3 py-1.5 rounded-lg glass border border-primary/40 text-xs text-primary flex items-center gap-1.5">
                <RotateCcw className="size-3.5" /> Replay
              </button>
            )}
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg glass border border-border text-xs">Close</button>
          </div>
        </div>

        <div className="p-5 grid md:grid-cols-2 gap-5">
          {/* Steps */}
          <div className="glass rounded-xl p-4">
            <div className="text-xs font-semibold mb-3 tracking-wide">EXECUTION PIPELINE</div>
            <div className="space-y-1.5">
              {STEPS.map((label, i) => {
                const active = step === i;
                const complete = step > i;
                return (
                  <div key={i} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded text-[11px] border ${
                    complete ? "border-success/40 bg-success/5 text-success" :
                    active ? "border-primary/50 bg-primary/10 text-primary glow-cyan" :
                    "border-border/40 text-muted-foreground"
                  }`}>
                    {complete ? <CheckCircle2 className="size-3.5" /> :
                      active ? <Loader2 className="size-3.5 animate-spin" /> :
                      <div className="size-3.5 rounded-full border border-muted-foreground/30" />}
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: details */}
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Detected Root Cause</div>
              <div className="text-sm text-error font-medium">{scenario.rootCause}</div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Autonomous Remediation</div>
              <div className="space-y-1.5">
                {scenario.actions.map((a, i) => {
                  const c = completedActions.includes(i);
                  const active = step >= 8 && !c && completedActions.length === i;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-2 text-[11px] font-mono px-2 py-1.5 rounded border ${
                        c ? "border-success/40 bg-success/5 text-success" :
                        active ? "border-warn/40 bg-warn/5 text-warn" :
                        "border-border/30 text-muted-foreground"
                      }`}
                    >
                      {c ? <CheckCircle2 className="size-3" /> :
                        active ? <Loader2 className="size-3 animate-spin" /> :
                        <div className="size-3 rounded-full border border-muted-foreground/30" />}
                      {a}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {done && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-4 border border-success/40 glow-green">
                <div className="text-[10px] uppercase tracking-wider text-success mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" /> Before → After
                </div>
                <div className="space-y-1.5">
                  {scenario.beforeAfter.map((b) => (
                    <div key={b.metric} className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{b.metric}</span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-error line-through">{b.before}</span>
                        <ArrowRight className="size-3 text-muted-foreground" />
                        <span className="text-success font-bold">{b.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
