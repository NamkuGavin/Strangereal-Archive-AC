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
  label_card,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: string;
  count?: number;
  className?: string;
  label_card: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group hud-panel hud-corners scanline relative block rounded-sm px-5 pt-5 pb-3 transition-all",
        "hover:-translate-y-0.5 hover:shadow-[0_0_15px_-8px_var(--hud-glow)]",
        "flex flex-col items-center justify-center",
        className,
      )}
    >
      <div className="flex self-stretch items-center justify-between">
        <HudLabel>DATA_ID: {label_card}</HudLabel>
        {count !== undefined && <HudLabel>{count.toString().padStart(3, "0")} REC</HudLabel>}
      </div>
      <Icon className="h-8 w-8 mt-2" />
      <h3 className="mt-2 text-lg font-bold tracking-wide">{title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground text-center">{description}</p>
      <div className="mt-2 flex translate-y-1 items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {cta}
        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
