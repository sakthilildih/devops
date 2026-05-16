import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Area, AreaChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  RadialBar, RadialBarChart, PolarAngleAxis,
} from "recharts";
import {
  Activity, AlertOctagon, AlertTriangle, Box, Boxes, Brain, Cloud, Cpu,
  Database, Filter, GitBranch, GitMerge, Globe, HardDrive, Heart, Layers,
  Lock, Network, Radar, Radio, Server, Shield, ShieldCheck, Sparkles,
  Terminal, Wand2, Workflow, Zap, CheckCircle2, ArrowDown, Wifi, Eye,
  Container, Waves, FileSearch, Gauge, Rocket, Crosshair, Binary,
} from "lucide-react";
import { TelemetryStream } from "./TelemetryStream";
import { AnimatedCounter } from "./AnimatedCounter";

/* =====================================================================
   CINEMATIC JOURNEY — top-to-bottom AI Ops + Self-Healing storyline
   ===================================================================== */

export function CinematicJourney() {
  // Autonomous incident clock — drives the whole page
  const [phase, setPhase] = useState<
    "stable" | "detect" | "correlate" | "decide" | "heal" | "recovered"
  >("stable");

  useEffect(() => {
    const sequence: Array<"stable" | "detect" | "correlate" | "decide" | "heal" | "recovered"> = [
      "stable", "detect", "correlate", "decide", "heal", "recovered",
    ];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % sequence.length;
      setPhase(sequence[i]);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-24 max-w-[1600px] mx-auto pb-24">
      <JourneyHero phase={phase} />
      <SectionDivider index={1} title="Data Collection" subtitle="Layer 1 · Telemetry Sources" />
      <Section1Infrastructure phase={phase} />
      <FlowConnector label="EMITTING 184,290 events/sec" />

      <SectionDivider index={2} title="Live Telemetry Stream" subtitle="Layer 1 · Continuous Ingestion" />
      <Section2TelemetryStream phase={phase} />
      <FlowConnector label="STREAMING TO NORMALIZATION ENGINE" />

      <SectionDivider index={3} title="Normalization Engine" subtitle="Layer 2 · Schema Refinement" />
      <Section3Normalization />
      <FlowConnector label="STRUCTURED EVENTS · 18.4k/s" />

      <SectionDivider index={4} title="Context Enrichment" subtitle="Layer 2 · Operational Intelligence" />
      <Section4Enrichment />
      <FlowConnector label="ENRICHED INTELLIGENT EVENTS" />

      <SectionDivider index={5} title="Correlation Engine" subtitle="Layer 2 · Dependency Awareness" />
      <Section5Correlation phase={phase} />
      <FlowConnector label="CORRELATED INCIDENT GROUPS" />

      <SectionDivider index={6} title="AI Anomaly Detection" subtitle="Layer 3 · Neural Inference Core" />
      <Section6AnomalyAI phase={phase} />
      <FlowConnector label="ROOT-CAUSE INVESTIGATION INITIATED" />

      <SectionDivider index={7} title="Root Cause Analysis" subtitle="Layer 3 · Blast-Radius Mapping" />
      <Section7RCA phase={phase} />
      <FlowConnector label="REMEDIATION PLAN GENERATED" />

      <SectionDivider index={8} title="AI Decision Engine" subtitle="Layer 4 · Fully Autonomous" />
      <Section8Decision phase={phase} />
      <FlowConnector label="EXECUTING AUTONOMOUS ACTIONS" />

      <SectionDivider index={9} title="Autonomous Self-Healing" subtitle="Layer 4 · Live Remediation" />
      <Section9SelfHealing phase={phase} />
      <FlowConnector label="INFRASTRUCTURE STATE CHANGES APPLIED" />

      <SectionDivider index={10} title="AI Change Tracker" subtitle="Audit · Executed by Sentinel.AI" />
      <Section10ChangeTracker />
      <FlowConnector label="RECOVERY VERIFICATION IN PROGRESS" />

      <SectionDivider index={11} title="Recovery & Stabilization" subtitle="Final · System Restored" />
      <Section11Recovery phase={phase} />

      <JourneyFooter />
    </div>
  );
}

/* ============================ HERO ================================== */

function JourneyHero({ phase }: { phase: string }) {
  const phaseLabel: Record<string, { label: string; color: string }> = {
    stable: { label: "ALL SYSTEMS NOMINAL", color: "success" },
    detect: { label: "ANOMALY DETECTED", color: "error" },
    correlate: { label: "CORRELATING SIGNALS", color: "warn" },
    decide: { label: "AI PLANNING REMEDIATION", color: "accent" },
    heal: { label: "AUTONOMOUS HEALING IN PROGRESS", color: "primary" },
    recovered: { label: "INFRASTRUCTURE STABILIZED", color: "success" },
  };
  const ph = phaseLabel[phase];

  return (
    <section className="relative min-h-[78vh] flex flex-col items-center justify-center overflow-hidden glass-strong rounded-3xl px-6 py-20">
      {/* Animated background grid + particles */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-accent/20 blur-3xl animate-pulse" />
      </div>
      <Particles count={40} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/40 mb-6">
          <span className={`size-2 rounded-full bg-${ph.color} pulse-ring`} />
          <span className={`text-[10px] font-mono uppercase tracking-[0.3em] text-${ph.color}`}>
            {ph.label}
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] bg-gradient-to-br from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
          The Autonomous<br />Infrastructure Brain
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Watch a real production incident travel through every layer of an enterprise AI Ops platform —
          from raw telemetry to autonomous self-healing — in cinematic real time.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { l: "Services Observed", v: 247, s: "" },
            { l: "Events / sec", v: 184290, s: "" },
            { l: "Incidents Auto-Healed", v: 1284, s: "" },
            { l: "Avg MTTR", v: 43, s: "s" },
          ].map((m) => (
            <div key={m.l} className="glass rounded-xl p-4">
              <div className="text-xl md:text-2xl font-bold tabular-nums text-glow-cyan text-primary">
                <AnimatedCounter value={m.v} suffix={m.s} />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                {m.l}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mt-14 inline-flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Follow the telemetry</span>
          <ArrowDown className="size-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Particles({ count = 30 }: { count?: number }) {
  const [items, setItems] = useState<Array<{ x: number; d: number; delay: number; size: number }>>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        d: 4 + Math.random() * 6,
        delay: Math.random() * 6,
        size: 1 + Math.random() * 2,
      })),
    );
  }, [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, boxShadow: "0 0 8px currentColor" }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ============================ DIVIDERS / CONNECTORS ============================ */

function SectionDivider({ index, title, subtitle }: { index: number; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex items-center gap-5"
    >
      <div className="size-14 rounded-2xl glass-strong glow-cyan flex items-center justify-center font-bold text-lg text-primary text-glow-cyan tabular-nums">
        {String(index).padStart(2, "0")}
      </div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">{subtitle}</div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent ml-2" />
    </motion.div>
  );
}

function FlowConnector({ label }: { label: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      <svg viewBox="0 0 8 120" className="w-2 h-28 overflow-visible">
        <line x1="4" y1="0" x2="4" y2="120" stroke="oklch(0.78 0.18 200 / 25%)" strokeWidth="1" />
        <line
          x1="4" y1="0" x2="4" y2="120"
          stroke="oklch(0.85 0.18 195)" strokeWidth="2"
          strokeDasharray="6 14"
          className="flow-line"
          style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.18 195))" }}
        />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="4" r="2.5" fill="oklch(0.85 0.18 195)"
            initial={{ cy: 0, opacity: 0 }}
            animate={{ cy: 120, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.18 195))" }}
          />
        ))}
      </svg>
      <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ============================ SECTION 1 — Infrastructure ============================ */

const INFRA_GROUPS = [
  {
    name: "Cloud & Compute",
    items: [
      { name: "AWS EC2", icon: Server, metric: "CPU", value: "92%", sub: "i-04a · us-east-1", status: "warn" },
      { name: "Kubernetes", icon: Boxes, metric: "PODS", value: "18/20", sub: "prod-cluster", status: "warn" },
      { name: "Docker", icon: Container, metric: "CONTAINERS", value: "412", sub: "across 24 nodes", status: "ok" },
      { name: "Lambda", icon: Zap, metric: "INVOCATIONS", value: "8.4k/s", sub: "cold-start 1.2%", status: "ok" },
      { name: "API Gateway", icon: Wifi, metric: "REQ/s", value: "21,840", sub: "p99 142ms", status: "ok" },
      { name: "Load Balancer", icon: Workflow, metric: "TARGETS", value: "32/32", sub: "healthy", status: "ok" },
    ],
  },
  {
    name: "Data & Streaming",
    items: [
      { name: "Kafka", icon: Waves, metric: "EVENTS/s", value: "14,820", sub: "lag 120 msgs", status: "ok" },
      { name: "Redis", icon: Zap, metric: "OPS/s", value: "84,210", sub: "hit-rate 96%", status: "ok" },
      { name: "PostgreSQL", icon: Database, metric: "QPS", value: "12,408", sub: "p99 38ms", status: "ok" },
      { name: "MongoDB", icon: Database, metric: "QPS", value: "4,820", sub: "replSet OK", status: "ok" },
      { name: "RDS", icon: HardDrive, metric: "CONNECTIONS", value: "382/500", sub: "us-east-1", status: "ok" },
    ],
  },
  {
    name: "Observability",
    items: [
      { name: "Prometheus", icon: Gauge, metric: "SERIES", value: "1.2M", sub: "scrape 15s", status: "ok" },
      { name: "Grafana", icon: Activity, metric: "DASHBOARDS", value: "184", sub: "12 alerting", status: "ok" },
      { name: "OpenTelemetry", icon: Radio, metric: "SPANS/s", value: "48,210", sub: "sampled 10%", status: "ok" },
      { name: "Fluentd", icon: Filter, metric: "LOGS/s", value: "92,400", sub: "buffered 0.4%", status: "ok" },
      { name: "Logstash", icon: Filter, metric: "PIPELINES", value: "24", sub: "all healthy", status: "ok" },
    ],
  },
  {
    name: "DevOps & Security",
    items: [
      { name: "Jenkins", icon: GitBranch, metric: "BUILDS", value: "184", sub: "queue 2", status: "ok" },
      { name: "GitHub Actions", icon: GitBranch, metric: "WORKFLOWS", value: "62", sub: "running 8", status: "ok" },
      { name: "WAF", icon: Shield, metric: "BLOCKED", value: "4,231", sub: "last 5m", status: "ok" },
      { name: "Firewall", icon: Shield, metric: "PPS", value: "1.8M", sub: "drop 0.4%", status: "ok" },
      { name: "IAM", icon: Lock, metric: "TOKENS", value: "18,402", sub: "mfa 94%", status: "ok" },
    ],
  },
];

function Section1Infrastructure({ phase }: { phase: string }) {
  return (
    <div className="space-y-6">
      {INFRA_GROUPS.map((g, gi) => (
        <div key={g.name}>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/80">{g.name}</div>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {g.items.map((s, i) => (
              <InfraCard key={s.name} item={s} delay={(gi * 6 + i) * 0.04} pulse={phase === "detect" && s.name === "Redis"} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function InfraCard({
  item, delay = 0, pulse = false,
}: {
  item: { name: string; icon: any; metric: string; value: string; sub: string; status: string };
  delay?: number; pulse?: boolean;
}) {
  const Icon = item.icon;
  const statusColor = pulse ? "error" : item.status === "warn" ? "warn" : "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`glass rounded-xl p-3.5 relative overflow-hidden group hover:border-primary/50 transition-all ${
        pulse ? "border-error/60 glow-red" : ""
      }`}
    >
      {/* mini scanner */}
      <motion.div
        className="absolute inset-x-0 h-px bg-primary/40"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 2.2, repeat: Infinity, delay: delay * 4 }}
      />
      <div className="flex items-center justify-between mb-2 relative">
        <Icon className={`size-4 ${pulse ? "text-error" : "text-primary"}`} />
        <span className={`size-1.5 rounded-full bg-${statusColor} ${pulse ? "pulse-ring" : ""}`} />
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {item.name}
      </div>
      <div className={`text-lg font-bold tabular-nums mt-0.5 ${pulse ? "text-error" : "text-foreground"}`}>
        {item.value}
      </div>
      <div className="text-[9px] font-mono text-muted-foreground/80 mt-0.5">
        {item.metric} · {item.sub}
      </div>
    </motion.div>
  );
}

/* ============================ SECTION 2 — Telemetry Stream ============================ */

function Section2TelemetryStream({ phase }: { phase: string }) {
  const intensity = phase === "stable" || phase === "recovered" ? 5 : 9;
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TelemetryStream intensity={intensity} injectSeverity={phase === "detect" ? "ERROR" : phase === "correlate" ? "CRITICAL" : null} />
      </div>
      <div className="glass rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Binary className="size-4 text-primary" />
          <span className="text-sm font-semibold tracking-wide">INGESTION RATES</span>
        </div>
        {[
          { label: "Application Logs", v: 92400, color: "primary" },
          { label: "Infrastructure Metrics", v: 48210, color: "accent" },
          { label: "Distributed Traces", v: 21408, color: "info" },
          { label: "Security Events", v: 4231, color: "warn" },
          { label: "Audit Events", v: 1840, color: "success" },
        ].map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-mono tabular-nums">{r.v.toLocaleString()}/s</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
              <motion.div
                className={`h-full bg-${r.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (r.v / 100000) * 100 + 10)}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
          </div>
        ))}
        <div className="pt-3 border-t border-border text-[10px] font-mono text-muted-foreground">
          Sustained throughput · 184,290 events/s · zero drops
        </div>
      </div>
    </div>
  );
}

/* ============================ SECTION 3 — Normalization ============================ */

function Section3Normalization() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 3500);
    return () => clearInterval(t);
  }, []);
  const samples = [
    {
      raw: "CPU HIGH ON NODE-4 ALERT 94 PERCENT",
      norm: { service: "payment-api", node: "node-4", metric: "cpu", value: 94, severity: "critical", region: "us-east-1" },
    },
    {
      raw: "redis-cluster:6379 connection refused after 3 retries",
      norm: { service: "redis-cluster", port: 6379, error: "ECONNREFUSED", retries: 3, severity: "error" },
    },
    {
      raw: "pod checkout-svc-7f9d crashloop count=4 reason=OOMKilled",
      norm: { service: "checkout-svc", pod: "checkout-svc-7f9d", reason: "OOMKilled", restarts: 4, severity: "high" },
    },
  ];
  const s = samples[tick % samples.length];

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center relative">
        {/* LEFT — raw */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-error mb-2">Raw Telemetry</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tick + "raw"}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="glass rounded-lg p-4 font-mono text-xs border border-error/30 h-44 overflow-hidden"
            >
              <div className="text-muted-foreground">$ tail -f /var/log/raw</div>
              <div className="text-error mt-2 break-all">{s.raw}</div>
              <div className="text-muted-foreground/60 mt-3 text-[10px]">+ 14,820 unstructured signals queued</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER — processor */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative size-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-primary/30 spin-slow" />
            <div className="absolute inset-2 rounded-full border border-accent/30 spin-slow" style={{ animationDirection: "reverse", animationDuration: "6s" }} />
            <div className="absolute inset-4 rounded-full border border-primary/40 spin-slow" style={{ animationDuration: "4s" }} />
            <div className="size-16 rounded-2xl glass-strong glow-cyan flex items-center justify-center">
              <Cpu className="size-8 text-primary" />
            </div>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary">AI Normalizer</div>
          <div className="text-[10px] font-mono text-muted-foreground">18.4k events/s</div>
        </div>

        {/* RIGHT — structured */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-success mb-2">Normalized Event</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tick + "norm"}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="glass rounded-lg p-4 font-mono text-xs border border-success/30 h-44 overflow-auto"
            >
              <pre className="text-success leading-relaxed">{JSON.stringify(s.norm, null, 2)}</pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================ SECTION 4 — Enrichment ============================ */

function Section4Enrichment() {
  const tags = [
    { label: "region: us-east-1", icon: Globe, color: "primary" },
    { label: "tier: payments", icon: Layers, color: "accent" },
    { label: "owner: payments-platform", icon: Eye, color: "info" },
    { label: "criticality: tier-0", icon: Crosshair, color: "error" },
    { label: "depends_on: redis-cluster", icon: Network, color: "warn" },
    { label: "compliance: PCI-DSS", icon: Shield, color: "success" },
    { label: "sla: 99.99%", icon: Gauge, color: "primary" },
    { label: "rev_impact: $4.2k/min", icon: Activity, color: "accent" },
  ];
  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-center">
      <div className="glass rounded-xl p-5">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Input · Normalized Event</div>
        <pre className="font-mono text-xs text-foreground/80 leading-relaxed">
{`{
  "service": "payment-api",
  "metric": "cpu",
  "value": 94,
  "severity": "critical"
}`}
        </pre>
      </div>

      <div className="glass rounded-xl p-5 relative overflow-hidden">
        <div className="text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
          Output · Context-Aware Intelligent Event
        </div>
        <div className="font-mono text-xs text-foreground/85 leading-relaxed mb-4">
{`{ "service": "payment-api", "metric": "cpu", "value": 94, "severity": "critical",`}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full glass border border-${t.color}/40 text-[10px] font-mono`}
              >
                <Icon className={`size-3 text-${t.color}`} />
                <span>{t.label}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="font-mono text-xs text-foreground/85 mt-3">{`}`}</div>
      </div>
    </div>
  );
}

/* ============================ SECTION 5 — Correlation ============================ */

function Section5Correlation({ phase }: { phase: string }) {
  // Graph nodes
  const nodes = [
    { id: "ec2", x: 80, y: 60, label: "EC2 node-4", icon: Server, root: true },
    { id: "redis", x: 290, y: 60, label: "Redis cluster", icon: Zap },
    { id: "payment", x: 500, y: 60, label: "Payment API", icon: Cpu },
    { id: "checkout", x: 710, y: 60, label: "Checkout SVC", icon: Boxes },
    { id: "db", x: 290, y: 220, label: "Postgres", icon: Database },
    { id: "queue", x: 500, y: 220, label: "Billing queue", icon: Waves },
    { id: "user", x: 710, y: 220, label: "Customers", icon: Eye },
  ];
  const links: [string, string][] = [
    ["ec2", "redis"], ["redis", "payment"], ["payment", "checkout"],
    ["redis", "db"], ["payment", "queue"], ["checkout", "user"],
  ];
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const active = phase === "correlate" || phase === "decide" || phase === "heal";

  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/80">
          Dependency Graph · Blast Radius
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">7 services · 6 links · 1 root cause</div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 800 320" className="w-full min-w-[700px] h-[340px]">
          <defs>
            <radialGradient id="glowGreen">
              <stop offset="0%" stopColor="oklch(0.72 0.2 155 / 60%)" />
              <stop offset="100%" stopColor="oklch(0.72 0.2 155 / 0%)" />
            </radialGradient>
            <radialGradient id="glowRed">
              <stop offset="0%" stopColor="oklch(0.65 0.25 25 / 60%)" />
              <stop offset="100%" stopColor="oklch(0.65 0.25 25 / 0%)" />
            </radialGradient>
          </defs>

          {links.map(([a, b], i) => {
            const A = map[a]; const B = map[b];
            return (
              <g key={i}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke={active ? "oklch(0.65 0.25 25 / 60%)" : "oklch(0.78 0.18 200 / 35%)"}
                  strokeWidth="1.5" />
                {active && (
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="oklch(0.85 0.18 195)" strokeWidth="2"
                    strokeDasharray="6 8" className="flow-line"
                    style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.18 195))" }} />
                )}
              </g>
            );
          })}

          {nodes.map((n) => {
            const Icon = n.icon;
            const isRoot = active && n.root;
            return (
              <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                {isRoot && (
                  <>
                    <circle r="38" fill="url(#glowRed)" />
                    <motion.circle r="28" fill="none" stroke="oklch(0.65 0.25 25)" strokeWidth="1.5"
                      animate={{ r: [28, 50, 28], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }} />
                  </>
                )}
                {!isRoot && active && (
                  <circle r="28" fill="url(#glowRed)" opacity="0.5" />
                )}
                {!active && (
                  <circle r="26" fill="url(#glowGreen)" />
                )}
                <circle r="22"
                  fill="oklch(0.21 0.035 260)"
                  stroke={isRoot ? "oklch(0.65 0.25 25)" : active ? "oklch(0.78 0.18 70)" : "oklch(0.78 0.18 200)"}
                  strokeWidth="1.5" />
                <foreignObject x="-11" y="-11" width="22" height="22">
                  <div className="flex items-center justify-center w-full h-full">
                    <Icon className={`size-4 ${isRoot ? "text-error" : active ? "text-warn" : "text-primary"}`} />
                  </div>
                </foreignObject>
                <text y="42" textAnchor="middle" className="fill-foreground/80 font-mono"
                  style={{ fontSize: 10 }}>{n.label}</text>
                {isRoot && (
                  <text y="-32" textAnchor="middle" className="fill-error font-mono font-bold"
                    style={{ fontSize: 9, letterSpacing: "0.15em" }}>ROOT</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mt-4">
        {[
          { l: "Correlated Signals", v: 1284, c: "primary" },
          { l: "Affected Services", v: 7, c: "warn" },
          { l: "Estimated Customer Reach", v: "12,400", c: "error" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-lg p-3 border border-border">
            <div className={`text-xl font-bold tabular-nums text-${s.c}`}>{typeof s.v === "number" ? s.v.toLocaleString() : s.v}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ SECTION 6 — AI Anomaly Detection ============================ */

function Section6AnomalyAI({ phase }: { phase: string }) {
  const active = phase !== "stable" && phase !== "recovered";
  const score = active ? 97 : 12;

  const series = useMemo(
    () => Array.from({ length: 60 }, (_, i) => ({
      t: i,
      baseline: 50 + Math.sin(i / 5) * 6,
      current: 50 + Math.sin(i / 5) * 6 + (i > 35 && active ? (i - 35) * 1.6 + Math.random() * 5 : (Math.random() - 0.5) * 4),
    })),
    [active],
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* AI Core */}
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative size-48 flex items-center justify-center mb-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-accent/40"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          <div className="absolute inset-4 rounded-full border border-primary/30 spin-slow" />
          <div className="absolute inset-8 rounded-full border-2 border-dashed border-accent/40 spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "12s" }} />
          <div className="relative size-24 rounded-full glass-strong glow-purple flex items-center justify-center">
            <Brain className="size-12 text-accent" />
          </div>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">AI Inference Core</div>
        <div className={`text-5xl font-bold tabular-nums mt-2 ${active ? "text-error text-glow-red" : "text-success text-glow-green"}`}>
          {score}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Anomaly Score</div>
        <div className="text-[10px] font-mono text-muted-foreground mt-3">model: sentinel-xl-v4 · 248B params</div>
      </div>

      {/* Baseline vs current */}
      <div className="lg:col-span-2 glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold tracking-wide">BASELINE vs CURRENT BEHAVIOR</div>
            <div className="text-[10px] font-mono text-muted-foreground">payment-api · p99 latency (ms) · last 60m</div>
          </div>
          <div className="flex gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1.5"><span className="size-2 bg-muted-foreground rounded-full" />Baseline</span>
            <span className="flex items-center gap-1.5"><span className="size-2 bg-accent rounded-full" />Current</span>
          </div>
        </div>

        <div className="h-52">
          <ResponsiveContainer>
            <AreaChart data={series}>
              <defs>
                <linearGradient id="curG" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.22 320)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.72 0.22 320)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.78 0.18 200 / 10%)" />
              <XAxis dataKey="t" hide />
              <YAxis hide domain={[0, 140]} />
              <Area type="monotone" dataKey="baseline" stroke="oklch(0.68 0.03 250)" strokeDasharray="4 4" fill="transparent" strokeWidth={1.4} />
              <Area type="monotone" dataKey="current" stroke="oklch(0.72 0.22 320)" fill="url(#curG)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { l: "Confidence", v: "97%", c: "accent" },
            { l: "Predicted Impact", v: "$4.2k/min", c: "error" },
            { l: "Blast Radius", v: "7 svc", c: "warn" },
            { l: "Risk Level", v: "CRITICAL", c: "error" },
          ].map((m) => (
            <div key={m.l} className="glass rounded-lg p-3 border border-border">
              <div className={`text-lg font-bold text-${m.c}`}>{m.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ SECTION 7 — RCA ============================ */

function Section7RCA({ phase }: { phase: string }) {
  const chain = [
    { name: "API Gateway", icon: Wifi, status: "ok" },
    { name: "Payment Service", icon: Cpu, status: "warn" },
    { name: "Redis Cache", icon: Zap, status: "root" },
    { name: "Primary Database", icon: Database, status: "ok" },
  ];
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
      <div className="glass rounded-2xl p-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/80 mb-4">
          Dependency Investigation
        </div>
        <div className="flex flex-col gap-3">
          {chain.map((c, i) => {
            const Icon = c.icon;
            const isRoot = c.status === "root";
            return (
              <div key={c.name} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl glass relative overflow-hidden ${
                    isRoot ? "border-error/60 glow-red" : c.status === "warn" ? "border-warn/40" : "border-border"
                  }`}
                >
                  {isRoot && (
                    <motion.div
                      className="absolute inset-0 bg-error/10"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <div className={`size-10 rounded-lg glass flex items-center justify-center relative ${
                    isRoot ? "border-error/60" : ""
                  }`}>
                    <Icon className={`size-5 ${isRoot ? "text-error" : c.status === "warn" ? "text-warn" : "text-primary"}`} />
                    {isRoot && <span className="absolute inset-0 rounded-lg pulse-ring" />}
                  </div>
                  <div className="flex-1 relative">
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      {isRoot ? "ROOT CAUSE · shard-3 quorum loss" : c.status === "warn" ? "degraded · upstream dep" : "nominal"}
                    </div>
                  </div>
                  {isRoot && (
                    <span className="px-2 py-1 rounded-md bg-error/20 text-error text-[10px] font-mono uppercase tracking-widest border border-error/40 relative">
                      Root Cause
                    </span>
                  )}
                </motion.div>
                {i < chain.length - 1 && (
                  <div className="my-1 h-6 w-px bg-gradient-to-b from-primary/60 to-primary/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <FileSearch className="size-4 text-accent" />
          <span className="text-sm font-semibold">IMPACT ASSESSMENT</span>
        </div>
        {[
          { l: "Impacted Services", v: "7" },
          { l: "Customer Reach", v: "12,400" },
          { l: "Est. Downtime if Untreated", v: "11 min" },
          { l: "Est. Revenue at Risk", v: "$46.2k" },
          { l: "SLA Burn", v: "12% of monthly budget" },
        ].map((s) => (
          <div key={s.l} className="flex items-center justify-between border-b border-border/40 pb-2">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{s.l}</span>
            <span className="font-mono text-sm font-semibold">{s.v}</span>
          </div>
        ))}
        <div className="text-[10px] font-mono text-error mt-2">
          Blast radius expanding · 0:42 to widespread impact
        </div>
      </div>
    </div>
  );
}

/* ============================ SECTION 8 — Decision Engine ============================ */

function Section8Decision({ phase }: { phase: string }) {
  const plan = [
    "Restart unhealthy payment-svc containers",
    "Scale replicas 2 → 5 across 3 zones",
    "Failover Redis shard 3 → replica",
    "Flush poisoned cache entries (1,284)",
    "Enable failover routing to us-west-2",
    "Rollback canary deployment v2.18.0",
    "Rebalance workloads across zones",
    "Tighten WAF rate-limit profile to STRICT",
  ];
  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
      {/* AI thinking */}
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-4 text-accent" />
            <span className="text-sm font-semibold">AI DECISION KERNEL</span>
            <span className="ml-auto px-2 py-0.5 rounded bg-success/15 text-success text-[10px] font-mono border border-success/30">
              FULLY AUTONOMOUS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <RadialGauge value={97} label="Confidence" color="oklch(0.72 0.22 320)" />
            <RadialGauge value={94} label="Severity" color="oklch(0.65 0.25 25)" />
          </div>

          <div className="font-mono text-[11px] text-muted-foreground leading-relaxed space-y-1">
            <TypingLine text="> evaluating 24 candidate remediation strategies..." />
            <TypingLine text="> scoring by impact / risk / blast-radius..." delay={1200} />
            <TypingLine text="> simulating in shadow environment (sim_12848)..." delay={2200} />
            <TypingLine text="> plan selected: payments-redis-failover-v4" delay={3200} className="text-success" />
            <TypingLine text="> human approval: SKIPPED (autonomous mode)" delay={4000} className="text-accent" />
            <TypingLine text="> dispatching to remediation runtime..." delay={4800} className="text-primary" />
          </div>
        </div>
      </div>

      {/* Action plan */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">AUTONOMOUS ACTION PLAN</span>
          <span className="text-[10px] font-mono text-muted-foreground">est. recovery 43s</span>
        </div>
        <div className="space-y-2">
          {plan.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-2.5 rounded-lg glass border border-border hover:border-primary/40 transition-colors"
            >
              <div className="size-6 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-[10px] font-mono text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="text-[12px] flex-1">{p}</span>
              <CheckCircle2 className="size-4 text-success" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RadialGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const data = [{ name: label, value, fill: color }];
  return (
    <div className="glass rounded-lg p-3 flex items-center gap-3">
      <div className="size-16 relative">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "oklch(0.28 0.04 260)" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums">{value}%</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold" style={{ color }}>{value >= 90 ? "HIGH" : "MED"}</div>
      </div>
    </div>
  );
}

function TypingLine({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++; setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 18);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return <div className={className}>{shown}<span className="opacity-70">▍</span></div>;
}

/* ============================ SECTION 9 — Self-Healing ============================ */

function Section9SelfHealing({ phase }: { phase: string }) {
  const metrics = [
    { l: "CPU Usage", b: "94%", a: "41%", icon: Cpu, good: true },
    { l: "P99 Latency", b: "2,100ms", a: "120ms", icon: Activity, good: true },
    { l: "Error Rate", b: "37%", a: "0.2%", icon: AlertTriangle, good: true },
    { l: "Health Score", b: "61", a: "97", icon: Heart, good: true },
    { l: "Pod Status", b: "UNHEALTHY", a: "HEALTHY", icon: Boxes, good: true },
    { l: "Routing", b: "PRIMARY", a: "FAILOVER", icon: Globe, good: true },
  ];

  const animations = [
    { t: "Pods restarting", icon: Boxes },
    { t: "Replicas scaling 2 → 5", icon: Rocket },
    { t: "Traffic rerouting us-east → us-west", icon: Globe },
    { t: "Redis shard failover", icon: Zap },
    { t: "Deployment rollback v2.18 → v2.17.3", icon: GitBranch },
    { t: "Workload rebalancing", icon: Workflow },
  ];

  return (
    <div className="space-y-6">
      {/* Live operations */}
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex items-center justify-between mb-5">
          <div>
            <div className="text-sm font-semibold">LIVE INFRASTRUCTURE OPERATIONS</div>
            <div className="text-[10px] font-mono text-muted-foreground">Sentinel.AI is reshaping the running system in real time</div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-mono border border-primary/40 pulse-ring">
            HEALING IN PROGRESS
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 relative">
          {animations.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.t}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 relative overflow-hidden border border-primary/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <div className="relative flex items-center gap-3">
                  <div className="size-10 rounded-lg glass-strong glow-cyan flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.t}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-success font-mono mt-0.5">
                      <span className="size-1.5 rounded-full bg-success pulse-ring" />
                      executing
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Before / After */}
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/80 mb-3">
          Before vs After · Live Metric Recovery
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-xl p-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="size-4 text-primary" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-error text-sm line-through opacity-70">{m.b}</div>
                  <div className="text-muted-foreground">→</div>
                  <div className="font-mono text-success text-lg font-bold text-glow-green">{m.a}</div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-error via-warn to-success"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.06 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================ SECTION 10 — Change Tracker ============================ */

function Section10ChangeTracker() {
  const changes = [
    { t: "Increased replicas payment-api 2 → 5", dur: "4.2s", impact: "-92% error rate", time: "12:48:21" },
    { t: "Restarted 4 payment-service pods", dur: "8.1s", impact: "CPU 94% → 41%", time: "12:48:25" },
    { t: "Applied deployment rollback v2.18 → v2.17.3", dur: "12.4s", impact: "login success 61% → 99.8%", time: "12:48:33" },
    { t: "Rerouted traffic us-east-1 → us-west-2", dur: "2.7s", impact: "0 dropped requests", time: "12:48:38" },
    { t: "Cleared 1,284 corrupted Redis entries", dur: "3.9s", impact: "hit-rate 11% → 97%", time: "12:48:42" },
    { t: "Rebalanced workloads across 3 zones", dur: "6.2s", impact: "p99 latency -94%", time: "12:48:48" },
    { t: "Restored infrastructure health score", dur: "1.8s", impact: "Health 61 → 97", time: "12:48:51" },
  ];
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold tracking-wide">CHANGES EXECUTED BY AI</div>
          <div className="text-[10px] font-mono text-muted-foreground">immutable audit log · signed by sentinel-kernel</div>
        </div>
        <span className="text-[10px] font-mono text-success">7 / 7 SUCCESSFUL</span>
      </div>
      <div className="space-y-2">
        {changes.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 items-center p-2.5 rounded-lg glass border border-border hover:border-success/40 transition-colors"
          >
            <CheckCircle2 className="size-4 text-success" />
            <span className="text-[12px]">{c.t}</span>
            <span className="text-[10px] font-mono text-muted-foreground hidden md:inline">{c.dur}</span>
            <span className="text-[10px] font-mono text-success">{c.impact}</span>
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{c.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================ SECTION 11 — Recovery ============================ */

function Section11Recovery({ phase }: { phase: string }) {
  const series = useMemo(
    () => Array.from({ length: 50 }, (_, i) => ({
      t: i,
      v: i < 20 ? 35 + Math.random() * 10 : i < 30 ? 35 + (i - 20) * 6 + Math.random() * 4 : 95 + Math.random() * 3,
    })),
    [],
  );
  return (
    <div className="relative">
      <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-32 -left-32 size-[400px] rounded-full bg-success/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-[400px] rounded-full bg-primary/15 blur-3xl" />

        <div className="relative text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
            className="inline-flex size-24 rounded-full glass-strong glow-green items-center justify-center mb-6"
          >
            <ShieldCheck className="size-12 text-success" />
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/15 border border-success/40 mb-4">
            <span className="size-2 rounded-full bg-success pulse-ring" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-success">System Stabilized</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-success via-primary to-cyan-glow bg-clip-text text-transparent">
            Recovery Completed Autonomously
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            All telemetry has normalized. Anomaly indicators cleared. Infrastructure health restored.
            No engineers were paged.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
          {[
            { l: "Recovery Time", v: "43s", c: "success" },
            { l: "Downtime Prevented", v: "98%", c: "success" },
            { l: "Health Score Restored", v: "97", c: "primary" },
            { l: "Customer Impact", v: "0", c: "accent" },
          ].map((m, i) => (
            <motion.div
              key={m.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5 text-center"
            >
              <div className={`text-3xl font-bold tabular-nums text-${m.c} text-glow-${m.c === "success" ? "green" : "cyan"}`}>
                {m.v}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{m.l}</div>
            </motion.div>
          ))}
        </div>

        {/* recovery curve */}
        <div className="relative mt-10 max-w-4xl mx-auto">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2 text-center">
            Infrastructure Health Score · Recovery Curve
          </div>
          <div className="h-40 glass rounded-xl p-3">
            <ResponsiveContainer>
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="recG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.2 155)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.78 0.18 200 / 8%)" />
                <XAxis dataKey="t" hide />
                <YAxis hide domain={[0, 110]} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.72 0.2 155)" strokeWidth={2.5} fill="url(#recG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyFooter() {
  return (
    <div className="text-center pt-8 border-t border-border/40">
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        Sentinel.AI · Autonomous Operations Platform · v4.2.0
      </div>
      <div className="text-[10px] font-mono text-muted-foreground/60 mt-1">
        zero-trust · SOC2 · ISO27001 · PCI-DSS · GDPR
      </div>
    </div>
  );
}
