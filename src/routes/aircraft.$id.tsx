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

      {/* Top dossier title */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <HudLabel>Entry_ID: {a.id.toUpperCase()}</HudLabel>

          <h1 className="mt-1 text-4xl font-bold uppercase tracking-wide text-glow sm:text-5xl">
            {a.name}
          </h1>
        </div>

        <StatusBadge
          variant={
            a.status === "Classified" ? "danger" : a.status === "Experimental" ? "warn" : "default"
          }
        >
          {a.status}
        </StatusBadge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_0.95fr]">
        {/* LEFT COLUMN */}
        <div className="grid gap-6">
          {/* Aircraft visual panel */}
          <HudPanel className="relative min-h-[360px] overflow-hidden p-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-100"
              style={{
                backgroundImage: "url('/images/feature/f22_raptor.png')",
              }}
            />

            {/* dark overlay supaya tetap HUD */}
            <div className="absolute inset-0 bg-background/25" />

            {/* bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 via-background/45 to-transparent" />

            {/* dot/grid overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-12 [background-image:radial-gradient(circle_at_1px_1px,var(--hud)_1px,transparent_0)] [background-size:18px_18px]" />

            {/* panel labels */}
            <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <HudLabel>Structural Scan: 100%</HudLabel>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Stealth Coating: Nominal
                  </div>
                </div>

                <div className="text-right">
                  <HudLabel>{a.name} File</HudLabel>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Access Level Granted
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {a.appearances.map((x) => (
                  <span
                    key={x}
                    className="rounded-sm border border-[color:var(--hud)]/25 bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </HudPanel>

          {/* Lore / archive record */}
          <HudPanel className="min-h-[260px]">
            <div className="flex items-center justify-between gap-4">
              <HudLabel>Archive_Record_{a.id}</HudLabel>
              <HudLabel>Decrypt_Key: XFA-27-Omega</HudLabel>
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/85">
              <p>
                The <span className="font-semibold text-foreground">{a.name}</span> represents a
                catalogued airframe within the Strangereal combat archive.
              </p>

              <p>{a.lore}</p>
            </div>
          </HudPanel>
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid gap-6">
          {/* Combat role + loadout */}
          <HudPanel>
            <HudLabel>Combat Role</HudLabel>

            <div className="mt-3 text-2xl font-bold uppercase tracking-wide">◎ {a.role}</div>

            <div className="mt-8">
              <HudLabel>Standard Loadout</HudLabel>

              <div className="mt-3 space-y-2">
                {wpns.map((w) => (
                  <div
                    key={w.id}
                    className="flex items-center justify-between gap-4 bg-[color:var(--hud)]/5 px-3 py-2 font-mono text-xs uppercase tracking-widest"
                  >
                    <span className="text-muted-foreground">{w.type}:</span>
                    <span className="text-foreground">{w.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </HudPanel>

          {/* Performance metrics */}
          <HudPanel>
            <HudLabel>Performance Metrics</HudLabel>

            <div className="mt-4 space-y-4">
              <StatBar label="Speed" value={a.stats.speed} />
              <StatBar label="Mobility" value={a.stats.mobility} />
              <StatBar label="Stability" value={a.stats.stability} />
              <StatBar label="Defense" value={a.stats.defense} />
              <StatBar label="Air-to-Air" value={a.stats.air} />
              <StatBar label="Air-to-Ground" value={a.stats.ground} />
            </div>
          </HudPanel>

          {/* Related pilots dulu */}
          <HudPanel>
            <RelatedList
              title="Linked Ace Records"
              items={plts.map((p) => ({
                to: `/aces/${p.id}`,
                label: p.callsign,
                meta: p.type,
              }))}
            />
          </HudPanel>

          {/* Related squadrons di bawah ace */}
          <HudPanel>
            <RelatedList
              title="Related Squadrons"
              items={sqds.map((s) => ({
                to: `/squadrons/${s.id}`,
                label: s.name,
                meta: s.status,
              }))}
            />
          </HudPanel>
        </div>
      </div>
    </div>
  );
}
