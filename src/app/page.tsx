export const runtime = "edge";
import { getTrendingMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import YearFilter from "@/components/YearFilter";
import SearchBreadcrumbs from "@/components/SearchBreadCrumbs";
import HeroSlider from "@/components/HeroSlider";

interface Props {
  searchParams: { q?: string; page?: string; year?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const query = searchParams.q;
  const page = Number(searchParams.page) || 1;
  const year = searchParams.year;

  const data = await getTrendingMovies(page, query, year);

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      {!query && !year && page === 1 && <HeroSlider movies={data.results} />}
      <SearchBreadcrumbs query={query} year={year} />
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            {query ? `Results for "${query}"` : "Trending Movies"}
          </h1>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <YearFilter />
          <SearchBar />
        </div>
      </div>

      {data.results.length > 0 ? (
        <>
          <MovieGrid movies={data.results} />
          <Pagination totalPages={data.total_pages} currentPage={page} />
        </>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl text-zinc-500">
            No movies found matching your search.
          </p>
        </div>
      )}
    </main>
  );
}
