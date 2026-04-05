import Image from "next/image";
import { getMovieDetails } from "@/lib/tmdb";
import { Metadata } from "next";
import Breadcrumbs from "@/components/BreadCrumbs";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovieDetails(params.id);
  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;

  return {
    title: `${movie.title} | Content Explorer`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [
        {
          url: imageUrl,
          width: 780,
          height: 1170,
          alt: movie.title,
        },
      ],
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title: movie.title,
      description: movie.overview,
      images: [imageUrl],
    },
  };
}

export default async function MovieDetailPage({ params }: Props) {
  const movie = await getMovieDetails(params.id);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative h-[50vh] w-full">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover opacity-40"
            priority 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="container mx-auto -mt-32 px-4 pb-20 relative z-10">
        <Breadcrumbs movieTitle={movie.title} />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 flex-shrink-0 overflow-hidden rounded-lg shadow-2xl border border-zinc-800">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-end space-y-4">
            <h1 className="text-4xl font-bold md:text-6xl">{movie.title}</h1>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="text-red-500 font-bold">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date.split("-")[0]}</span>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
