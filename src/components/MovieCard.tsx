import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback-poster.png"; 

  return (
    <Link
      href={`/items/${movie.id}`}
      className="group relative flex flex-col overflow-hidden rounded-md bg-zinc-900 transition-all duration-300 hover:ring-2 hover:ring-red-600"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-red-500">
          {movie.title}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-xs font-medium text-zinc-400">
          <span>
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-red-500 text-lg">★</span>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
