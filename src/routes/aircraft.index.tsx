import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { aircraft, weapons, squadrons, pilots, byId } from "@/lib/archive-data";
import { SectionHeader, HudLabel, StatusBadge, StatBar, JetSilhouette } from "@/components/hud";
import { SearchBar } from "@/components/filter-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
const ALL = "all";

function AircraftList() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState(ALL);
  const [app, setApp] = useState(ALL);
  const [status, setStatus] = useState(ALL);

  const list = useMemo(
    () =>
      aircraft.filter(
        (a) =>
          (!q || a.name.toLowerCase().includes(q.toLowerCase())) &&
          (role === ALL || a.role === role) &&
          (app === ALL || a.appearances.includes(app)) &&
          (status === ALL || a.status === status),
      ),
    [q, role, app, status],
  );

  const hasActiveFilters = Boolean(q) || role !== ALL || app !== ALL || status !== ALL;

  const clearFilters = () => {
    setQ("");
    setRole(ALL);
    setApp(ALL);
    setStatus(ALL);
  };

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
      <div className="mb-6 grid gap-5 p-3 sm:p-4">
        <SearchBar value={q} onChange={setQ} placeholder="Search airframe designation…" />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 gap-5 sm:grid-cols-3 lg:max-w-3xl">
            <FilterSelect
              label="Role"
              value={role}
              allLabel="All roles"
              options={ROLES}
              onChange={setRole}
            />
            <FilterSelect
              label="Appearance"
              value={app}
              allLabel="All eras"
              options={APPS}
              onChange={setApp}
            />
            <FilterSelect
              label="Status"
              value={status}
              allLabel="All status"
              options={STATUSES}
              onChange={setStatus}
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
        {list.map((a) => {
          const w = a.weapons
            .map((id) => byId(weapons, id)?.name)
            .filter(Boolean)
            .slice(0, 4);

          return (
            <Link
              key={a.id}
              to="/aircraft/$id"
              params={{ id: a.id }}
              className="group hud-panel scanline relative block min-h-[360px] overflow-hidden rounded-sm p-5 transition-all hover:-translate-y-0.5"
            >
              {/* Full background image */}
              <div
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-65 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
                style={{
                  backgroundImage: "url('/images/feature/f22_raptor.png')",
                }}
              />

              {/* Overall tint tipis, biar image tetap nyatu dengan HUD */}
              <div className="pointer-events-none absolute inset-0 bg-slate-950/20" />

              {/* Header fade tipis */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />

              {/* Bottom fade gelap, tapi image tetap kelihatan */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex min-h-[320px] flex-col">
                {/* Header */}
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

                {/* Spacer biar bagian bawah turun otomatis */}
                <div className="flex-1" />

                {/* Bottom content */}
                <div>
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {a.appearances.map((x) => (
                      <span
                        key={x}
                        className="rounded-sm border border-[color:var(--hud)]/25 bg-background/30 px-1.5 py-0.5 backdrop-blur-sm"
                      >
                        {x}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <StatBar label="Air-to-Air" value={a.stats.air} />
                    <StatBar label="Air-to-Ground" value={a.stats.ground} />
                  </div>

                  <div className="mt-4 text-[11px] text-muted-foreground">
                    <div>
                      <span className="text-[color:var(--hud)]/80">SP Weapon: </span>{" "}
                      {w.join(" · ") || "—"}
                    </div>
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
