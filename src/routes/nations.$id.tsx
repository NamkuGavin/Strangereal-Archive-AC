import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  nations,
  conflicts,
  squadrons,
  pilots,
  aircraft,
  byId,
  manyById,
} from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, StatusBadge, EmblemPlaceholder } from "@/components/hud";
import { RelatedList, BackLink } from "@/components/related";

export const Route = createFileRoute("/nations/$id")({
  head: ({ params }) => {
    const n = byId(nations, params.id);
    return {
      meta: [
        { title: `${n?.name ?? "Nation"} — Strangereal Archive` },
        { name: "description", content: n?.summary.slice(0, 155) ?? "Nation record." },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { id } = useParams({ from: "/nations/$id" });
  const n = byId(nations, id);
  if (!n)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );
  const cfl = manyById(conflicts, n.conflicts);
  const sq = manyById(squadrons, n.squadrons);
  const relatedPilots = pilots.filter((p) => p.affiliation === n.id);
  const relatedAircraft = Array.from(new Set(sq.flatMap((s) => s.aircraft)))
    .map((aid) => byId(aircraft, aid))
    .filter(Boolean) as typeof aircraft;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/nations" label="Back to Nation Archive" />
      </div>
      <DetailHeader
        eyebrow={`Nation File · ${n.region.toUpperCase()}`}
        title={n.name}
        meta={
          <>
            <StatusBadge variant={n.status === "Superpower" ? "warn" : "default"}>
              {n.status}
            </StatusBadge>
          </>
        }
        mediaImage="/images/feature/osea_flag.png"
        media={
          <img
            src="/images/feature/osea_continent.png"
            alt={`${n.name} emblem`}
            className="h-75 w-full object-cover opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"
          />
        }
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <HudPanel>
          <HudLabel>Historical Summary</HudLabel>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{n.summary}</p>
          <div className="mt-4">
            <HudLabel>Military Relevance</HudLabel>
            <p className="mt-1 text-sm">{n.relevance}</p>
          </div>
          <div className="mt-6 border-t border-[color:var(--hud)]/20 pt-4">
            <HudLabel>Conflict Participation Timeline</HudLabel>
            <ol className="mt-3 space-y-2">
              {cfl
                .sort((a, b) => a.year.localeCompare(b.year))
                .map((c) => (
                  <li key={c.id} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)]">
                      {c.year}
                    </span>
                    <span className="text-sm">{c.name}</span>
                  </li>
                ))}
            </ol>
          </div>
        </HudPanel>
        <div className="grid gap-6">
          <HudPanel>
            <RelatedList
              title="Related Squadrons"
              items={sq.map((s) => ({ to: `/squadrons/${s.id}`, label: s.name, meta: s.status }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Related Ace Pilots"
              items={relatedPilots.map((p) => ({
                to: `/aces/${p.id}`,
                label: p.callsign,
                meta: p.type,
              }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Related Aircraft"
              items={relatedAircraft
                .slice(0, 8)
                .map((a) => ({ to: `/aircraft/${a.id}`, label: a.name, meta: a.role }))}
            />
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
