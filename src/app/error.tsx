"use client";

export default function GuideError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-full max-w-lg flex-col justify-center px-6 py-20">
      <p className="font-heading text-3xl text-foreground">02hair</p>
      <h1 className="mt-4 font-heading text-4xl leading-tight">Не удалось открыть гид</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Обновите страницу. Ответы, которые уже были выбраны, хранятся в этом браузере.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 h-11 w-fit rounded-full bg-primary px-5 text-sm text-primary-foreground"
      >
        Попробовать снова
      </button>
    </main>
  );
}
