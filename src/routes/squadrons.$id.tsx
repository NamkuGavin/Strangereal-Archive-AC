import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  squadrons,
  nations,
  conflicts,
  pilots,
  aircraft,
  byId,
  manyById,
} from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, StatusBadge, EmblemPlaceholder } from "@/components/hud";
import { RelatedList, BackLink } from "@/components/related";

export const Route = createFileRoute("/squadrons/$id")({
  head: ({ params }) => {
    const s = byId(squadrons, params.id);
    return {
      meta: [
        { title: `${s?.name ?? "Squadron"} — Strangereal Archive` },
        { name: "description", content: s?.description.slice(0, 155) ?? "Squadron record." },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { id } = useParams({ from: "/squadrons/$id" });
  const s = byId(squadrons, id);
  if (!s)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );
  const nat = byId(nations, s.affiliation);
  const cnf = byId(conflicts, s.conflict);
  const pl = manyById(pilots, s.pilots);
  const ac = manyById(aircraft, s.aircraft);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/squadrons" label="Back to Squadron Records" />
      </div>
      <DetailHeader
        eyebrow="Squadron Dossier"
        title={s.name}
        meta={
          <>
            <StatusBadge
              variant={
                s.status === "Enemy Ace" ? "danger" : s.status === "Mercenary" ? "warn" : "default"
              }
            >
              {s.status}
            </StatusBadge>
            {nat && <StatusBadge variant="muted">{nat.name}</StatusBadge>}
            {cnf && <StatusBadge variant="muted">{cnf.name}</StatusBadge>}
          </>
        }
        media={<EmblemPlaceholder seed={s.id} className="drop-shadow-[0_0_20px_var(--hud-glow)]" />}
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <HudPanel>
          <HudLabel>Lore Summary</HudLabel>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.description}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <HudLabel>Affiliation</HudLabel>
              <div className="mt-1 text-sm">{nat?.name ?? "Independent"}</div>
            </div>
            <div>
              <HudLabel>Conflict Involvement</HudLabel>
              <div className="mt-1 text-sm">{cnf ? `${cnf.name} · ${cnf.year}` : "—"}</div>
            </div>
          </div>
        </HudPanel>
        <div className="grid gap-6">
          <HudPanel>
            <RelatedList
              title="Known Members"
              items={pl.map((p) => ({ to: `/aces/${p.id}`, label: p.callsign, meta: p.type }))}
            />
          </HudPanel>
          <HudPanel>
            <RelatedList
              title="Aircraft Used"
              items={ac.map((a) => ({ to: `/aircraft/${a.id}`, label: a.name, meta: a.role }))}
            />
          </HudPanel>
          {nat && (
            <HudPanel>
              <RelatedList
                title="Related Nation"
                items={[{ to: `/nations/${nat.id}`, label: nat.name, meta: nat.status }]}
              />
            </HudPanel>
          )}
        </div>
      </div>
    </div>
  );
}
