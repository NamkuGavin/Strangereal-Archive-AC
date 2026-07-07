import { type ReactNode } from "react";
import { HudLabel, RadarBackground } from "./hud";
import { cn } from "@/lib/utils";

export function DetailHeader({
  eyebrow,
  title,
  meta,
  right,
  media,
  mediaImage,
}: {
  eyebrow: string;
  title: string;
  meta?: ReactNode;
  right?: ReactNode;
  media?: ReactNode;
  mediaImage?: string;
}) {
  return (
    <div className="group hud-panel hud-corners scanline relative min-h-[210px] overflow-hidden rounded-sm p-6 sm:p-8">
      <RadarBackground className="opacity-30" />

      {mediaImage && (
        <div
          className="
        pointer-events-none absolute inset-y-0 right-0 z-0 w-[58%]
        bg-cover bg-center bg-no-repeat opacity-75
        transition-all duration-500 group-hover:opacity-90
        [mask-image:linear-gradient(to_right,transparent_0%,white_75%,white_100%)]
        [-webkit-mask-image:linear-gradient(to_right,transparent_0%,white_75%,white_100%)]
      "
          style={{ backgroundImage: `url('${mediaImage}')` }}
        />
      )}

      <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
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

        {!mediaImage && media && (
          <div className="w-full max-w-[280px] text-[color:var(--hud)]">{media}</div>
        )}
      </div>
    </div>
  );
}
