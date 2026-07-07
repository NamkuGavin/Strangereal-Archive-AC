import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { nations, conflicts, squadrons, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, RadarBackground } from "@/components/hud";
import { SearchBar } from "@/components/filter-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const ALL = "all";

function Page() {
  const regions = Array.from(new Set(nations.map((n) => n.region)));
  const cfl = conflicts.map((c) => c.name);
  const [q, setQ] = useState("");
  const [r, setR] = useState(ALL);
  const [c, setC] = useState(ALL);
  const list = useMemo(
    () =>
      nations.filter((n) => {
        return (
          (!q || n.name.toLowerCase().includes(q.toLowerCase())) &&
          (r === ALL || n.region === r) &&
          (c === ALL || n.conflicts.some((cid) => byId(conflicts, cid)?.name === c))
        );
      }),
    [q, r, c],
  );

  const hasActiveFilters = Boolean(q) || r !== ALL || c !== ALL;

  const clearFilters = () => {
    setQ("");
    setR(ALL);
    setC(ALL);
  };

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
      <div className="mb-6 grid gap-5">
        <SearchBar value={q} onChange={setQ} />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:max-w-2xl">
            <FilterSelect
              label="Region"
              value={r}
              allLabel="All regions"
              options={regions}
              onChange={setR}
            />
            <FilterSelect
              label="Conflict"
              value={c}
              allLabel="All conflicts"
              options={cfl}
              onChange={setC}
            />
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-[color:var(--hud)]/30 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-[color:var(--hud)]/70 hover:text-[color:var(--hud)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
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
              className="group hud-panel scanline relative block overflow-hidden rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              {/* Flag background muncul saat hover */}
              <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-35"
                style={{
                  backgroundImage: "url('/images/feature/osea_flag.png')",
                }}
              />

              {/* Overlay gelap supaya text tetap kebaca */}
              <div className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/55" />

              {/* Fade bawah biar info CFL/SQD/MIL tetap jelas */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 via-background/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10 mb-5">
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
                    <span className="text-[color:var(--hud)]/80">Conflict:</span>{" "}
                    {cnf.join(" · ") || "—"}
                  </div>

                  <div>
                    <span className="text-[color:var(--hud)]/80">Military:</span> {n.relevance}
                  </div>
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

function FilterSelect({
  label,
  value,
  allLabel,
  options,
  onChange,
}: {
  label: string;
  value: string;
  allLabel: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-sm border-[color:var(--hud)]/35 bg-background/60 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground shadow-none focus:ring-[color:var(--hud)]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-[color:var(--hud)]/40 bg-background/95 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur">
          <SelectItem value={ALL}>{allLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
