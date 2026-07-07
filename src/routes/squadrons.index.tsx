import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { squadrons, nations, conflicts, pilots, aircraft, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, EmblemPlaceholder } from "@/components/hud";
import { SearchBar } from "@/components/filter-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
const ALL = "all";

function SquadronList() {
  const [q, setQ] = useState("");
  const [aff, setAff] = useState(ALL);
  const [cfl, setCfl] = useState(ALL);
  const [st, setSt] = useState(ALL);
  const list = useMemo(
    () =>
      squadrons.filter((s) => {
        const nat = byId(nations, s.affiliation)?.name;
        const cnf = byId(conflicts, s.conflict)?.name;
        return (
          (!q || s.name.toLowerCase().includes(q.toLowerCase())) &&
          (aff === ALL || nat === aff) &&
          (cfl === ALL || cnf === cfl) &&
          (st === ALL || s.status === st)
        );
      }),
    [q, aff, cfl, st],
  );

  const hasActiveFilters = Boolean(q) || aff !== ALL || cfl !== ALL || st !== ALL;

  const clearFilters = () => {
    setQ("");
    setAff(ALL);
    setCfl(ALL);
    setSt(ALL);
  };

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
      <div className="mb-6 grid gap-5">
        <SearchBar value={q} onChange={setQ} placeholder="Search squadron callsign…" />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-5 sm:grid-cols-3 lg:max-w-3xl">
            <FilterSelect
              label="Affiliation"
              value={aff}
              allLabel="All affiliations"
              options={AFF}
              onChange={setAff}
            />
            <FilterSelect
              label="Conflict"
              value={cfl}
              allLabel="All conflicts"
              options={CFL}
              onChange={setCfl}
            />
            <FilterSelect
              label="Status"
              value={st}
              allLabel="All status"
              options={ST}
              onChange={setSt}
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
                <div className="h-16 w-16 shrink-0 overflow-hidden p-1">
                  <img
                    src="/images/feature/mobius_squadron.png"
                    alt={`${s.name} emblem`}
                    className="h-full w-full object-contain opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
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
              <p className="mt-3 mb-7 line-clamp-2 text-sm text-muted-foreground">
                {s.description}
              </p>
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
