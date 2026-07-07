import { createFileRoute } from "@tanstack/react-router";
import { Lock, Radar, Trophy, Plane, Users, Swords, UserCircle2, Crosshair } from "lucide-react";
import { HudLabel, HudPanel, StatusBadge, RadarBackground } from "@/components/hud";
import { SectionHeader } from "@/components/hud";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Mission Quiz — Coming Soon · Strangereal Archive" },
      {
        name: "description",
        content:
          "Future training simulation: earn points, unlock classified dossiers and special theme variants.",
      },
    ],
  }),
  component: QuizPage,
});

const QUIZZES = [
  {
    icon: Plane,
    title: "Aircraft Guessing Quiz",
    desc: "Identify airframes from silhouettes and stat readouts.",
  },
  {
    icon: Users,
    title: "Squadron Emblem Quiz",
    desc: "Match emblems to their squadrons and conflicts.",
  },
  {
    icon: Swords,
    title: "Conflict Timeline Quiz",
    desc: "Place events on the correct war and year.",
  },
  {
    icon: UserCircle2,
    title: "Ace Pilot Dossier Quiz",
    desc: "Match callsigns to airframes, squadrons, and rivals.",
  },
  {
    icon: Crosshair,
    title: "Weapon System Quiz",
    desc: "Match munitions to compatible airframes and best use.",
  },
];

const REWARDS = [
  "Unlock Galm Team Dossier",
  "Unlock Experimental Aircraft File",
  "Unlock Ace Pilot Profile",
  "Unlock Special Theme Variant",
];

function QuizPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        eyebrow="Section 07 · Training Simulator"
        title="Mission Quiz — Coming Soon"
        sub="Future update: test your knowledge across the entire archive."
        right={<StatusBadge variant="warn">Future Update</StatusBadge>}
      />
      <div className="hud-panel hud-corners scanline relative mb-8 overflow-hidden rounded-sm p-6 sm:p-8">
        <RadarBackground className="opacity-25" />
        <div className="relative flex flex-wrap items-center gap-4">
          <Radar className="h-10 w-10 text-[color:var(--hud)]" />
          <div className="max-w-2xl">
            <div className="text-sm">
              A dedicated simulator module for the Strangereal Archive. Test your knowledge across
              aircraft, squadrons, conflicts, ace pilots, and weapon systems — earn points and
              unlock classified records.
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--accent)]">
              // module offline · awaiting deployment
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {QUIZZES.map((q) => (
          <div key={q.title} className="hud-panel hud-corners relative rounded-sm p-5 opacity-95">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-sm border border-[color:var(--hud)]/40 text-[color:var(--hud)]">
                <q.icon className="h-5 w-5" />
              </div>
              <StatusBadge variant="warn">Coming Soon</StatusBadge>
            </div>
            <h3 className="mt-4 text-lg font-bold">{q.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{q.desc}</p>
            <button
              disabled
              className="mt-4 inline-flex items-center gap-2 rounded-sm border border-muted-foreground/25 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-70"
            >
              <Lock className="h-3 w-3" /> Locked
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <HudPanel>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-[color:var(--accent)]" />
            <HudLabel>Point System · Preview</HudLabel>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>· Earn points by completing quizzes</li>
            <li>· Use points to unlock classified dossiers</li>
            <li>· Unlock special aircraft files</li>
            <li>· Unlock character profiles</li>
            <li>· Unlock special theme variants</li>
          </ul>
        </HudPanel>
        <HudPanel>
          <HudLabel>Unlock Rewards</HudLabel>
          <div className="mt-3 grid gap-2">
            {REWARDS.map((r) => (
              <button
                key={r}
                disabled
                className="flex items-center justify-between gap-3 rounded-sm border border-muted-foreground/25 px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground opacity-70"
              >
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  {r}
                </span>
                <StatusBadge variant="muted">Locked</StatusBadge>
              </button>
            ))}
          </div>
        </HudPanel>
      </div>
    </div>
  );
}
