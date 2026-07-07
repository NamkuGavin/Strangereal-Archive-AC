import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { conflicts, nations, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge } from "@/components/hud";
import { SearchBar, FilterGroup } from "@/components/filter-bar";

export const Route = createFileRoute("/conflicts/")({
  head: () => ({
    meta: [
      { title: "Conflict Timeline — Strangereal Archive" },
      {
        name: "description",
        content: "Historical timeline of continental wars and superweapon incidents.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const [era, setEra] = useState("all");
  const [nat, setNat] = useState("all");
  const eras = Array.from(new Set(conflicts.map((c) => c.era)));
  const natOpts = nations.map((n) => n.name);
  const list = useMemo(
    () =>
      conflicts
        .filter(
          (c) =>
            (!q || c.name.toLowerCase().includes(q.toLowerCase())) &&
            (era === "all" || c.era === era) &&
            (nat === "all" || c.nations.some((nid) => byId(nations, nid)?.name === nat)),
        )
        .sort((a, b) => a.year.localeCompare(b.year)),
    [q, era, nat],
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog · 04"
        title="Conflict Timeline"
        sub="Continental wars, shadow wars, and superweapon incidents on record."
        right={
          <HudLabel>
            {list.length} / {conflicts.length}
          </HudLabel>
        }
      />
      <div className="mb-6 grid gap-3">
        <SearchBar value={q} onChange={setQ} />
        <FilterGroup label="Era" options={eras} value={era} onChange={setEra} />
        <FilterGroup label="Nation" options={natOpts} value={nat} onChange={setNat} />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-[color:var(--hud)]/25 md:left-1/2" />
        <div className="grid gap-4">
          {list.map((c, i) => {
            const ns = c.nations.map((id) => byId(nations, id)?.name).filter(Boolean);
            const side = i % 2 === 0;
            return (
              <div
                key={c.id}
                className={`relative grid md:grid-cols-2 md:gap-8 ${side ? "" : "md:[&>*:first-child]:col-start-2"}`}
              >
                <Link
                  to="/conflicts/$id"
                  params={{ id: c.id }}
                  className="group hud-panel hud-corners scanline relative block rounded-sm p-5 ml-10 md:ml-0 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <HudLabel>
                        {c.year} · {c.era}
                      </HudLabel>
                      <h3 className="mt-1 text-lg font-bold">{c.name}</h3>
                    </div>
                    <StatusBadge variant="warn">{c.nations.length} nations</StatusBadge>
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{c.summary}</p>
                  <div className="mt-3 grid gap-1 text-[11px] text-muted-foreground">
                    <div>
                      <span className="text-[color:var(--hud)]/80">NAT</span> {ns.join(" · ")}
                    </div>
                    <div>
                      <span className="text-[color:var(--hud)]/80">RES</span> {c.result}
                    </div>
                  </div>
                </Link>
                <span className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-[color:var(--hud)] shadow-[0_0_10px_var(--hud)] md:left-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
