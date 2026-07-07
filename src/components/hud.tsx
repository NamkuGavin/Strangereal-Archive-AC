import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HudPanel({
  className,
  children,
  glow = true,
}: {
  className?: string;
  children: ReactNode;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "hud-panel hud-corners rounded-sm p-5",
        glow && "shadow-[0_0_30px_-15px_var(--hud-glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HudLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--hud)] opacity-80",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  right,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--hud)]/30 pb-4">
      <div className="min-w-0">
        {eyebrow && <HudLabel>{eyebrow}</HudLabel>}
        <h2 className="mt-1 text-2xl font-bold tracking-wide sm:text-3xl text-glow">{title}</h2>
        {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="text-[color:var(--hud)]">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-sm bg-[color:var(--muted)]">
        <div
          className="h-full bg-gradient-to-r from-[color:var(--hud)] to-[color:var(--accent)]"
          style={{ width: `${value}%`, boxShadow: "0 0 8px var(--hud-glow)" }}
        />
      </div>
    </div>
  );
}

export function StatusBadge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "warn" | "danger" | "muted";
}) {
  const style =
    variant === "warn"
      ? "border-[color:var(--accent)] text-[color:var(--accent)]"
      : variant === "danger"
        ? "border-red-500/60 text-red-400"
        : variant === "muted"
          ? "border-muted-foreground/40 text-muted-foreground"
          : "border-[color:var(--hud)] text-[color:var(--hud)]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        style,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function ClassifiedOverlay({ children }: { children?: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="rotate-[-6deg] rounded-sm border-2 border-red-500/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] text-red-400/90">
        {children ?? "Classified"}
      </div>
    </div>
  );
}

export function RadarBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full radar-sweep opacity-40" />
      {[0.3, 0.55, 0.8].map((s, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--hud)]/25"
          style={{ width: `${s * 100}%` }}
        />
      ))}
      <div className="absolute left-1/2 top-0 h-full w-px bg-[color:var(--hud)]/15" />
      <div className="absolute top-1/2 left-0 h-px w-full bg-[color:var(--hud)]/15" />
    </div>
  );
}

export function JetSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={cn("h-full w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M10 50 L60 46 L90 30 L110 30 L130 46 L188 46 L188 54 L130 54 L110 70 L90 70 L60 54 L10 50 Z" />
      <path d="M90 30 L100 10 L110 30" />
      <path d="M60 46 L40 20 M60 54 L40 80" opacity="0.5" />
      <circle cx="150" cy="50" r="3" />
    </svg>
  );
}

export function EmblemPlaceholder({ seed, className }: { seed: string; className?: string }) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const rot = h % 360;
  const sides = 3 + (Math.abs(h) % 5);
  const pts = Array.from({ length: sides }, (_, i) => {
    const a = (i / sides) * Math.PI * 2 + (h % 7);
    const r = 26 + ((h >> i) & 7);
    return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`;
  }).join(" ");
  const gid = `g-${seed.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox="0 0 100 100" className={cn("h-full w-full", className)}>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="46"
        fill={`url(#${gid})`}
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <g transform={`rotate(${rot} 50 50)`} stroke="currentColor" fill="none" strokeWidth="1.2">
        <polygon points={pts} />
        <circle cx="50" cy="50" r="14" />
        <line x1="50" y1="4" x2="50" y2="96" strokeOpacity="0.3" />
        <line x1="4" y1="50" x2="96" y2="50" strokeOpacity="0.3" />
      </g>
      <text
        x="50"
        y="54"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        fill="currentColor"
        opacity="0.9"
      >
        {seed.slice(0, 3).toUpperCase()}
      </text>
    </svg>
  );
}
