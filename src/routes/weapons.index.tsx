import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { weapons, aircraft, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, StatBar } from "@/components/hud";
import { SearchBar, FilterGroup } from "@/components/filter-bar";
import { Crosshair } from "lucide-react";

export const Route = createFileRoute("/weapons/")({
  head: () => ({
    meta: [
      { title: "Weapon System — Strangereal Archive" },
      {
        name: "description",
        content: "Air-to-air, air-to-ground, special and experimental munitions on file.",
      },
    ],
  }),
  component: Page,
});

const TYPES = ["Standard", "Air-to-Air", "Air-to-Ground", "Special", "Experimental"];

function Page() {
  const acOpts = aircraft.map((a) => a.name);
  const bestUses = Array.from(new Set(weapons.map((w) => w.bestUse)));
  const [q, setQ] = useState("");
  const [t, setT] = useState("all");
  const [b, setB] = useState("all");
  const [c, setC] = useState("all");
  const list = useMemo(
    () =>
      weapons.filter(
        (w) =>
          (!q || w.name.toLowerCase().includes(q.toLowerCase())) &&
          (t === "all" || w.type === t) &&
          (b === "all" || w.bestUse === b) &&
          (c === "all" || w.compatible.some((aid) => byId(aircraft, aid)?.name === c)),
      ),
    [q, t, b, c],
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog · 06"
        title="Weapon System"
        sub="Aircraft munitions and special weapon systems."
        right={
          <HudLabel>
            {list.length} / {weapons.length}
          </HudLabel>
        }
      />
      <div className="mb-6 grid gap-3">
        <SearchBar value={q} onChange={setQ} />
        <FilterGroup label="Type" options={TYPES} value={t} onChange={setT} />
        <FilterGroup label="Best Use" options={bestUses} value={b} onChange={setB} />
        <FilterGroup label="Airframe" options={acOpts} value={c} onChange={setC} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => {
          const ac = w.compatible
            .map((id) => byId(aircraft, id)?.name)
            .filter(Boolean)
            .slice(0, 3);
          return (
            <Link
              key={w.id}
              to="/weapons/$id"
              params={{ id: w.id }}
              className="group hud-panel hud-corners scanline relative block rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <HudLabel>{w.type}</HudLabel>
                  <h3 className="mt-1 text-lg font-bold">{w.name}</h3>
                </div>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-[color:var(--hud)]/40 text-[color:var(--hud)]">
                  <Crosshair className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{w.function}</p>
              <div className="mt-4 grid gap-1.5">
                <StatBar label="Strength" value={w.strength} />
                <StatBar label="Range" value={w.range} />
                <StatBar label="Difficulty" value={w.difficulty} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge variant={w.type === "Experimental" ? "warn" : "default"}>
                  {w.type}
                </StatusBadge>
                <StatusBadge variant="muted">{w.bestUse}</StatusBadge>
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground">
                <span className="text-[color:var(--hud)]/80">A/C</span> {ac.join(" · ")}
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
