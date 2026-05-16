import { motion } from "framer-motion";
import { Radio, Filter, Layers, GitMerge, Brain, Search, Cpu, UserCheck, Wand2, ShieldCheck } from "lucide-react";
import { PIPELINE_STAGES } from "@/lib/mock-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Radio, Filter, Layers, GitMerge, Brain, Search, Cpu, UserCheck, Wand2, ShieldCheck,
};

interface Props {
  activeStage?: number;
  failedStage?: number | null;
  healedStages?: number[];
}

export function PipelineFlow({ activeStage = -1, failedStage = null, healedStages = [] }: Props) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold tracking-wide">AUTONOMOUS INCIDENT PIPELINE</h3>
          <p className="text-[11px] text-muted-foreground">Telemetry → Detection → Healing · 10-stage flow</p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary glow-cyan" /> ACTIVE</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-error glow-red" /> AFFECTED</span>
          <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-success glow-green" /> HEALED</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {PIPELINE_STAGES.map((stage, i) => {
          const Icon = ICONS[stage.icon] ?? Radio;
          const isActive = activeStage === i;
          const isFailed = failedStage === i;
          const isHealed = healedStages.includes(i);
          const isAi = stage.id === "detect";

          return (
            <div key={stage.id} className="relative">
              <motion.div
                animate={{
                  scale: isActive || isFailed ? [1, 1.04, 1] : 1,
                }}
                transition={{ duration: 1.2, repeat: isActive || isFailed ? Infinity : 0 }}
                className={`relative glass rounded-lg p-3 h-[110px] flex flex-col items-center justify-center gap-2 transition-all overflow-hidden ${
                  isFailed
                    ? "border-error/60 glow-red"
                    : isHealed
                      ? "border-success/60 glow-green"
                      : isActive
                        ? "border-primary/60 glow-cyan"
                        : "border-border"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-x-0 h-px bg-primary/60"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                {isAi && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="size-16 rounded-full border border-accent/30 spin-slow" />
                  </div>
                )}
                <Icon
                  className={`size-6 relative z-10 ${
                    isFailed ? "text-error" : isHealed ? "text-success" : isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <div className="text-[10.5px] text-center font-medium leading-tight relative z-10">
                  {stage.label}
                </div>
                <div className="text-[9px] font-mono text-muted-foreground tabular-nums">
                  {(1240 + i * 87 + Math.floor(Math.random() * 30)).toLocaleString()} ev
                </div>
              </motion.div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-2 h-px bg-primary/40" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
