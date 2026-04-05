import Link from "next/link";

interface BreadcrumbProps {
  movieTitle: string;
}

export default function Breadcrumbs({ movieTitle }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex text-sm text-zinc-500" aria-label="Breadcrumb">
      <ol className="flex list-none p-0">
        <li className="flex items-center">
          <Link href="/" className="hover:text-white transition-colors">
            Movies
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li className="text-zinc-300 font-medium truncate max-w-[200px] md:max-w-none">
          {movieTitle}
        </li>
      </ol>
    </nav>
  );
}
