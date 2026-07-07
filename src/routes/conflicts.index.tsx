import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock3, RadioTower, type LucideIcon } from "lucide-react";

import { conflicts, nations, byId, type Conflict } from "@/lib/archive-data";
import { HudLabel, RadarBackground, SectionHeader, StatusBadge } from "@/components/hud";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/conflicts/")({
  head: () => ({
    meta: [
      { title: "Conflict Timeline - Strangereal Archive" },
      {
        name: "description",
        content: "Historical timeline of continental wars and superweapon incidents.",
      },
    ],
  }),
  component: Page,
});

const timeline = [...conflicts].sort((a, b) => firstYear(a).localeCompare(firstYear(b)));
const eraGroups = timeline.reduce<Record<string, Conflict[]>>((groups, conflict) => {
  groups[conflict.era] ??= [];
  groups[conflict.era].push(conflict);
  return groups;
}, {});

function Page() {
  const totalEvents = timeline.reduce((sum, conflict) => sum + conflict.events.length, 0);
  const yearRange = `${firstYear(timeline[0])} - ${firstYear(timeline[timeline.length - 1])}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Catalog - 04"
        title="Conflict Chronicle"
        sub="A guided history board for Strangereal's wars, uprisings, shadow operations, and future crises."
        right={<HudLabel>{conflicts.length} historical files</HudLabel>}
      />

      <section className="hud-panel scanline relative mb-8 overflow-hidden rounded-sm p-6 sm:p-8">
        <RadarBackground className="opacity-20" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <HudLabel>Historical Flight Recorder</HudLabel>
            <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-wide text-glow sm:text-5xl">
              From island insurgencies to corporate-era warfare.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Follow the archive as a campaign history instead of a database filter. Major wars and
              smaller incidents sit on one route so the side conflicts still explain how the larger
              Strangereal timeline escalates.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <ChronicleStat icon={Clock3} label="Coverage" value={yearRange} />
            <ChronicleStat icon={BookOpen} label="Records" value={`${conflicts.length} files`} />
            <ChronicleStat icon={RadioTower} label="Events" value={`${totalEvents} entries`} />
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <HudLabel>History Rail</HudLabel>
            <h3 className="mt-1 text-2xl font-bold tracking-wide">War Record</h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Horizontal Archive - Snap Enabled
          </span>
        </div>

        <div className="relative rounded-sm border border-[color:var(--hud)]/25 bg-background/35 px-4 py-5">
          <div className="overflow-x-auto pb-4 [scrollbar-color:var(--hud)_transparent] [scrollbar-width:thin]">
            <div className="relative flex min-w-max snap-x snap-mandatory gap-4 pr-4 pt-10">
              <div className="pointer-events-none absolute left-0 right-0 top-4 h-px bg-gradient-to-r from-transparent via-[color:var(--hud)]/60 to-transparent" />
              {timeline.map((conflict, index) => (
                <TimelineCard key={conflict.id} conflict={conflict} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineCard({ conflict, index }: { conflict: Conflict; index: number }) {
  const involved = conflict.nations.map((id) => byId(nations, id)?.name ?? formatRecordId(id));
  const category = getConflictCategory(conflict);

  return (
    <Link
      to="/conflicts/$id"
      params={{ id: conflict.id }}
      className={cn(
        "group relative flex min-h-[25rem] w-[21rem] shrink-0 snap-start flex-col rounded-sm border border-[color:var(--hud)]/30 bg-background/70 p-5 transition-all hover:border-[color:var(--hud)] hover:shadow-[0_0_15px_-8px_var(--hud-glow)]",
        index === 0 && "ml-1",
      )}
    >
      <span className="absolute left-5 top-[-2rem] h-4 w-4 rounded-full border border-[color:var(--hud)] bg-background">
        <span className="absolute inset-1 rounded-full bg-[color:var(--hud)] animate-pulse" />
      </span>
      <div className="flex items-start justify-between gap-3">
        <div>
          <HudLabel>
            {conflict.year} - {conflict.era}
          </HudLabel>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold">{conflict.name}</h3>
        </div>
        <StatusBadge variant={category.variant}>{category.label}</StatusBadge>
      </div>
      <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
        {conflict.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {involved.slice(0, 3).map((name) => (
          <span
            key={name}
            className="rounded-sm border border-[color:var(--hud)]/20 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
          >
            {name}
          </span>
        ))}
        {involved.length > 3 && (
          <span className="rounded-sm border border-[color:var(--accent)]/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[color:var(--accent)]">
            +{involved.length - 3}
          </span>
        )}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--hud)]">
        Open history file
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function ChronicleStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-[color:var(--hud)]/25 bg-background/45 p-3">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-[color:var(--hud)]" />
        {label}
      </div>
      <div className="mt-1 text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}

function firstYear(conflict: Conflict) {
  return conflict.year.match(/\d{4}/)?.[0] ?? conflict.year;
}

function getConflictCategory(conflict: Conflict): {
  label: string;
  variant: "default" | "warn" | "danger" | "muted";
} {
  if (conflict.era === "2040s") return { label: "Future", variant: "danger" };
  if (/uprising|coup|insurrection/i.test(conflict.name)) {
    return { label: "Incident", variant: "muted" };
  }
  if (conflict.events.length >= 8 || conflict.nations.length >= 4) {
    return { label: "Major War", variant: "warn" };
  }
  return { label: "Conflict", variant: "default" };
}

function formatRecordId(id: string) {
  return id
    .split("-")
    .map((part) => (part.length <= 4 ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)))
    .join(" ");
}
