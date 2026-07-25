import type { CSSProperties } from "react";

/**
 * Easily replaceable image placeholder. Swap the inner content for an <img>
 * once real photography is ready.
 */
export function Placeholder({
  label,
  aspect = "4/5",
  className = "",
  tone = "sand",
  style,
}: {
  label: string;
  aspect?: string;
  className?: string;
  tone?: "sand" | "stone" | "cream";
  style?: CSSProperties;
}) {
  const bg =
    tone === "stone"
      ? "bg-stone-warm"
      : tone === "cream"
      ? "bg-cream"
      : "bg-sand";
  return (
    <div
      className={`relative w-full overflow-hidden outline-1 -outline-offset-1 outline-foreground/5 ${bg} ${className}`}
      style={{ aspectRatio: aspect, ...style }}
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground/40">
          {label}
        </span>
      </div>
    </div>
  );
}
