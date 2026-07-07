import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  conflicts,
  nations,
  squadrons,
  pilots,
  aircraft,
  weapons,
  byId,
  manyById,
} from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, StatusBadge } from "@/components/hud";
import { RelatedList, BackLink } from "@/components/related";

export const Route = createFileRoute("/conflicts/$id")({
  head: ({ params }) => {
    const c = byId(conflicts, params.id);
    return {
      meta: [
        { title: `${c?.name ?? "Conflict"} — Strangereal Archive` },
        { name: "description", content: c?.summary.slice(0, 155) ?? "Conflict record." },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { id } = useParams({ from: "/conflicts/$id" });
  const c = byId(conflicts, id);
  if (!c)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );
  const ns = manyById(nations, c.nations);
  const sq = manyById(squadrons, c.squadrons);
  const pl = manyById(pilots, c.pilots);
  const ac = manyById(aircraft, c.aircraft);
  const wp = manyById(weapons, c.weapons);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/conflicts" label="Back to Conflict Timeline" />
      </div>
      <DetailHeader
        eyebrow={`Historical File · ${c.era}`}
        title={c.name}
        meta={
          <>
            <StatusBadge>{c.year}</StatusBadge>
            <StatusBadge variant="warn">{c.nations.length} nations</StatusBadge>
          </>
        }
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <HudPanel>
          <HudLabel>Background</HudLabel>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{c.summary}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <HudLabel>Result</HudLabel>
              <p className="mt-1 text-sm">{c.result}</p>
            </div>
            <div>
              <HudLabel>Aftermath</HudLabel>
              <p className="mt-1 text-sm">{c.aftermath}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-[color:var(--hud)]/20 pt-4">
            <HudLabel>Timeline of Major Events</HudLabel>
            <ol className="mt-3 space-y-3 border-l border-[color:var(--hud)]/25 pl-4">
              {c.events.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-[color:var(--hud)] shadow-[0_0_6px_var(--hud)]" />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)]">
                    {e.year}
                  </div>
                  <div className="text-sm">{e.text}</div>
                </li>
              ))}
            </ol>
          </div>
        </HudPanel>
        <div className="grid gap-6">
          <HudPanel>
            <RelatedList
              title="Involved Nations"
              items={ns.map((n) => ({ to: `/nations/${n.id}`, label: n.name, meta: n.status }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Key Squadrons"
              items={sq.map((s) => ({ to: `/squadrons/${s.id}`, label: s.name, meta: s.status }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Key Ace Pilots"
              items={pl.map((p) => ({ to: `/aces/${p.id}`, label: p.callsign, meta: p.type }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Important Aircraft"
              items={ac.map((a) => ({ to: `/aircraft/${a.id}`, label: a.name, meta: a.role }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Important Weapons"
              items={wp.map((w) => ({ to: `/weapons/${w.id}`, label: w.name, meta: w.type }))}
            />
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
