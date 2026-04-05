import Link from "next/link";

interface Props {
  query?: string;
  year?: string;
}

export default function SearchBreadcrumbs({ query, year }: Props) {
  if (!query && !year) return null;

  return (
    <nav
      className="mb-6 flex items-center text-sm text-zinc-500"
      aria-label="Breadcrumb"
    >
      <ol className="flex list-none items-center p-0">
        <li className="flex items-center">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li className="text-zinc-300 font-medium italic">
          {query ? `Searching for "${query}"` : "Filtered Results"}
          {year && ` in ${year}`}
        </li>
      </ol>
    </nav>
  );
}
