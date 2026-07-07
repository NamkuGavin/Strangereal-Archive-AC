import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { HudLabel } from "./hud";

export function RelatedList({
  title,
  items,
}: {
  title: string;
  items: { to: string; label: string; meta?: string }[];
}) {
  if (!items.length) return null;
  return (
    <div>
      <HudLabel>{title}</HudLabel>
      <ul className="mt-2 divide-y divide-[color:var(--hud)]/15 border-y border-[color:var(--hud)]/15">
        {items.map((it) => (
          <li key={it.to + it.label}>
            <Link
              to={it.to}
              className="group flex items-center justify-between gap-3 py-2 text-sm hover:text-[color:var(--hud)]"
            >
              <span className="truncate">{it.label}</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {it.meta}
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)] hover:text-glow"
    >
      <span className="inline-block rotate-180">
        <ChevronRight className="h-3 w-3" />
      </span>
      {label}
    </Link>
  );
}
