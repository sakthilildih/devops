import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScenariosLab } from "@/components/ScenariosLab";

export const Route = createFileRoute("/scenarios")({
  head: () => ({
    meta: [
      { title: "Scenarios Lab — SENTINEL.AI" },
      { name: "description", content: "Trigger production-grade failure scenarios and watch autonomous self-healing in real time." },
      { property: "og:title", content: "Self-Healing Scenarios Lab" },
      { property: "og:description", content: "Interactive incident simulation center." },
    ],
  }),
  component: ScenariosPage,
});

function ScenariosPage() {
  return (
    <AppShell>
      <ScenariosLab />
    </AppShell>
  );
}
