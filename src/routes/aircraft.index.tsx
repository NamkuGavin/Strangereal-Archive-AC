import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plane } from "lucide-react";
import { aircraft, weapons, squadrons, pilots, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, StatBar, JetSilhouette } from "@/components/hud";
import { SearchBar, FilterGroup } from "@/components/filter-bar";

export const Route = createFileRoute("/aircraft/")({
  head: () => ({
    meta: [
      { title: "Aircraft Database — Strangereal Archive" },
      {
        name: "description",
        content:
          "Browse catalogued aircraft: fighters, multirole, attackers, experimental prototypes.",
      },
    ],
  }),
  component: AircraftList,
});

const ROLES = ["Fighter", "Multirole", "Attacker", "Experimental", "Prototype"];
const APPS = ["AC4", "AC5", "AC Zero", "AC7"];
const STATUSES = ["Playable", "Legendary", "Experimental", "Classified"];

function AircraftList() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [app, setApp] = useState("all");
  const [status, setStatus] = useState("all");

  const list = useMemo(
    () =>
      aircraft.filter(
        (a) =>
          (!q || a.name.toLowerCase().includes(q.toLowerCase())) &&
          (role === "all" || a.role === role) &&
          (app === "all" || a.appearances.includes(app)) &&
          (status === "all" || a.status === status),
      ),
    [q, role, app, status],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog · 01"
        title="Aircraft Database"
        sub="Every catalogued airframe on the Strangereal registry."
        right={
          <HudLabel>
            {list.length} / {aircraft.length}
          </HudLabel>
        }
      />
      <div className="mb-6 grid gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Search airframe designation…" />
        <FilterGroup label="Role" options={ROLES} value={role} onChange={setRole} />
        <FilterGroup label="Appearance" options={APPS} value={app} onChange={setApp} />
        <FilterGroup label="Status" options={STATUSES} value={status} onChange={setStatus} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => {
          const w = a.weapons
            .map((id) => byId(weapons, id)?.name)
            .filter(Boolean)
            .slice(0, 4);
          const sq = a.squadrons
            .map((id) => byId(squadrons, id)?.name)
            .filter(Boolean)
            .slice(0, 2);
          const pi = a.pilots
            .map((id) => byId(pilots, id)?.callsign)
            .filter(Boolean)
            .slice(0, 2);
          return (
            <Link
              key={a.id}
              to="/aircraft/$id"
              params={{ id: a.id }}
              className="group hud-panel hud-corners scanline relative block overflow-hidden rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <HudLabel>{a.role}</HudLabel>
                  <h3 className="mt-1 text-lg font-bold">{a.name}</h3>
                </div>
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
              </div>
              <div className="mt-3 h-20 text-[color:var(--hud)]/80">
                <JetSilhouette />
              </div>
              <div className="mt-2 flex flex-wrap gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {a.appearances.map((x) => (
                  <span
                    key={x}
                    className="rounded-sm border border-[color:var(--hud)]/25 px-1.5 py-0.5"
                  >
                    {x}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                <StatBar label="Air-to-Air" value={a.stats.air} />
                <StatBar label="Air-to-Ground" value={a.stats.ground} />
                <StatBar label="Mobility" value={a.stats.mobility} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                <div>
                  <span className="text-[color:var(--hud)]/80">WPN</span> {w.join(" · ") || "—"}
                </div>
                <div>
                  <span className="text-[color:var(--hud)]/80">SQD</span> {sq.join(" · ") || "—"}
                </div>
                <div className="col-span-2">
                  <span className="text-[color:var(--hud)]/80">PLT</span> {pi.join(" · ") || "—"}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 translate-y-full bg-gradient-to-t from-[color:var(--hud)]/10 to-transparent font-mono text-center text-[10px] uppercase tracking-widest text-[color:var(--hud)] opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                » DATA OPENED
              </div>
            </Link>
          );
        })}
      </div>
      {!list.length && (
        <div className="py-16 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          // no matching records
        </div>
      )}
    </div>
  );
}
