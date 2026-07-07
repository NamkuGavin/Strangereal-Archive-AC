import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { squadrons, nations, conflicts, pilots, aircraft, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, EmblemPlaceholder } from "@/components/hud";
import { SearchBar, FilterGroup } from "@/components/filter-bar";

export const Route = createFileRoute("/squadrons/")({
  head: () => ({
    meta: [
      { title: "Squadron Records — Strangereal Archive" },
      {
        name: "description",
        content: "Dossiers on legendary squadrons, mercenary teams, and enemy aces.",
      },
    ],
  }),
  component: SquadronList,
});

const AFF = nations.map((n) => n.name);
const CFL = conflicts.map((c) => c.name);
const ST = ["Legendary", "Allied Unit", "Enemy Ace", "Mercenary", "Classified"];

function SquadronList() {
  const [q, setQ] = useState("");
  const [aff, setAff] = useState("all");
  const [cfl, setCfl] = useState("all");
  const [st, setSt] = useState("all");
  const list = useMemo(
    () =>
      squadrons.filter((s) => {
        const nat = byId(nations, s.affiliation)?.name;
        const cnf = byId(conflicts, s.conflict)?.name;
        return (
          (!q || s.name.toLowerCase().includes(q.toLowerCase())) &&
          (aff === "all" || nat === aff) &&
          (cfl === "all" || cnf === cfl) &&
          (st === "all" || s.status === st)
        );
      }),
    [q, aff, cfl, st],
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog · 02"
        title="Squadron Records"
        sub="Elite flights, mercenaries, and enemy aces across every conflict on file."
        right={
          <HudLabel>
            {list.length} / {squadrons.length}
          </HudLabel>
        }
      />
      <div className="mb-6 grid gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Search squadron callsign…" />
        <FilterGroup label="Affiliation" options={AFF} value={aff} onChange={setAff} />
        <FilterGroup label="Conflict" options={CFL} value={cfl} onChange={setCfl} />
        <FilterGroup label="Status" options={ST} value={st} onChange={setSt} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => {
          const nat = byId(nations, s.affiliation);
          const cnf = byId(conflicts, s.conflict);
          const pl = s.pilots
            .map((id) => byId(pilots, id)?.callsign)
            .filter(Boolean)
            .slice(0, 3);
          const ac = s.aircraft
            .map((id) => byId(aircraft, id)?.name)
            .filter(Boolean)
            .slice(0, 2);
          return (
            <Link
              key={s.id}
              to="/squadrons/$id"
              params={{ id: s.id }}
              className="group hud-panel hud-corners scanline relative block rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <HudLabel>{nat?.name}</HudLabel>
                  <h3 className="mt-1 truncate text-lg font-bold">{s.name}</h3>
                </div>
                <div className="h-16 w-16 shrink-0 text-[color:var(--hud)]">
                  <EmblemPlaceholder seed={s.id} />
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <StatusBadge
                  variant={
                    s.status === "Enemy Ace"
                      ? "danger"
                      : s.status === "Mercenary"
                        ? "warn"
                        : "default"
                  }
                >
                  {s.status}
                </StatusBadge>
                {cnf && <StatusBadge variant="muted">{cnf.name}</StatusBadge>}
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-3 grid gap-1 text-[11px] text-muted-foreground">
                <div>
                  <span className="text-[color:var(--hud)]/80">PLT</span> {pl.join(" · ") || "—"}
                </div>
                <div>
                  <span className="text-[color:var(--hud)]/80">A/C</span> {ac.join(" · ") || "—"}
                </div>
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
