// Mock data generators for the AI Observability platform

export type Severity = "INFO" | "WARN" | "ERROR" | "CRITICAL" | "SECURITY" | "TRACE";

export interface LogEntry {
  id: string;
  ts: string;
  severity: Severity;
  source: string;
  message: string;
}

const SOURCES = [
  "payment-api",
  "checkout-svc",
  "auth-gateway",
  "redis-cluster",
  "postgres-primary",
  "kafka-broker-2",
  "k8s-worker-04",
  "cdn-edge-us1",
  "billing-worker",
  "ml-inference",
  "search-index",
  "notification-svc",
];

const LOG_TEMPLATES: { sev: Severity; msg: string }[] = [
  { sev: "INFO", msg: "request handled in {ms}ms status=200" },
  { sev: "INFO", msg: "scaling decision evaluated replicas={n}" },
  { sev: "INFO", msg: "circuit breaker closed for upstream" },
  { sev: "INFO", msg: "cache hit ratio {p}% over last 60s" },
  { sev: "WARN", msg: "pod restart threshold exceeded count={n}" },
  { sev: "WARN", msg: "p99 latency drift detected {ms}ms" },
  { sev: "WARN", msg: "memory utilization above watermark {p}%" },
  { sev: "WARN", msg: "thread pool saturation approaching limit" },
  { sev: "ERROR", msg: "redis connection timeout after 3000ms" },
  { sev: "ERROR", msg: "downstream 5xx burst on /v1/charge" },
  { sev: "ERROR", msg: "database connection pool exhausted" },
  { sev: "ERROR", msg: "deployment rollout stalled at 47%" },
  { sev: "CRITICAL", msg: "service unreachable from 3 regions" },
  { sev: "CRITICAL", msg: "data plane partition detected" },
  { sev: "SECURITY", msg: "suspicious login spike from 14.91.x.x" },
  { sev: "SECURITY", msg: "WAF blocked 4231 malformed requests" },
  { sev: "TRACE", msg: "distributed trace latency anomaly span={n}ms" },
  { sev: "TRACE", msg: "cold start observed in lambda-edge" },
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fill(template: string) {
  return template
    .replace("{ms}", String(20 + Math.floor(Math.random() * 1800)))
    .replace("{n}", String(1 + Math.floor(Math.random() * 12)))
    .replace("{p}", String(40 + Math.floor(Math.random() * 60)));
}

let counter = 0;
export function generateLog(forced?: Severity): LogEntry {
  const pool = forced ? LOG_TEMPLATES.filter((t) => t.sev === forced) : LOG_TEMPLATES;
  const tpl = rand(pool.length ? pool : LOG_TEMPLATES);
  const d = new Date();
  return {
    id: `${Date.now()}-${counter++}`,
    ts:
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0") +
      ":" +
      String(d.getSeconds()).padStart(2, "0") +
      "." +
      String(d.getMilliseconds()).padStart(3, "0"),
    severity: tpl.sev,
    source: rand(SOURCES),
    message: fill(tpl.msg),
  };
}

export const severityColor: Record<Severity, string> = {
  INFO: "text-info",
  WARN: "text-warn",
  ERROR: "text-error",
  CRITICAL: "text-critical",
  SECURITY: "text-accent",
  TRACE: "text-muted-foreground",
};

export const severityBg: Record<Severity, string> = {
  INFO: "bg-info/15 border-info/40",
  WARN: "bg-warn/15 border-warn/40",
  ERROR: "bg-error/15 border-error/40",
  CRITICAL: "bg-critical/20 border-critical/50",
  SECURITY: "bg-accent/15 border-accent/40",
  TRACE: "bg-muted/30 border-muted",
};

export interface Scenario {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  systems: string[];
  blastRadius: string;
  risk: number;
  icon: string;
  description: string;
  rootCause: string;
  actions: string[];
  beforeAfter: { metric: string; before: string; after: string }[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "k8s-pod-failure",
    title: "Kubernetes Pod Failure",
    severity: "High",
    systems: ["checkout-svc", "payment-api"],
    blastRadius: "2 services · 14% traffic",
    risk: 78,
    icon: "Boxes",
    description: "CrashLoopBackOff observed across checkout pods in us-east-1.",
    rootCause: "OOMKilled — container memory limit exceeded during peak load",
    actions: [
      "Increased memory limit 512Mi → 1Gi",
      "Rolled pods with surge=2 maxUnavailable=0",
      "Verified readiness probes",
      "Drained node k8s-worker-04",
    ],
    beforeAfter: [
      { metric: "Healthy Pods", before: "3 / 8", after: "8 / 8" },
      { metric: "Error Rate", before: "37%", after: "0.2%" },
      { metric: "P99 Latency", before: "2.4s", after: "180ms" },
    ],
  },
  {
    id: "cpu-spike",
    title: "CPU Spike",
    severity: "Medium",
    systems: ["ml-inference"],
    blastRadius: "1 service · degraded",
    risk: 54,
    icon: "Cpu",
    description: "Sustained CPU above 92% on inference workers.",
    rootCause: "Inefficient batch size causing thread contention",
    actions: [
      "Auto-scaled replicas 2 → 6",
      "Tuned batch size 128 → 32",
      "Pinned workers to dedicated cores",
    ],
    beforeAfter: [
      { metric: "CPU", before: "94%", after: "43%" },
      { metric: "Queue Depth", before: "1,842", after: "12" },
      { metric: "Throughput", before: "210 rps", after: "980 rps" },
    ],
  },
  {
    id: "memory-leak",
    title: "Memory Leak",
    severity: "High",
    systems: ["billing-worker"],
    blastRadius: "1 service · 8% jobs delayed",
    risk: 71,
    icon: "MemoryStick",
    description: "Heap growth of 18MB/min over 4h on billing workers.",
    rootCause: "Unbounded cache in invoice serializer",
    actions: [
      "Rolling restart of workers",
      "Hot-patched cache with LRU(10k)",
      "Enabled heap dump on next anomaly",
    ],
    beforeAfter: [
      { metric: "Heap Used", before: "7.8 GB", after: "1.2 GB" },
      { metric: "GC Pause", before: "920ms", after: "40ms" },
      { metric: "Pending Jobs", before: "4,210", after: "8" },
    ],
  },
  {
    id: "failed-deploy",
    title: "Failed Deployment",
    severity: "Critical",
    systems: ["auth-gateway"],
    blastRadius: "global · login degraded",
    risk: 91,
    icon: "GitBranch",
    description: "Canary deployment v2.18.0 failing health checks.",
    rootCause: "Breaking change in JWT claim parser",
    actions: [
      "Halted canary at 5% traffic",
      "Rolled back to v2.17.3",
      "Reset traffic split 100% stable",
      "Filed regression ticket AUTH-4421",
    ],
    beforeAfter: [
      { metric: "Login Success", before: "61%", after: "99.8%" },
      { metric: "Canary Health", before: "Failing", after: "Reverted" },
      { metric: "User Impact", before: "12,400", after: "0" },
    ],
  },
  {
    id: "db-latency",
    title: "Database Latency Spike",
    severity: "Critical",
    systems: ["postgres-primary", "checkout-svc"],
    blastRadius: "checkout + billing",
    risk: 88,
    icon: "Database",
    description: "Query p99 climbed from 40ms to 1.8s across primary.",
    rootCause: "Long-running analytical query blocking write locks",
    actions: [
      "Terminated blocking query pid=48211",
      "Promoted read replica for reporting",
      "Added statement_timeout=5s policy",
    ],
    beforeAfter: [
      { metric: "Query P99", before: "1.8s", after: "38ms" },
      { metric: "Active Locks", before: "147", after: "6" },
      { metric: "Checkout Errors", before: "29%", after: "0.1%" },
    ],
  },
  {
    id: "ddos",
    title: "DDoS Attack",
    severity: "Critical",
    systems: ["cdn-edge-us1", "auth-gateway"],
    blastRadius: "global edge",
    risk: 94,
    icon: "ShieldAlert",
    description: "Volumetric L7 attack — 1.2M rps from 38k IPs.",
    rootCause: "Coordinated botnet targeting /login",
    actions: [
      "Engaged WAF rate-limit profile STRICT",
      "Enabled Anycast scrubbing",
      "Geo-blocked 4 ASNs",
      "Auto-scaled edge nodes ×3",
    ],
    beforeAfter: [
      { metric: "Malicious Req/s", before: "1.2M", after: "2.1k" },
      { metric: "Edge CPU", before: "97%", after: "34%" },
      { metric: "Origin Reached", before: "12%", after: "0.0%" },
    ],
  },
  {
    id: "login-attack",
    title: "Suspicious Login Attack",
    severity: "High",
    systems: ["auth-gateway"],
    blastRadius: "auth surface",
    risk: 76,
    icon: "Lock",
    description: "Credential stuffing — 240k attempts against 18k accounts.",
    rootCause: "Leaked credential list from external breach",
    actions: [
      "Enabled mandatory MFA challenge",
      "Locked 412 high-risk accounts",
      "Pushed bot-score header to clients",
    ],
    beforeAfter: [
      { metric: "Failed Logins", before: "240k", after: "190" },
      { metric: "Risk Score", before: "9.4", after: "1.1" },
      { metric: "Blocked IPs", before: "0", after: "11,892" },
    ],
  },
  {
    id: "cache-fail",
    title: "Cache Failure",
    severity: "High",
    systems: ["redis-cluster"],
    blastRadius: "search + sessions",
    risk: 73,
    icon: "Zap",
    description: "Redis shard 3 lost quorum — cache miss storm.",
    rootCause: "Network partition between shards 3 and 5",
    actions: [
      "Failed over shard 3 to replica",
      "Repaired cluster topology",
      "Warmed cache from cold tier",
    ],
    beforeAfter: [
      { metric: "Cache Hit Rate", before: "11%", after: "97%" },
      { metric: "DB Read QPS", before: "84k", after: "9k" },
      { metric: "Session Errors", before: "18%", after: "0.0%" },
    ],
  },
  {
    id: "region-outage",
    title: "Region Outage",
    severity: "Critical",
    systems: ["us-east-1"],
    blastRadius: "30% global traffic",
    risk: 96,
    icon: "Globe",
    description: "Cloud provider AZ failure across us-east-1a/1b.",
    rootCause: "Upstream provider control-plane degradation",
    actions: [
      "Failed over to us-west-2",
      "Promoted standby replicas",
      "Rerouted DNS weight 100% → west",
      "Notified status page subscribers",
    ],
    beforeAfter: [
      { metric: "Region Health", before: "Down", after: "Drained" },
      { metric: "Global Errors", before: "32%", after: "0.4%" },
      { metric: "Failover Time", before: "—", after: "47s" },
    ],
  },
  {
    id: "service-crash",
    title: "Service Crash",
    severity: "High",
    systems: ["notification-svc"],
    blastRadius: "email + push delayed",
    risk: 68,
    icon: "AlertOctagon",
    description: "Panic in notification dispatcher — segfault loop.",
    rootCause: "Nil deref in template renderer for new locale",
    actions: [
      "Reverted template pack to v9",
      "Restarted 4 dispatcher instances",
      "Quarantined locale=zh-Hant",
    ],
    beforeAfter: [
      { metric: "Crash Rate", before: "12/min", after: "0" },
      { metric: "Delivered", before: "41%", after: "99.9%" },
      { metric: "Backlog", before: "84k", after: "0" },
    ],
  },
  {
    id: "api-latency",
    title: "API Latency Explosion",
    severity: "High",
    systems: ["api-gateway"],
    blastRadius: "mobile clients",
    risk: 81,
    icon: "Activity",
    description: "P95 latency 110ms → 3.4s globally.",
    rootCause: "Misconfigured retry policy causing request amplification",
    actions: [
      "Patched retry budget 5 → 1",
      "Enabled hedged requests with deadline",
      "Cleared circuit-breaker state",
    ],
    beforeAfter: [
      { metric: "P95", before: "3.4s", after: "120ms" },
      { metric: "Retry Storm", before: "18×", after: "1.1×" },
      { metric: "Mobile Errors", before: "22%", after: "0.3%" },
    ],
  },
  {
    id: "disk-sat",
    title: "Disk Saturation",
    severity: "Medium",
    systems: ["kafka-broker-2"],
    blastRadius: "event stream lag",
    risk: 59,
    icon: "HardDrive",
    description: "Broker disk 96% — IOPS throttled.",
    rootCause: "Log retention policy not applied after schema upgrade",
    actions: [
      "Expired retention 30d → 7d",
      "Triggered segment compaction",
      "Added 500GB volume on broker-2",
    ],
    beforeAfter: [
      { metric: "Disk Used", before: "96%", after: "41%" },
      { metric: "Consumer Lag", before: "284k", after: "120" },
      { metric: "IOPS", before: "throttled", after: "nominal" },
    ],
  },
];

export const PIPELINE_STAGES = [
  { id: "collect", label: "Telemetry Collection", icon: "Radio" },
  { id: "normalize", label: "Normalization", icon: "Filter" },
  { id: "enrich", label: "Context Enrichment", icon: "Layers" },
  { id: "correlate", label: "Correlation Engine", icon: "GitMerge" },
  { id: "detect", label: "AI Anomaly Detection", icon: "Brain" },
  { id: "rca", label: "Root Cause Analysis", icon: "Search" },
  { id: "decide", label: "Decision Engine", icon: "Cpu" },
  { id: "human", label: "Human-in-the-Loop", icon: "UserCheck" },
  { id: "heal", label: "Self-Healing Engine", icon: "Wand2" },
  { id: "verify", label: "Recovery Verification", icon: "ShieldCheck" },
];
