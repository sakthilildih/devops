import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CinematicJourney } from "@/components/CinematicJourney";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SENTINEL.AI — Autonomous Incident Intelligence" },
      { name: "description", content: "Cinematic AI observability and autonomous self-healing operations center — watch telemetry flow from collection to recovery in real time." },
      { property: "og:title", content: "SENTINEL.AI — Command Center" },
      { property: "og:description", content: "Live AI-powered cloud operations command center." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell>
      <CinematicJourney />
    </AppShell>
  );
}
