import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { pilots, nations, squadrons, conflicts, aircraft, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, ClassifiedOverlay } from "@/components/hud";
import { SearchBar, FilterGroup } from "@/components/filter-bar";
import { UserCircle2 } from "lucide-react";

export const Route = createFileRoute("/aces/")({
  head: () => ({
    meta: [
      { title: "Ace Pilot Dossier — Strangereal Archive" },
      {
        name: "description",
        content: "Classified profiles of player aces, enemy rivals, and supporting personnel.",
      },
    ],
  }),
  component: Page,
});

const TYPES = ["Player Ace", "Enemy Ace", "Rival", "Supporting Character", "Commander"];
const STATUSES = ["Active", "MIA", "KIA", "Retired", "Classified"];

function Page() {
  const [q, setQ] = useState("");
  const [aff, setAff] = useState("all");
  const [cfl, setCfl] = useState("all");
  const [st, setSt] = useState("all");
  const [tp, setTp] = useState("all");
  const list = useMemo(
    () =>
      pilots.filter(
        (p) =>
          (!q || p.callsign.toLowerCase().includes(q.toLowerCase())) &&
          (aff === "all" || byId(nations, p.affiliation)?.name === aff) &&
          (cfl === "all" || byId(conflicts, p.conflict)?.name === cfl) &&
          (st === "all" || p.status === st) &&
          (tp === "all" || p.type === tp),
      ),
    [q, aff, cfl, st, tp],
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog · 05"
        title="Ace Pilot Dossier"
        sub="Classified pilot profiles and supporting personnel."
        right={
          <HudLabel>
            {list.length} / {pilots.length}
          </HudLabel>
        }
      />
      <div className="mb-6 grid gap-3">
        <SearchBar value={q} onChange={setQ} placeholder="Search callsign…" />
        <FilterGroup label="Type" options={TYPES} value={tp} onChange={setTp} />
        <FilterGroup
          label="Affiliation"
          options={nations.map((n) => n.name)}
          value={aff}
          onChange={setAff}
        />
        <FilterGroup
          label="Conflict"
          options={conflicts.map((c) => c.name)}
          value={cfl}
          onChange={setCfl}
        />
        <FilterGroup label="Status" options={STATUSES} value={st} onChange={setSt} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => {
          const sq = byId(squadrons, p.squadron);
          const ac = byId(aircraft, p.aircraft);
          const nat = byId(nations, p.affiliation);
          return (
            <Link
              key={p.id}
              to="/aces/$id"
              params={{ id: p.id }}
              className="group hud-panel hud-corners scanline relative block rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <HudLabel>{p.type}</HudLabel>
                  <h3 className="mt-1 truncate text-lg font-bold">{p.callsign}</h3>
                  <div className="text-[11px] text-muted-foreground">
                    {nat?.name} · {sq?.name}
                  </div>
                </div>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-[color:var(--hud)]/40 text-[color:var(--hud)]">
                  <UserCircle2 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
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
                {ac && <StatusBadge variant="muted">{ac.name}</StatusBadge>}
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
              {p.classified && <ClassifiedOverlay>Classified</ClassifiedOverlay>}
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
