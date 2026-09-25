export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#guide"
          className="font-heading text-[1.7rem] leading-none tracking-tight text-foreground"
        >
          02hair
        </a>
        <p className="text-right text-xs tracking-wide text-muted-foreground sm:text-sm">
          Персональный гид по уходу
        </p>
      </div>
    </header>
  );
}
