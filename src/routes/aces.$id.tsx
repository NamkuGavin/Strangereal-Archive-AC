import { createFileRoute, useParams } from "@tanstack/react-router";
import { pilots, nations, squadrons, aircraft, conflicts, byId } from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, StatusBadge } from "@/components/hud";
import { RelatedList, BackLink } from "@/components/related";

export const Route = createFileRoute("/aces/$id")({
  head: ({ params }) => {
    const p = byId(pilots, params.id);
    return {
      meta: [
        { title: `${p?.callsign ?? "Pilot"} — Strangereal Archive` },
        { name: "description", content: p?.description.slice(0, 155) ?? "Pilot dossier." },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { id } = useParams({ from: "/aces/$id" });
  const p = byId(pilots, id);
  if (!p)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );
  const nat = byId(nations, p.affiliation);
  const sq = byId(squadrons, p.squadron);
  const ac = byId(aircraft, p.aircraft);
  const cnf = byId(conflicts, p.conflict);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/aces" label="Back to Ace Pilot Dossier" />
      </div>
      <DetailHeader
        eyebrow={`Pilot Dossier · ${p.type.toUpperCase()}`}
        title={p.callsign}
        meta={
          <>
            <StatusBadge
              variant={
                p.status === "KIA"
                  ? "danger"
                  : p.status === "Classified" || p.status === "MIA"
                    ? "warn"
                    : "default"
              }
            >
              {p.status}
            </StatusBadge>
            {nat && <StatusBadge variant="muted">{nat.name}</StatusBadge>}
            {sq && <StatusBadge variant="muted">{sq.name}</StatusBadge>}
          </>
        }
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <HudPanel>
          <HudLabel>Known Role in History</HudLabel>
          <p className="mt-2 text-sm">{p.role}</p>
          <div className="mt-4 border-t border-[color:var(--hud)]/20 pt-4">
            <HudLabel>Debrief Fragment</HudLabel>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{p.description}</p>
          </div>
          {p.classified && (
            <div className="mt-6 rounded-sm border border-red-500/50 bg-red-500/5 p-3 font-mono text-[11px] uppercase tracking-widest text-red-400">
              // portions of this dossier remain classified
            </div>
          )}
        </HudPanel>
        <div className="grid gap-6">
          {ac && (
            <HudPanel>
              <RelatedList
                title="Assigned Aircraft"
                items={[{ to: `/aircraft/${ac.id}`, label: ac.name, meta: ac.role }]}
              />
            </HudPanel>
          )}
          {sq && (
            <HudPanel>
              <RelatedList
                title="Related Squadron"
                items={[{ to: `/squadrons/${sq.id}`, label: sq.name, meta: sq.status }]}
              />
            </HudPanel>
          )}
          {cnf && (
            <HudPanel>
              <RelatedList
                title="Related Conflict"
                items={[{ to: `/conflicts/${cnf.id}`, label: cnf.name, meta: cnf.year }]}
              />
            </HudPanel>
          )}
          {nat && (
            <HudPanel>
              <RelatedList
                title="Affiliation"
                items={[{ to: `/nations/${nat.id}`, label: nat.name, meta: nat.status }]}
              />
            </HudPanel>
          )}
        </div>
      </div>
    </div>
  );
}
