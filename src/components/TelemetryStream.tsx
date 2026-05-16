import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateLog, severityColor, severityBg, type LogEntry, type Severity } from "@/lib/mock-data";
import { Terminal, Radio } from "lucide-react";

interface Props {
  intensity?: number; // logs per second
  injectSeverity?: Severity | null;
}

export function TelemetryStream({ intensity = 3, injectSeverity = null }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    Array.from({ length: 8 }, () => generateLog()),
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = 1000 / intensity;
    const t = setInterval(() => {
      setLogs((prev) => {
        const forced = injectSeverity && Math.random() < 0.5 ? injectSeverity : undefined;
        const next = [...prev, generateLog(forced)];
        return next.slice(-60);
      });
    }, interval);
    return () => clearInterval(t);
  }, [intensity, injectSeverity]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col h-[420px]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-primary/15 bg-background/40">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-primary" />
          <span className="text-sm font-semibold tracking-wide">LIVE TELEMETRY STREAM</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <Radio className="size-3 text-success animate-pulse" />
          {logs.length} events · {intensity}/s
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 font-mono text-[11px] leading-relaxed scan-line">
        <AnimatePresence initial={false}>
          {logs.map((l) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-2 px-2 py-1 rounded border-l-2 mb-0.5 ${severityBg[l.severity]}`}
            >
              <span className="text-muted-foreground/70 tabular-nums">{l.ts}</span>
              <span className={`font-semibold ${severityColor[l.severity]} w-[68px] shrink-0`}>
                [{l.severity}]
              </span>
              <span className="text-primary/80 w-[120px] truncate shrink-0">{l.source}</span>
              <span className="text-foreground/85 truncate">{l.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
