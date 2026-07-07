import { type ReactNode } from "react";
import { HudLabel, RadarBackground } from "./hud";

export function DetailHeader({
  eyebrow,
  title,
  meta,
  right,
  media,
}: {
  eyebrow: string;
  title: string;
  meta?: ReactNode;
  right?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <div className="hud-panel hud-corners scanline relative overflow-hidden rounded-sm p-6 sm:p-8">
      <RadarBackground className="opacity-30" />
      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <HudLabel>{eyebrow}</HudLabel>
          <h1 className="mt-2 text-3xl font-bold tracking-wide text-glow sm:text-4xl">{title}</h1>
          {meta && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {meta}
            </div>
          )}
          {right && <div className="mt-4">{right}</div>}
        </div>
        {media && <div className="w-full max-w-[280px] text-[color:var(--hud)]">{media}</div>}
      </div>
    </div>
  );
}
