import { getTrendingMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export default async function HomePage() {
  const data = await getTrendingMovies();

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Trending <span className="text-red-600">Movies</span>
        </h1>
        <p className="mt-4 text-zinc-400">
          Discover the most popular films currently streaming around the world.
        </p>
      </header>

      <MovieGrid movies={data.results} />

    </main>
  );
}
