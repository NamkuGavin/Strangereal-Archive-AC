import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Network,
  ScrollText,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import {
  conflicts,
  nations,
  squadrons,
  pilots,
  aircraft,
  weapons,
  byId,
  type Conflict,
} from "@/lib/archive-data";
import { DetailHeader } from "@/components/detail-header";
import { HudLabel, HudPanel, RadarBackground, StatusBadge } from "@/components/hud";
import { BackLink } from "@/components/related";

export const Route = createFileRoute("/conflicts/$id")({
  head: ({ params }) => {
    const c = byId(conflicts, params.id);
    return {
      meta: [
        { title: `${c?.name ?? "Conflict"} - Strangereal Archive` },
        { name: "description", content: c?.summary.slice(0, 155) ?? "Conflict record." },
      ],
    };
  },
  component: Detail,
});

type RecordItem = {
  id: string;
  label: string;
  meta: string;
  to?: string;
  missing?: boolean;
};

function Detail() {
  const { id } = useParams({ from: "/conflicts/$id" });
  const c = byId(conflicts, id);
  if (!c)
    return (
      <div className="mx-auto max-w-3xl p-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // record not found
      </div>
    );

  const nationRecords = resolveRecords(
    c.nations,
    nations,
    "nations",
    (n) => n.name,
    (n) => n.status,
  );
  const squadronRecords = resolveRecords(
    c.squadrons,
    squadrons,
    "squadrons",
    (s) => s.name,
    (s) => s.status,
  );
  const pilotRecords = resolveRecords(
    c.pilots,
    pilots,
    "aces",
    (p) => p.callsign,
    (p) => p.type,
  );
  const aircraftRecords = resolveRecords(
    c.aircraft,
    aircraft,
    "aircraft",
    (a) => a.name,
    (a) => a.role,
  );
  const weaponRecords = resolveRecords(
    c.weapons,
    weapons,
    "weapons",
    (w) => w.name,
    (w) => w.type,
  );
  const category = getConflictCategory(c);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-4">
        <BackLink to="/conflicts" label="Back to Conflict Chronicle" />
      </div>
      <DetailHeader
        eyebrow={`Historical File - ${c.era}`}
        title={c.name}
        meta={
          <>
            <StatusBadge>{c.year}</StatusBadge>
            <StatusBadge variant={category.variant}>{category.label}</StatusBadge>
            <StatusBadge variant="muted">{c.events.length} event logs</StatusBadge>
          </>
        }
        right={
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
        }
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
        <div className="grid gap-6">
          <HudPanel className="relative overflow-hidden">
            <div className="relative">
              <HudLabel>Operational Briefing</HudLabel>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <BriefingCard label="Result" text={c.result} />
                <BriefingCard label="Aftermath" text={c.aftermath} />
              </div>
            </div>
          </HudPanel>

          <HudPanel className="overflow-hidden">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <HudLabel>Event Playback</HudLabel>
                <h2 className="mt-1 text-2xl font-bold tracking-wide">Timeline inside the file</h2>
              </div>
              <StatusBadge variant="muted">{c.events.length} records</StatusBadge>
            </div>

            <ol className="relative mt-6 grid gap-3 pl-7">
              <span className="pointer-events-none absolute left-2 top-0 h-full w-px bg-[color:var(--hud)]/25" />
              {c.events.map((event, index) => (
                <li key={`${event.year}-${index}`} className="relative">
                  <span className="absolute -left-[1.55rem] top-5 z-10 h-3 w-3 rounded-full bg-[color:var(--hud)] shadow-[0_0_12px_var(--hud-glow)]" />
                  <div className="rounded-sm border border-[color:var(--hud)]/20 bg-background/45 p-4 transition-colors hover:border-[color:var(--hud)]/45">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--hud)]">
                        {event.year}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                        log {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{event.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </HudPanel>
        </div>

        <aside className="grid content-start gap-6">
          <HudPanel className="relative overflow-hidden">
            <RadarBackground className="opacity-10" />
            <div className="relative">
              <HudLabel>Archive Matrix</HudLabel>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <MatrixStat icon={Network} label="Nations" value={c.nations.length} />
                <MatrixStat icon={ShieldAlert} label="Units" value={c.squadrons.length} />
                <MatrixStat icon={CalendarDays} label="Events" value={c.events.length} />
                <MatrixStat
                  icon={ScrollText}
                  label="Assets"
                  value={c.aircraft.length + c.weapons.length}
                />
              </div>
            </div>
          </HudPanel>

          <RecordSection title="Involved Nations" items={nationRecords} />
          <RecordSection title="Key Squadrons" items={squadronRecords} />
          <RecordSection title="Key Ace Pilots" items={pilotRecords} />
          <RecordSection title="Important Aircraft" items={aircraftRecords} />
          <RecordSection title="Important Weapons" items={weaponRecords} />
        </aside>
      </div>
    </div>
  );
}

function BriefingCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-sm border border-[color:var(--hud)]/20 bg-background/45 p-4">
      <HudLabel>{label}</HudLabel>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{text}</p>
    </div>
  );
}

function MatrixStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-sm border border-[color:var(--hud)]/20 bg-background/45 p-3">
      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-[color:var(--hud)]" />
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-[color:var(--hud)]">{value}</div>
    </div>
  );
}

function RecordSection({ title, items }: { title: string; items: RecordItem[] }) {
  if (!items.length) return null;

  return (
    <HudPanel className="p-5">
      <div className="flex items-center justify-between gap-3">
        <HudLabel>{title}</HudLabel>
        <StatusBadge variant="muted">{items.length}</StatusBadge>
      </div>
      <div className="mt-3 divide-y divide-[color:var(--hud)]/15 border-y border-[color:var(--hud)]/15">
        {items.map((item) =>
          item.to ? (
            <Link
              key={`${title}-${item.id}`}
              to={item.to}
              className="group flex items-center justify-between gap-3 py-2 text-sm hover:text-[color:var(--hud)]"
            >
              <span className="truncate">{item.label}</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {item.meta}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ) : (
            <div
              key={`${title}-${item.id}`}
              className="flex items-center justify-between gap-3 py-2 text-sm text-muted-foreground"
            >
              <span className="truncate">{item.label}</span>
              <span className="rounded-sm border border-[color:var(--accent)]/25 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[color:var(--accent)]">
                {item.meta}
              </span>
            </div>
          ),
        )}
      </div>
    </HudPanel>
  );
}

function resolveRecords<T extends { id: string }>(
  ids: string[],
  list: T[],
  route: string,
  getLabel: (item: T) => string,
  getMeta: (item: T) => string,
): RecordItem[] {
  return ids.map((id) => {
    const item = byId(list, id);
    if (!item) {
      return {
        id,
        label: formatRecordId(id),
        meta: "Reference",
        missing: true,
      };
    }

    return {
      id,
      label: getLabel(item),
      meta: getMeta(item),
      to: `/${route}/${item.id}`,
    };
  });
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
