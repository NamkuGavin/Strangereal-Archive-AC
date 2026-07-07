import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plane,
  Users,
  Globe2,
  Swords,
  UserCircle2,
  Crosshair,
  Lock,
  Radar,
  ArrowRight,
  Palette,
} from "lucide-react";
import { HudLabel, RadarBackground, JetSilhouette, StatusBadge } from "@/components/hud";
import { ArchiveCard } from "@/components/archive-card";
import { aircraft, squadrons, nations, conflicts, pilots, weapons } from "@/lib/archive-data";
import { THEMES } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const feat = {
    aircraft: aircraft[0],
    squadron: squadrons[2],
    conflict: conflicts[0],
    pilot: pilots[2],
    weapon: weapons.find((w) => w.id === "mpbm")!,
  };
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--hud)]/20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--hud)]">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[color:var(--hud)] shadow-[0_0_8px_var(--hud)]" />
              Initializing Tactical Database…
              <span className="opacity-40">//</span>
              Data Link Established
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-glow sm:text-6xl lg:text-7xl">
              STRANGEREAL
              <br />
              <span className="text-[color:var(--hud)]">ARCHIVE</span>
            </h1>
            <p className="mt-4 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Aircraft · Squadrons · Nations · Conflicts · Ace Pilots · Weapon Systems
            </p>
            <p className="mt-6 max-w-xl text-base text-foreground/80">
              Access a classified tactical database of legendary aircraft, elite squadrons,
              historical conflicts, ace pilot dossiers, and advanced weapon systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/aircraft"
                className="group relative inline-flex items-center gap-2 rounded-sm border border-[color:var(--hud)] bg-[color:var(--hud)]/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--hud)] shadow-[0_0_20px_-6px_var(--hud-glow)] transition-all hover:shadow-[0_0_30px_-4px_var(--hud-glow)]"
              >
                <Crosshair className="h-4 w-4" /> Enter Archive
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/squadrons"
                className="inline-flex items-center gap-2 rounded-sm border border-muted-foreground/30 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-[color:var(--hud)]/60 hover:text-foreground"
              >
                <Users className="h-4 w-4" /> View Squadron Records
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.18em] sm:grid-cols-4">
              {[
                { k: "Access", v: "Pilot Archive" },
                { k: "Status", v: "Online" },
                {
                  k: "Records",
                  v: `${aircraft.length + squadrons.length + pilots.length + weapons.length}`,
                },
                { k: "Sector", v: "Strangereal" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-sm border border-[color:var(--hud)]/25 bg-background/40 p-2"
                >
                  <div className="text-muted-foreground">{s.k}</div>
                  <div className="text-[color:var(--hud)]">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="hud-panel hud-corners scanline relative aspect-square overflow-hidden rounded-sm p-8">
              <RadarBackground />
              <div className="relative flex h-full items-center justify-center overflow-hidden">
                <img
                  src="/images/strangereal_map.png"
                  alt="Strangereal tactical map"
                  className="object-cover opacity-75 mix-blend-screen drop-shadow-[0_0_10px_var(--hud-glow)]"
                />
              </div>
              <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)]">
                CAM 04 · TRACK 001
              </div>
              <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-widest text-[color:var(--accent)]">
                LOCK · ARMED
              </div>
              <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                ALT 32,000 · MACH 1.6
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main archive cards */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <HudLabel>Section 01 · Catalog Index</HudLabel>
            <h2 className="mt-1 text-2xl font-bold tracking-wide sm:text-3xl">
              Access the archive
            </h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
            // six primary databases
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ArchiveCard
            to="/aircraft"
            icon={Plane}
            title="Aircraft Database"
            description="Airframes, roles, stat readouts, and combat records for every catalogued fighter."
            count={aircraft.length}
            label_card="AIR_001"
          />
          <ArchiveCard
            to="/squadrons"
            icon={Users}
            title="Squadron Records"
            description="Elite flights, mercenary teams, and enemy aces from every catalogued conflict."
            count={squadrons.length}
            label_card="SQD_002"
          />
          <ArchiveCard
            to="/nations"
            icon={Globe2}
            title="Nation Archive"
            description="Continental powers, kingdoms, and small allied states across Strangereal."
            count={nations.length}
            label_card="NAT_003"
          />
          <ArchiveCard
            to="/conflicts"
            icon={Swords}
            title="Conflict Timeline"
            description="Continental wars, superweapon incidents, and the aftermath of each engagement."
            count={conflicts.length}
            label_card="CFN_004"
          />
          <ArchiveCard
            to="/aces"
            icon={UserCircle2}
            title="Ace Pilot Dossier"
            description="Classified profiles of player aces, enemy rivals, and supporting personnel."
            count={pilots.length}
            label_card="ACE_005"
          />
          <ArchiveCard
            to="/weapons"
            icon={Crosshair}
            title="Weapon System"
            description="Standard loadouts, air-to-air, air-to-ground, special and experimental munitions."
            count={weapons.length}
            label_card="WPN_006"
          />
        </div>
      </section>

      {/* Featured records */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-6">
          <HudLabel>Section 02 · Featured Records</HudLabel>
          <h2 className="mt-1 text-2xl font-bold tracking-wide sm:text-3xl">
            Priority Declassifications
          </h2>
        </div>

        <div className="grid auto-rows-[180px] gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureTile
            to={`/aircraft/${feat.aircraft.id}`}
            tag="AIRCRAFT_SPEC"
            title={feat.aircraft.name}
            sub={feat.aircraft.role}
            description="The pinnacle of aeronautical engineering. Variable geometry wing design with advanced fly-by-wire capabilities."
            image="/images/feature/f22_raptor.png"
            className="md:col-span-2 md:row-span-2"
            featured
          />

          <FeatureTile
            to={`/squadrons/${feat.squadron.id}`}
            tag="UNIT_HISTORY"
            title={feat.squadron.name}
            sub={feat.squadron.status}
            description="Elite squadron record containing unit history, affiliation, and battlefield operations."
            image="/images/feature/razgriz_art.jpg"
          />

          <FeatureTile
            to={`/aces/${feat.pilot.id}`}
            tag="ACE_PROFILE"
            title={`Callsign: ${feat.pilot.callsign}`}
            sub={feat.pilot.type}
            description="Classified pilot dossier containing callsign history, allegiance, and combat behavior."
            image="/images/feature/f15c_cipher.jpg"
            classified={feat.pilot.classified}
          />

          <FeatureTile
            to={`/conflicts/${feat.conflict.id}`}
            tag="CONFLICT_LOG"
            title={feat.conflict.name}
            sub={String(feat.conflict.year)}
            description="A major Strangereal conflict involving superweapon escalation, coalition warfare, and post-war instability."
            image="/images/feature/belkan_war.jpg"
            className="md:col-span-2"
          />

          <FeatureTile
            to={`/weapons/${feat.weapon.id}`}
            tag="WEAPON_SYS"
            title={feat.weapon.name}
            sub={feat.weapon.type}
            description="Experimental weapon system record containing tactical function and deployment classification."
            image="/images/feature/mpbm.jpg"
            className="md:col-span-4"
          />
        </div>
      </section>

      {/* Theme showcase */}
      <section className="border-y border-[color:var(--hud)]/20 bg-background/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-6 flex items-center gap-2">
            <Palette className="h-4 w-4 text-[color:var(--hud)]" />
            <HudLabel>Section 03 · HUD Channel</HudLabel>
          </div>
          <h2 className="text-2xl font-bold tracking-wide sm:text-3xl">
            Switch the war archive theme
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Tune the archive to a different era. Each channel remaps the interface color, glow, and
            panel mood — the archive stays the same, only the atmosphere changes.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map((t) => (
              <div key={t.id} className="hud-panel hud-corners rounded-sm p-4">
                <div className="flex gap-1">
                  {t.swatch.map((c) => (
                    <span
                      key={c}
                      className="h-6 w-6 rounded-sm ring-1 ring-white/10"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="mt-3 text-sm font-semibold">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.blurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz coming soon */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="hud-panel hud-corners scanline relative overflow-hidden rounded-sm p-8">
          <RadarBackground className="opacity-20" />
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-2 flex items-center gap-2">
                <Radar className="h-4 w-4 text-[color:var(--hud)]" />
                <HudLabel>Section 04 · Training Sim</HudLabel>
              </div>
              <h2 className="text-2xl font-bold tracking-wide sm:text-3xl">
                Mission Quiz — <span className="text-[color:var(--accent)]">Coming Soon</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Future update: test your knowledge of aircraft, squadrons, conflicts, ace pilots,
                and weapons. Earn points to unlock classified dossiers and special archive variants.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Unlock Galm Team Dossier",
                  "Unlock Experimental Aircraft File",
                  "Unlock Ace Pilot Profile",
                  "Unlock Special Theme Variant",
                ].map((r) => (
                  <button
                    key={r}
                    disabled
                    className="inline-flex items-center gap-2 rounded-sm border border-muted-foreground/25 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-70"
                  >
                    <Lock className="h-3 w-3" /> {r}
                  </button>
                ))}
              </div>
            </div>
            <StatusBadge variant="warn">Future Update</StatusBadge>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureTile({
  to,
  tag,
  title,
  sub,
  description,
  image,
  classified,
  className,
  featured = false,
}: {
  to: string;
  tag: string;
  title: string;
  sub: string;
  description: string;
  image: string;
  classified?: boolean;
  className?: string;
  featured?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group hud-panel scanline relative block overflow-hidden rounded-sm",
        "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_-8px_var(--hud-glow)]",
        className,
      )}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/45 transition-colors duration-300 group-hover:bg-slate-950/25" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      {/* Scanline layer */}
      <div className="scanline pointer-events-none absolute inset-0 opacity-40" />
      {classified && (
        <div className="pointer-events-none absolute right-3 top-3 rounded-sm border border-red-500/70 bg-slate-950/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-red-400">
          CLS
        </div>
      )}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="w-fit bg-[color:var(--hud)] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-background">
          {tag}
        </div>
        <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        <p
          className={cn(
            "mt-3 max-w-md text-xs leading-relaxed text-foreground/90 transition-all duration-300",
            featured
              ? "line-clamp-3 opacity-100"
              : "line-clamp-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          {description}
        </p>
        <div className="mt-4 flex translate-y-2 items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Open
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
