import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type OptionCardProps = {
  name: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  selected: boolean;
  inputType: "radio" | "checkbox";
  inputName: string;
  value: string;
  onChange: () => void;
  compact?: boolean;
};

export function OptionCard({
  name,
  description,
  imageSrc,
  imageAlt,
  selected,
  inputType,
  inputName,
  value,
  onChange,
  compact = false,
}: OptionCardProps) {
  return (
    <label
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border bg-card text-left shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] transition duration-300",
        "hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_40px_-28px_rgba(70,48,24,0.55)]",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        selected
          ? "border-gold bg-gold-soft shadow-[0_18px_40px_-28px_rgba(70,48,24,0.55)]"
          : "border-border",
      )}
    >
      <input
        className="sr-only"
        type={inputType}
        name={inputName}
        value={value}
        checked={selected}
        onChange={onChange}
      />
      {imageSrc ? (
        <span className="relative block aspect-4/5 overflow-hidden bg-muted">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </span>
      ) : null}
      <span className={cn("flex flex-1 flex-col", compact ? "p-4" : "p-4 sm:p-5")}>
        <span className="flex items-start justify-between gap-3">
          <span className={cn("font-heading leading-tight", compact ? "text-xl" : "text-2xl")}>
            {name}
          </span>
          <span
            className={cn(
              "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-transparent group-hover:border-gold/60",
            )}
            aria-hidden
          >
            <Check className="size-3.5" />
          </span>
        </span>
        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}
