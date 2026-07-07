import { Link } from "@tanstack/react-router";
import { type LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HudLabel } from "./hud";

export function ArchiveCard({
  to,
  icon: Icon,
  title,
  description,
  cta = "Open File",
  count,
  className,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: string;
  count?: number;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group hud-panel hud-corners scanline relative block rounded-sm p-5 transition-all",
        "hover:-translate-y-0.5 hover:shadow-[0_0_35px_-8px_var(--hud-glow)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-sm border border-[color:var(--hud)]/40 bg-[color:var(--hud)]/5 text-[color:var(--hud)]">
          <Icon className="h-5 w-5" />
        </div>
        {count !== undefined && <HudLabel>{count.toString().padStart(3, "0")} REC</HudLabel>}
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-wide">{title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)] opacity-80 group-hover:opacity-100">
        {cta} <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
