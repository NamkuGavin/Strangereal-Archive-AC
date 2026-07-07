import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Radar } from "lucide-react";
import { ThemeSelector } from "./theme-selector";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/aircraft", label: "Aircraft" },
  { to: "/squadrons", label: "Squadrons" },
  { to: "/nations", label: "Nations" },
  { to: "/conflicts", label: "Conflicts" },
  { to: "/aces", label: "Aces" },
  { to: "/weapons", label: "Weapons" },
  { to: "/quiz", label: "Quiz" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--hud)]/25 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <Radar
            className="h-5 w-5 text-[color:var(--hud)] group-hover:animate-spin"
            style={{ animationDuration: "3s" }}
          />
          <span className="font-display text-sm font-bold tracking-[0.2em] text-glow">
            STRANGEREAL <span className="text-[color:var(--hud)]">ARCHIVE</span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "group relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "text-[color:var(--hud)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-all",
                    active
                      ? "border-[color:var(--hud)]"
                      : "border-transparent group-hover:border-[color:var(--hud)]/60",
                  )}
                />
                <span className="pointer-events-none absolute -left-0.5 top-0 h-2 w-2 border-l border-t border-[color:var(--hud)] opacity-0 group-hover:opacity-100" />
                <span className="pointer-events-none absolute -right-0.5 bottom-0 h-2 w-2 border-b border-r border-[color:var(--hud)] opacity-0 group-hover:opacity-100" />
                {l.label}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeSelector />
          </div>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeSelector />
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-[color:var(--hud)]/40 text-[color:var(--hud)]"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-[color:var(--hud)]/25 bg-background/95 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 p-3">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-sm border px-3 py-2 font-mono text-xs uppercase tracking-widest",
                    active
                      ? "border-[color:var(--hud)] text-[color:var(--hud)]"
                      : "border-transparent text-muted-foreground",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
