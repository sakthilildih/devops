import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  Activity, Heart, Boxes, AlertTriangle, Timer, Brain, ShieldAlert,
  Cpu, MemoryStick, Network, Database, GitMerge,
  Search as SearchIcon, UserCheck, Wand2, ShieldCheck, CheckCircle2, XCircle,
  ChevronRight, Sparkles, AlertOctagon, TrendingDown, TrendingUp, DollarSign,
  Bell, Clock, Server, MapPin,
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { TelemetryStream } from "./TelemetryStream";
import { PipelineFlow } from "./PipelineFlow";

type Mode = "Manual" | "Human Approval" | "Fully Autonomous";
type IncidentPhase =
  | "idle" | "detecting" | "correlating" | "rca"
  | "deciding" | "awaiting" | "healing" | "verifying" | "resolved";

export function CommandCenter() {
  const [mode, setMode] = useState<Mode>("Human Approval");
  const [phase, setPhase] = useState<IncidentPhase>("idle");
  const [activeStage, setActiveStage] = useState(-1);
  const [failedStage, setFailedStage] = useState<number | null>(null);
  const [healedStages, setHealedStages] = useState<number[]>([]);

  // Live metrics
  const [health, setHealth] = useState(98);
  const [services] = useState(247);
  const [activeServices, setActiveServices] = useState(245);
  const [incidents, setIncidents] = useState(0);
  const [mttr, setMttr] = useState(2.4);
  const [confidence, setConfidence] = useState(94);
  const [risk, setRisk] = useState(22);

  // Sparkline data
  const [healthSeries, setHealthSeries] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({ t: i, v: 96 + Math.random() * 3 })),
  );
  const [anomalySeries, setAnomalySeries] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      t: i,
      baseline: 50 + Math.sin(i / 4) * 8,
      current: 50 + Math.sin(i / 4) * 8 + (Math.random() - 0.5) * 6,
    })),
  );

  const [timeline, setTimeline] = useState<{ time: string; event: string; type: string }[]>([]);
  const [healingActions, setHealingActions] = useState<{ text: string; done: boolean }[]>([]);
  const [hilDecision, setHilDecision] = useState<"pending" | "approved" | "rejected" | null>(null);

  // Continuous noise
  useEffect(() => {
    const t = setInterval(() => {
      setHealthSeries((s) => [...s.slice(1), { t: s[s.length - 1].t + 1, v: phase === "idle" ? 96 + Math.random() * 3 : health + (Math.random() - 0.5) * 1.5 }]);
      setAnomalySeries((s) => {
        const last = s[s.length - 1];
        const baseline = 50 + Math.sin(last.t / 4) * 8;
        const spike = phase === "detecting" || phase === "correlating" || phase === "rca" ? 30 + Math.random() * 20 : 0;
        return [...s.slice(1), {
          t: last.t + 1,
          baseline,
          current: baseline + (Math.random() - 0.5) * 6 + spike,
        }];
      });
      if (phase === "idle") {
        setConfidence((c) => Math.min(99, Math.max(91, c + (Math.random() - 0.5))));
        setRisk((r) => Math.min(35, Math.max(15, r + (Math.random() - 0.5) * 2)));
      }
    }, 1000);
    return () => clearInterval(t);
  }, [phase, health]);

  function pushTimeline(event: string, type = "info") {
    const d = new Date();
    const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
    setTimeline((tl) => [...tl, { time, event, type }]);
  }

  async function runIncident() {
    if (phase !== "idle" && phase !== "resolved") return;
    setTimeline([]);
    setHealingActions([]);
    setHealedStages([]);
    setHilDecision(null);
    setIncidents(1);

    // Detection
    setPhase("detecting"); setActiveStage(0); setFailedStage(3);
    pushTimeline("Anomaly detected — payment-api p99 latency surge", "error");
    setHealth(74); setRisk(81); setConfidence(96);
    await wait(900);
    setActiveStage(2); pushTimeline("Telemetry normalized & enriched (1,284 events)", "info"); await wait(700);

    // Correlation
    setPhase("correlating"); setActiveStage(3);
    pushTimeline("Correlation engine clustered 7 related signals", "info"); await wait(800);

    // RCA
    setPhase("rca"); setActiveStage(4);
    pushTimeline("AI anomaly score: 97% · confidence 94%", "warn"); await wait(700);
    setActiveStage(5);
    pushTimeline("Root cause identified: redis-cluster shard 3 saturation", "error"); await wait(800);

    // Decision
    setPhase("deciding"); setActiveStage(6);
    pushTimeline("Decision engine: 4 remediations evaluated", "info"); await wait(700);

    // HIL gate
    if (mode === "Manual" || (mode === "Human Approval" && confidence < 98)) {
      setPhase("awaiting"); setActiveStage(7); setHilDecision("pending");
      pushTimeline("Awaiting human approval · risk HIGH", "warn");
      return; // wait for click
    }
    await proceedHealing();
  }

  async function proceedHealing() {
    setHilDecision("approved");
    pushTimeline("Action approved · executing remediation", "success");

    setPhase("healing"); setActiveStage(8);
    const actions = [
      "Failing over redis shard 3 → replica",
      "Scaling payment-api replicas 2 → 5",
      "Draining unhealthy pods on k8s-worker-04",
      "Rerouting traffic away from us-east-1a",
      "Clearing poisoned cache entries (1,284)",
      "Rebalancing workload across 3 zones",
    ];
    for (const a of actions) {
      setHealingActions((arr) => [...arr, { text: a, done: false }]);
      await wait(550);
      setHealingActions((arr) => arr.map((x) => x.text === a ? { ...x, done: true } : x));
      setHealth((h) => Math.min(99, h + 3.5));
    }
    setHealedStages([8]);

    // Verify
    setPhase("verifying"); setActiveStage(9);
    pushTimeline("Recovery verification — synthetic probes passing", "info"); await wait(900);
    setHealedStages([8, 9]); setFailedStage(null);
    setHealth(96); setRisk(24); setMttr(0.8);
    pushTimeline("Incident resolved · MTTR 47s · 0 customer impact", "success");
    setPhase("resolved");
    setActiveStage(-1);
    setTimeout(() => { setIncidents(0); setActiveServices(247); }, 1500);
  }

  function rejectAction() {
    setHilDecision("rejected");
    pushTimeline("Action rejected — escalated to on-call engineer", "warn");
    setPhase("idle"); setActiveStage(-1); setFailedStage(null); setHealth(96);
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <HeroSection mode={mode} setMode={setMode} onTrigger={runIncident} phase={phase} />

      <MetricsRow
        health={health} services={services} activeServices={activeServices}
        incidents={incidents} mttr={mttr} confidence={confidence} risk={risk}
        healthSeries={healthSeries}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PipelineFlow activeStage={activeStage} failedStage={failedStage} healedStages={healedStages} />
        </div>
        <TelemetryStream
          intensity={phase === "idle" || phase === "resolved" ? 3 : 6}
          injectSeverity={phase === "detecting" || phase === "correlating" ? "ERROR" : null}
        />
      </div>

      <NormalizationView />

      <div className="grid lg:grid-cols-2 gap-6">
        <AnomalyCenter series={anomalySeries} active={phase !== "idle" && phase !== "resolved"} />
        <RootCauseGraph phase={phase} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <HumanInTheLoop
          phase={phase} hilDecision={hilDecision}
          onApprove={proceedHealing} onReject={rejectAction}
        />
        <SelfHealingFeed actions={healingActions} phase={phase} />
      </div>

      <IncidentTimeline timeline={timeline} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><InfrastructureMap failedStage={failedStage} healedStages={healedStages} /></div>
        <BusinessImpact incidents={incidents} health={health} />
      </div>
    </div>
  );
}

function wait(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// ---------- Hero ----------
function HeroSection({ mode, setMode, onTrigger, phase }: {
  mode: Mode; setMode: (m: Mode) => void; onTrigger: () => void; phase: IncidentPhase;
}) {
  const modes: Mode[] = ["Manual", "Human Approval", "Fully Autonomous"];
  return (
    <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-20 -right-20 size-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-mono uppercase tracking-[0.2em] border border-primary/30">
              <Sparkles className="inline size-3 mr-1" />
              SENTINEL.AI · v4.2.0
            </span>
            {phase !== "idle" && phase !== "resolved" && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="px-2.5 py-1 rounded-full bg-error/20 text-error text-[10px] font-mono uppercase tracking-[0.2em] border border-error/40 pulse-ring"
              >
                <AlertOctagon className="inline size-3 mr-1" />
                INCIDENT ACTIVE
              </motion.span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            AI-Powered Autonomous Incident Intelligence
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Real-time telemetry correlation, anomaly detection, root-cause analysis, and self-healing remediation across your entire infrastructure.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[280px]">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Autonomous Mode</div>
          <div className="glass rounded-lg p-1 flex">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 px-2 py-1.5 text-[11px] rounded-md font-medium transition-all ${
                  mode === m ? "bg-primary text-primary-foreground glow-cyan" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={onTrigger}
            disabled={phase !== "idle" && phase !== "resolved"}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-error to-critical text-white text-sm font-semibold flex items-center justify-center gap-2 glow-red disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
          >
            <AlertOctagon className="size-4" />
            Simulate Live Incident
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Metrics ----------
function MetricsRow({ health, services, activeServices, incidents, mttr, confidence, risk, healthSeries }: any) {
  const cards = [
    { label: "System Health Score", value: health, suffix: "%", icon: Heart, color: health > 90 ? "success" : health > 75 ? "warn" : "error", spark: true },
    { label: "Active Services", value: activeServices, suffix: `/${services}`, icon: Boxes, color: "primary" },
    { label: "Active Incidents", value: incidents, icon: AlertTriangle, color: incidents > 0 ? "error" : "success" },
    { label: "Mean Resolution Time", value: mttr, decimals: 1, suffix: "m", icon: Timer, color: "primary" },
    { label: "AI Confidence", value: confidence, decimals: 0, suffix: "%", icon: Brain, color: "accent" },
    { label: "Infrastructure Risk", value: risk, suffix: "%", icon: ShieldAlert, color: risk > 70 ? "error" : risk > 40 ? "warn" : "success" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        const colorClass = {
          success: "text-success", error: "text-error", warn: "text-warn",
          primary: "text-primary", accent: "text-accent",
        }[c.color];
        return (
          <motion.div
            key={c.label}
            layout
            className="glass rounded-xl p-4 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`size-4 ${colorClass}`} />
              {c.spark && (
                <div className="w-16 h-6">
                  <ResponsiveContainer>
                    <AreaChart data={healthSeries}>
                      <defs>
                        <linearGradient id="sparkH" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.78 0.18 200)" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="oklch(0.78 0.18 200)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="oklch(0.78 0.18 200)" strokeWidth={1.5} fill="url(#sparkH)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
            <div className={`text-2xl font-bold tabular-nums ${colorClass} text-glow-cyan`}>
              <AnimatedCounter value={c.value} decimals={c.decimals ?? 0} suffix={c.suffix ?? ""} />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{c.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ---------- Normalization ----------
function NormalizationView() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick((x) => x + 1), 3000); return () => clearInterval(t); }, []);

  const samples = [
    { raw: "CPU spike detected on node-4 (94%)", norm: { service: "payment-api", severity: "critical", metric: "cpu", value: "94%", region: "us-east-1", node: "node-4" } },
    { raw: "Connection refused: redis-cluster:6379", norm: { service: "redis-cluster", severity: "error", error: "ECONNREFUSED", port: 6379, retries: 3 } },
    { raw: "Login burst from 14.91.x.x — 8200 attempts/min", norm: { service: "auth-gateway", severity: "security", threat: "credential_stuffing", source_asn: "AS14618", rate: 8200 } },
  ];
  const sample = samples[tick % samples.length];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide">NORMALIZATION & CORRELATION</h3>
          <p className="text-[11px] text-muted-foreground">Raw signals transformed into structured, dependency-aware events</p>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">throughput: 18.4k events/s</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] uppercase text-muted-foreground mb-1.5">Raw Telemetry</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tick + "-raw"}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="glass rounded-lg p-3 font-mono text-xs h-40 border border-error/20"
            >
              <div className="text-muted-foreground">$ tail -f /var/log/telemetry.raw</div>
              <div className="text-error mt-2">{sample.raw}</div>
              <div className="text-muted-foreground/60 mt-3 text-[10px]">+ 7 related signals detected...</div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div>
          <div className="text-[10px] uppercase text-muted-foreground mb-1.5">Normalized Event</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tick + "-norm"}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="glass rounded-lg p-3 font-mono text-xs h-40 border border-success/20"
            >
              <pre className="text-success">{JSON.stringify(sample.norm, null, 2)}</pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono">
        {["payment-api", "redis-cluster", "checkout-svc", "postgres-primary"].map((s, i) => (
          <motion.div
            key={s}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="glass rounded p-2 text-center border border-primary/20"
          >
            <Network className="inline size-3 mr-1 text-primary" />
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------- Anomaly ----------
function AnomalyCenter({ series, active }: { series: any[]; active: boolean }) {
  const score = active ? 97 : 14;
  return (
    <div className="glass rounded-xl p-5 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 size-40 rounded-full bg-accent/10 blur-3xl" />
      <div className="flex items-center justify-between mb-4 relative">
        <div className="flex items-center gap-2">
          <Brain className={`size-5 ${active ? "text-error" : "text-accent"}`} />
          <h3 className="text-sm font-semibold tracking-wide">AI ANOMALY DETECTION</h3>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">model: sentinel-xl-v3</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 relative">
        <Stat label="Anomaly Score" value={score} suffix="%" tone={active ? "error" : "success"} />
        <Stat label="AI Confidence" value={active ? 94 : 99} suffix="%" tone="accent" />
        <Stat label="Predicted Impact" value={active ? 12.4 : 0.1} decimals={1} suffix="k users" tone={active ? "warn" : "success"} />
      </div>

      <div className="h-36 -mx-2">
        <ResponsiveContainer>
          <LineChart data={series}>
            <CartesianGrid stroke="oklch(0.78 0.18 200 / 8%)" strokeDasharray="3 3" />
            <XAxis dataKey="t" hide />
            <YAxis hide domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "oklch(0.21 0.035 260)", border: "1px solid oklch(0.78 0.18 200 / 30%)", fontSize: 11 }} />
            <Line type="monotone" dataKey="baseline" stroke="oklch(0.78 0.18 200 / 60%)" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="current" stroke="oklch(0.65 0.25 25)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 glass rounded-lg p-3 text-[11px] border border-accent/30">
        <div className="flex items-center gap-1.5 text-accent font-semibold mb-1">
          <Sparkles className="size-3" /> AI REASONING
        </div>
        <div className="text-foreground/80 leading-relaxed">
          {active
            ? "Pattern matches incident signature #SIG-4291: cascading database saturation. Predicted blast radius: checkout + billing services. Recommend immediate failover of redis shard 3."
            : "Baseline behavior nominal across 247 services. Seasonal traffic patterns recognized. No anomalies require intervention."}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, suffix, decimals = 0, tone = "primary" }: any) {
  const cls = { error: "text-error", success: "text-success", warn: "text-warn", primary: "text-primary", accent: "text-accent" }[tone as string];
  return (
    <div className="glass rounded-lg p-2.5">
      <div className={`text-xl font-bold tabular-nums ${cls}`}>
        <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
      </div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

// ---------- RCA Graph ----------
function RootCauseGraph({ phase }: { phase: IncidentPhase }) {
  const showRoot = phase === "rca" || phase === "deciding" || phase === "awaiting" || phase === "healing" || phase === "verifying";
  const nodes = [
    { id: "API Gateway", x: 50, y: 10, icon: Network },
    { id: "Payment Service", x: 50, y: 35, icon: Server },
    { id: "Redis Cache", x: 20, y: 65, icon: MemoryStick, root: true },
    { id: "Primary DB", x: 80, y: 65, icon: Database },
    { id: "Checkout", x: 20, y: 92, icon: Boxes, impacted: true },
    { id: "Billing", x: 80, y: 92, icon: Boxes, impacted: true },
  ];
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SearchIcon className="size-5 text-primary" />
          <h3 className="text-sm font-semibold tracking-wide">ROOT CAUSE DEPENDENCY GRAPH</h3>
        </div>
        {showRoot && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[10px] font-mono text-error border border-error/40 px-2 py-0.5 rounded bg-error/10">
            ROOT CAUSE IDENTIFIED
          </motion.span>
        )}
      </div>
      <div className="relative h-72">
        <svg className="absolute inset-0 w-full h-full">
          {[
            ["API Gateway", "Payment Service"],
            ["Payment Service", "Redis Cache"],
            ["Payment Service", "Primary DB"],
            ["Redis Cache", "Checkout"],
            ["Primary DB", "Billing"],
          ].map(([a, b], i) => {
            const na = nodes.find((n) => n.id === a)!;
            const nb = nodes.find((n) => n.id === b)!;
            const failed = showRoot && (b === "Redis Cache" || (a === "Redis Cache"));
            return (
              <line
                key={i}
                x1={`${na.x}%`} y1={`${na.y}%`} x2={`${nb.x}%`} y2={`${nb.y}%`}
                stroke={failed ? "oklch(0.65 0.25 25)" : "oklch(0.78 0.18 200 / 50%)"}
                strokeWidth={failed ? 2 : 1.2}
                className={failed ? "flow-line" : ""}
              />
            );
          })}
        </svg>
        {nodes.map((n) => {
          const isRoot = showRoot && n.root;
          const isImpacted = showRoot && n.impacted;
          const Icon = n.icon;
          return (
            <motion.div
              key={n.id}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              animate={isRoot ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className={`glass rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 border ${
                isRoot ? "border-error glow-red" : isImpacted ? "border-warn/60" : "border-primary/30"
              }`}>
                <Icon className={`size-3.5 ${isRoot ? "text-error" : isImpacted ? "text-warn" : "text-primary"}`} />
                <span className="text-[10px] font-medium whitespace-nowrap">{n.id}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">
        <div className="glass rounded p-2"><div className="text-muted-foreground">Blast Radius</div><div className="text-error font-bold text-sm">2 services</div></div>
        <div className="glass rounded p-2"><div className="text-muted-foreground">Impacted Users</div><div className="text-warn font-bold text-sm">~12.4k</div></div>
        <div className="glass rounded p-2"><div className="text-muted-foreground">Est. Recovery</div><div className="text-primary font-bold text-sm">~45s</div></div>
      </div>
    </div>
  );
}

// ---------- HIL ----------
function HumanInTheLoop({ phase, hilDecision, onApprove, onReject }: any) {
  const awaiting = phase === "awaiting";
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UserCheck className="size-5 text-primary" />
          <h3 className="text-sm font-semibold tracking-wide">HUMAN-IN-THE-LOOP CONTROL</h3>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
          awaiting ? "border-warn text-warn bg-warn/10 pulse-ring" :
          hilDecision === "approved" ? "border-success text-success bg-success/10" :
          hilDecision === "rejected" ? "border-error text-error bg-error/10" :
          "border-muted text-muted-foreground"
        }`}>
          {awaiting ? "APPROVAL REQUIRED" : hilDecision?.toUpperCase() ?? "STANDBY"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass rounded-lg p-3">
          <div className="text-[10px] uppercase text-muted-foreground">AI Confidence</div>
          <div className="text-2xl font-bold text-accent tabular-nums">82%</div>
          <div className="h-1 bg-muted/30 rounded-full mt-1 overflow-hidden">
            <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: "82%" }} />
          </div>
        </div>
        <div className="glass rounded-lg p-3">
          <div className="text-[10px] uppercase text-muted-foreground">Risk Level</div>
          <div className="text-2xl font-bold text-error tabular-nums">HIGH</div>
          <div className="h-1 bg-muted/30 rounded-full mt-1 overflow-hidden">
            <motion.div className="h-full bg-error" initial={{ width: 0 }} animate={{ width: "76%" }} />
          </div>
        </div>
      </div>

      <div className="glass rounded-lg p-3 mb-4 border border-primary/30">
        <div className="text-[10px] uppercase text-muted-foreground mb-1">Recommended Action</div>
        <div className="text-sm font-medium">Failover redis-cluster shard 3 → replica, restart payment-api containers, reroute traffic away from us-east-1a</div>
      </div>

      <div className="flex gap-2">
        <button
          disabled={!awaiting}
          onClick={onApprove}
          className="flex-1 px-3 py-2 rounded-lg bg-success text-background text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-30 hover:scale-[1.02] transition-transform glow-green disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="size-4" /> Approve
        </button>
        <button
          disabled={!awaiting}
          onClick={onReject}
          className="flex-1 px-3 py-2 rounded-lg bg-error/20 border border-error text-error text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-30 hover:scale-[1.02] transition-transform disabled:cursor-not-allowed"
        >
          <XCircle className="size-4" /> Reject
        </button>
        <button
          disabled={!awaiting}
          className="flex-1 px-3 py-2 rounded-lg bg-warn/20 border border-warn text-warn text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-30 hover:scale-[1.02] transition-transform disabled:cursor-not-allowed"
        >
          <Bell className="size-4" /> Escalate
        </button>
      </div>
    </div>
  );
}

// ---------- Self-Healing Feed ----------
function SelfHealingFeed({ actions, phase }: { actions: { text: string; done: boolean }[]; phase: IncidentPhase }) {
  const beforeAfter = [
    { metric: "CPU Usage", before: "94%", after: "43%", tone: "success" },
    { metric: "Pod Status", before: "Unhealthy", after: "Healthy", tone: "success" },
    { metric: "Error Rate", before: "37%", after: "0.2%", tone: "success" },
  ];
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wand2 className="size-5 text-success" />
          <h3 className="text-sm font-semibold tracking-wide">SELF-HEALING EXECUTION</h3>
        </div>
        {phase === "resolved" && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[10px] font-mono text-success border border-success/40 px-2 py-0.5 rounded bg-success/10 glow-green">
            ✓ INCIDENT RESOLVED
          </motion.span>
        )}
      </div>

      <div className="space-y-1.5 min-h-[180px] font-mono text-[11px]">
        <AnimatePresence>
          {actions.length === 0 && (
            <div className="text-muted-foreground/60 text-center py-12 text-xs">
              Awaiting remediation directive...
            </div>
          )}
          {actions.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded border ${
                a.done ? "border-success/40 bg-success/5" : "border-warn/40 bg-warn/5"
              }`}
            >
              {a.done ? (
                <CheckCircle2 className="size-3.5 text-success shrink-0" />
              ) : (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="size-3.5 border-2 border-warn border-t-transparent rounded-full shrink-0" />
              )}
              <span className={a.done ? "text-success" : "text-warn"}>{a.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {phase === "resolved" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 grid grid-cols-3 gap-2">
          {beforeAfter.map((b) => (
            <div key={b.metric} className="glass rounded-lg p-2.5 border border-success/30">
              <div className="text-[9px] uppercase text-muted-foreground">{b.metric}</div>
              <div className="flex items-center gap-1 text-xs mt-1">
                <span className="text-error line-through">{b.before}</span>
                <ChevronRight className="size-3 text-muted-foreground" />
                <span className="text-success font-semibold">{b.after}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ---------- Timeline ----------
function IncidentTimeline({ timeline }: { timeline: { time: string; event: string; type: string }[] }) {
  const toneClass: Record<string, string> = {
    info: "border-info text-info",
    warn: "border-warn text-warn",
    error: "border-error text-error",
    success: "border-success text-success",
  };
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="size-5 text-primary" />
        <h3 className="text-sm font-semibold tracking-wide">INCIDENT TIMELINE</h3>
      </div>
      {timeline.length === 0 ? (
        <div className="text-muted-foreground/60 text-xs text-center py-8">No active incidents — trigger a simulation above</div>
      ) : (
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-primary/30" />
          {timeline.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="relative mb-3 last:mb-0"
            >
              <div className={`absolute -left-[19px] top-1 size-2.5 rounded-full bg-background border-2 ${toneClass[e.type] ?? "border-primary"}`} />
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{e.time}</span>
                <span className={`text-xs ${toneClass[e.type]?.split(" ")[1] ?? "text-foreground"}`}>{e.event}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Infra Map ----------
function InfrastructureMap({ failedStage, healedStages }: { failedStage: number | null; healedStages: number[] }) {
  const incident = failedStage !== null;
  const healed = healedStages.length > 0;
  const regions = [
    { id: "us-east-1", x: 28, y: 45, nodes: 18, state: incident && !healed ? "down" : healed ? "recovered" : "healthy" },
    { id: "us-west-2", x: 12, y: 50, nodes: 14, state: "healthy" },
    { id: "eu-west-1", x: 48, y: 40, nodes: 12, state: "healthy" },
    { id: "ap-south-1", x: 70, y: 55, nodes: 9, state: "healthy" },
    { id: "ap-ne-1", x: 85, y: 45, nodes: 11, state: "healthy" },
    { id: "sa-east-1", x: 35, y: 75, nodes: 6, state: "healthy" },
  ];
  const tone = (s: string) =>
    s === "down" ? "bg-error glow-red" :
    s === "recovered" ? "bg-info glow-cyan" : "bg-success glow-green";

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-primary" />
          <h3 className="text-sm font-semibold tracking-wide">GLOBAL INFRASTRUCTURE MAP</h3>
        </div>
        <div className="flex gap-3 text-[10px] font-mono">
          <span className="text-success">● HEALTHY</span>
          <span className="text-error">● AFFECTED</span>
          <span className="text-info">● RECOVERED</span>
        </div>
      </div>
      <div className="relative h-80 glass rounded-lg overflow-hidden grid-bg">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {regions.map((a, i) =>
            regions.slice(i + 1).map((b, j) => (
              <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="oklch(0.78 0.18 200 / 18%)" strokeWidth="0.15" />
            )),
          )}
        </svg>
        {regions.map((r) => (
          <div key={r.id} style={{ left: `${r.x}%`, top: `${r.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className={`size-3 rounded-full ${tone(r.state)} ${r.state === "down" ? "pulse-ring" : ""}`} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-2 py-0.5 rounded text-[9px] font-mono">
                {r.id} · {r.nodes}n
              </div>
            </div>
          </div>
        ))}
        {/* Animated traffic packets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute size-1.5 rounded-full bg-primary glow-cyan"
            initial={{ left: "12%", top: "50%" }}
            animate={{ left: ["12%", "48%", "70%", "85%"], top: ["50%", "40%", "55%", "45%"] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "linear" }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Business Impact ----------
function BusinessImpact({ incidents, health }: { incidents: number; health: number }) {
  const kpis = [
    { label: "Downtime Avoided", value: 142, suffix: "h", icon: Clock, color: "success", trend: "+18%" },
    { label: "Estimated Savings", value: 2.4, decimals: 1, prefix: "$", suffix: "M", icon: DollarSign, color: "success", trend: "+22%" },
    { label: "Incidents Prevented", value: 1284, icon: ShieldCheck, color: "primary", trend: "+9%" },
    { label: "SLA Health", value: 99.97, decimals: 2, suffix: "%", icon: Heart, color: "success", trend: "stable" },
    { label: "MTTR Reduction", value: 87, suffix: "%", icon: TrendingDown, color: "accent", trend: "-31%" },
    { label: "Alert Fatigue", value: 76, suffix: "% ↓", icon: Bell, color: "accent", trend: "-44%" },
  ];
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="size-5 text-success" />
        <h3 className="text-sm font-semibold tracking-wide">BUSINESS IMPACT (30D)</h3>
      </div>
      <div className="space-y-2">
        {kpis.map((k) => {
          const Icon = k.icon;
          const cls = { success: "text-success", primary: "text-primary", accent: "text-accent" }[k.color];
          return (
            <div key={k.label} className="glass rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`size-8 rounded-md glass flex items-center justify-center ${cls}`}>
                  <Icon className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</div>
                  <div className={`text-lg font-bold tabular-nums ${cls}`}>
                    <AnimatedCounter value={k.value} decimals={k.decimals ?? 0} prefix={k.prefix ?? ""} suffix={k.suffix ?? ""} />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-success">{k.trend}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
