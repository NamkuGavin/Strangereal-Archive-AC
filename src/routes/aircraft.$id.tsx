import { createFileRoute, useParams } from "@tanstack/react-router";
import { aircraft, weapons, squadrons, pilots, byId, manyById } from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, JetSilhouette, StatBar, StatusBadge } from "@/components/hud";
import { RelatedList, BackLink } from "@/components/related";

export const Route = createFileRoute("/aircraft/$id")({
  head: ({ params }) => {
    const a = byId(aircraft, params.id);
    return {
      meta: [
        { title: `${a?.name ?? "Aircraft"} — Strangereal Archive` },
        { name: "description", content: a?.lore.slice(0, 155) ?? "Aircraft record." },
      ],
    };
  },
  component: AircraftDetail,
});

function AircraftDetail() {
  const { id } = useParams({ from: "/aircraft/$id" });
  const a = byId(aircraft, id);
  if (!a)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );
  const wpns = manyById(weapons, a.weapons);
  const sqds = manyById(squadrons, a.squadrons);
  const plts = manyById(pilots, a.pilots);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/aircraft" label="Back to Aircraft Database" />
      </div>
      <DetailHeader
        eyebrow={`Airframe File · ${a.role.toUpperCase()}`}
        title={a.name}
        meta={
          <>
            <StatusBadge
              variant={
                a.status === "Classified"
                  ? "danger"
                  : a.status === "Experimental"
                    ? "warn"
                    : "default"
              }
            >
              {a.status}
            </StatusBadge>
            {a.appearances.map((x) => (
              <span
                key={x}
                className="rounded-sm border border-[color:var(--hud)]/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
              >
                {x}
              </span>
            ))}
          </>
        }
        media={<JetSilhouette className="drop-shadow-[0_0_20px_var(--hud-glow)]" />}
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <HudPanel>
          <HudLabel>Combat Profile</HudLabel>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <StatBar label="Speed" value={a.stats.speed} />
            <StatBar label="Mobility" value={a.stats.mobility} />
            <StatBar label="Stability" value={a.stats.stability} />
            <StatBar label="Defense" value={a.stats.defense} />
            <StatBar label="Air-to-Air" value={a.stats.air} />
            <StatBar label="Air-to-Ground" value={a.stats.ground} />
          </div>
          <div className="mt-6 border-t border-[color:var(--hud)]/20 pt-4">
            <HudLabel>Lore Fragment</HudLabel>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{a.lore}</p>
          </div>
        </HudPanel>
        <div className="grid gap-6">
          <HudPanel>
            <RelatedList
              title="Weapon Loadout"
              items={wpns.map((w) => ({ to: `/weapons/${w.id}`, label: w.name, meta: w.type }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Related Squadrons"
              items={sqds.map((s) => ({ to: `/squadrons/${s.id}`, label: s.name, meta: s.status }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Related Pilots"
              items={plts.map((p) => ({ to: `/aces/${p.id}`, label: p.callsign, meta: p.type }))}
            />
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
