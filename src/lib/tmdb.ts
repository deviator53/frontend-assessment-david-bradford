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
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>(`/trending/movie/day?page=${page}`, {
    next: { revalidate: 3600 }, 
  });
}

export async function getMovieDetails(id: string): Promise<Movie> {
  return fetchTMDB<Movie>(`/movie/${id}`, {
    cache: "force-cache",
  });
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      cache: "no-store", 
    },
  );
}