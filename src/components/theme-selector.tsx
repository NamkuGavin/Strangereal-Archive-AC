import { Palette, Check } from "lucide-react";
import { THEMES, useTheme, type ThemeId } from "@/lib/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const current = THEMES.find((t) => t.id === theme)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-sm border border-[color:var(--hud)]/40 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)] hover:shadow-[0_0_10px_var(--hud-glow)] transition-shadow">
        <Palette className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{current.name.split(" ")[0]}</span>
        <div className="flex gap-0.5">
          {current.swatch.map((c) => (
            <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 border-[color:var(--hud)]/40 bg-background/95 backdrop-blur"
      >
        <DropdownMenuLabel className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--hud)]">
          Theme Channel
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id as ThemeId)}
            className="flex items-start gap-3 py-2"
          >
            <div className="mt-1 flex gap-0.5">
              {t.swatch.map((c) => (
                <span
                  key={c}
                  className="h-3 w-3 rounded-sm ring-1 ring-white/10"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold">{t.name}</div>
              <div className="text-[10px] text-muted-foreground">{t.blurb}</div>
            </div>
            {theme === t.id && <Check className="h-3.5 w-3.5 text-[color:var(--hud)]" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
