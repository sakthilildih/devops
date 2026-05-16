import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) =>
    prefix + v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix,
  );

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);

  return <motion.span>{rounded}</motion.span>;
}
