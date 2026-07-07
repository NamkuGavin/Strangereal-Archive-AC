import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { nations, conflicts, squadrons, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, RadarBackground } from "@/components/hud";
import { SearchBar, FilterGroup } from "@/components/filter-bar";

export const Route = createFileRoute("/nations/")({
  head: () => ({
    meta: [
      { title: "Nation Archive — Strangereal Archive" },
      {
        name: "description",
        content: "Continental powers, kingdoms and small allied states of Strangereal.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const regions = Array.from(new Set(nations.map((n) => n.region)));
  const cfl = conflicts.map((c) => c.name);
  const [q, setQ] = useState("");
  const [r, setR] = useState("all");
  const [c, setC] = useState("all");
  const list = useMemo(
    () =>
      nations.filter((n) => {
        return (
          (!q || n.name.toLowerCase().includes(q.toLowerCase())) &&
          (r === "all" || n.region === r) &&
          (c === "all" || n.conflicts.some((cid) => byId(conflicts, cid)?.name === c))
        );
      }),
    [q, r, c],
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog · 03"
        title="Nation Archive"
        sub="Tactical map of Strangereal-aligned states."
        right={
          <HudLabel>
            {list.length} / {nations.length}
          </HudLabel>
        }
      />
      <div className="relative mb-8 overflow-hidden rounded-sm border border-[color:var(--hud)]/25 bg-background/40 p-6">
        <RadarBackground className="opacity-30" />
        <div className="relative grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:grid-cols-4">
          {regions.map((rg) => (
            <div key={rg} className="rounded-sm border border-[color:var(--hud)]/25 p-2">
              <div className="text-[color:var(--hud)]">{rg}</div>
              <div>{nations.filter((n) => n.region === rg).length} nations</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 grid gap-3">
        <SearchBar value={q} onChange={setQ} />
        <FilterGroup label="Region" options={regions} value={r} onChange={setR} />
        <FilterGroup label="Conflict" options={cfl} value={c} onChange={setC} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((n) => {
          const cnf = n.conflicts
            .map((id) => byId(conflicts, id)?.name)
            .filter(Boolean)
            .slice(0, 3);
          const sq = n.squadrons
            .map((id) => byId(squadrons, id)?.name)
            .filter(Boolean)
            .slice(0, 3);
          return (
            <Link
              key={n.id}
              to="/nations/$id"
              params={{ id: n.id }}
              className="group hud-panel hud-corners scanline block rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <HudLabel>{n.region}</HudLabel>
                  <h3 className="mt-1 text-lg font-bold">{n.name}</h3>
                </div>
                <StatusBadge variant={n.status === "Superpower" ? "warn" : "default"}>
                  {n.status}
                </StatusBadge>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{n.summary}</p>
              <div className="mt-3 grid gap-1 text-[11px] text-muted-foreground">
                <div>
                  <span className="text-[color:var(--hud)]/80">CFL</span> {cnf.join(" · ") || "—"}
                </div>
                <div>
                  <span className="text-[color:var(--hud)]/80">SQD</span> {sq.join(" · ") || "—"}
                </div>
                <div>
                  <span className="text-[color:var(--hud)]/80">MIL</span> {n.relevance}
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
