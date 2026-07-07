import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--hud)]/70" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search records…"}
        className="border-[color:var(--hud)]/30 bg-background/60 pl-9 font-mono text-xs uppercase tracking-widest placeholder:text-muted-foreground/60 focus-visible:ring-[color:var(--hud)]"
      />
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
        active
          ? "border-[color:var(--hud)] bg-[color:var(--hud)]/10 text-[color:var(--hud)] shadow-[0_0_10px_var(--hud-glow)]"
          : "border-[color:var(--hud)]/25 text-muted-foreground hover:border-[color:var(--hud)]/60 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <Chip active={value === "all"} onClick={() => onChange("all")}>
        All
      </Chip>
      {options.map((o) => (
        <Chip key={o} active={value === o} onClick={() => onChange(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}
