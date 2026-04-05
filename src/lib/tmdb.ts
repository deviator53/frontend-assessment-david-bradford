import { Movie, TMDBResponse } from "@/types/tmdb";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TOKEN = process.env.TMDB_READ_ACCESS_TOKEN; 

async function fetchTMDB<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!TOKEN || !BASE_URL) {
    throw new Error("TMDB credentials missing.");
  }

  const url = `${BASE_URL}${endpoint}`;
  console.log("Full Request URL:", url);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`, 
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTrendingMovies(
  page = 1,
  query?: string,
  year?: string
): Promise<TMDBResponse<Movie>> {
  if (query) {
    return fetchTMDB<TMDBResponse<Movie>>(
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}${year ? `&primary_release_year=${year}` : ""}`,
      { cache: "no-store" },
    );
  }

  if (year) {
    return fetchTMDB<TMDBResponse<Movie>>(
      `/discover/movie?sort_by=popularity.desc&page=${page}&primary_release_year=${year}`,
      { next: { revalidate: 3600 } },
    );
  }

  return fetchTMDB<TMDBResponse<Movie>>(`/trending/movie/day?page=${page}`, {
    next: { revalidate: 3600 },
  });
}

export async function getMovieDetails(id: string): Promise<Movie> {
  return fetchTMDB<Movie>(`/movie/${id}`, {
    cache: "force-cache",
  });
}

