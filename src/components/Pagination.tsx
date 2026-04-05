"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `/?${params.toString()}`;
  };

  const safeTotalPages = Math.min(totalPages, 500);

  return (
    <div className="mt-12 flex items-center justify-center gap-4 pb-10">
      <button
        onClick={() => router.push(createPageUrl(currentPage - 1))}
        disabled={currentPage <= 1}
        className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-zinc-400">
        Page <span className="text-white">{currentPage}</span> of{" "}
        {safeTotalPages}
      </span>

      <button
        onClick={() => router.push(createPageUrl(currentPage + 1))}
        disabled={currentPage >= safeTotalPages}
        className="rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
