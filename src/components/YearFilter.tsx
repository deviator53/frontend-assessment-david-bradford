"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function YearFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = searchParams.get("year") || "";

  const years = Array.from({ length: 26 }, (_, i) => (2026 - i).toString());

  const handleChange = (year: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    params.set("page", "1"); 
    router.push(`/?${params.toString()}`);
  };

  return (
    <select
      value={currentYear}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-white outline-none ring-1 ring-zinc-700 focus:ring-2 focus:ring-red-600"
    >
      <option value="">All Years</option>
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
}
