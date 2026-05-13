import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Migas de pan" className="mx-auto max-w-5xl px-4 pt-4 text-sm text-ink/58 sm:px-6">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="paper-label rounded-[0.65rem] px-2 py-1 font-bold hover:text-ink" href="/">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
