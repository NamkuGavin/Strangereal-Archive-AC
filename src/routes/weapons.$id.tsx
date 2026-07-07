import { createFileRoute, useParams } from "@tanstack/react-router";
import { weapons, aircraft, byId, manyById } from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, StatusBadge, StatBar } from "@/components/hud";
import { RelatedList, BackLink } from "@/components/related";

export const Route = createFileRoute("/weapons/$id")({
  head: ({ params }) => {
    const w = byId(weapons, params.id);
    return {
      meta: [
        { title: `${w?.name ?? "Weapon"} — Strangereal Archive` },
        { name: "description", content: w?.notes.slice(0, 155) ?? "Weapon record." },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { id } = useParams({ from: "/weapons/$id" });
  const w = byId(weapons, id);
  if (!w)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );
  const ac = manyById(aircraft, w.compatible);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/weapons" label="Back to Weapon System" />
      </div>
      <DetailHeader
        eyebrow={`Munition File · ${w.type.toUpperCase()}`}
        title={w.name}
        meta={
          <>
            <StatusBadge variant={w.type === "Experimental" ? "warn" : "default"}>
              {w.type}
            </StatusBadge>
            <StatusBadge variant="muted">{w.bestUse}</StatusBadge>
          </>
        }
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <HudPanel>
          <HudLabel>Function</HudLabel>
          <p className="mt-2 text-sm leading-relaxed">{w.function}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <StatBar label="Strength" value={w.strength} />
            <StatBar label="Range" value={w.range} />
            <StatBar label="Difficulty" value={w.difficulty} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <HudLabel>Technical Notes</HudLabel>
              <p className="mt-1 text-sm">{w.notes}</p>
            </div>
            <div>
              <HudLabel>Limitations</HudLabel>
              <p className="mt-1 text-sm">{w.limitations}</p>
            </div>
          </div>
          <div className="mt-4">
            <HudLabel>Best Use Case</HudLabel>
            <p className="mt-1 text-sm">{w.bestUse}</p>
          </div>
        </HudPanel>
        <div className="grid gap-6">
          <HudPanel>
            <RelatedList
              title="Compatible Aircraft"
              items={ac.map((a) => ({ to: `/aircraft/${a.id}`, label: a.name, meta: a.role }))}
            />
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
