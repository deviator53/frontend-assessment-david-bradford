"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/tmdb";

export default function HeroSlider({ movies }: { movies: Movie[] }) {
  const [current, setCurrent] = useState(0);
  const featured = movies.slice(0, 5); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === featured.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <div className="relative mb-12 h-[70vh] w-full overflow-hidden rounded-2xl bg-zinc-900">
      {featured.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority={index === 0} 
            className="object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <div className="max-w-2xl space-y-4">
              <span className="text-sm font-bold uppercase tracking-widest text-red-600">
                Trending Now
              </span>
              <h2 className="text-5xl font-black md:text-7xl">{movie.title}</h2>
              <p className="line-clamp-3 text-lg text-zinc-300 md:text-xl">
                {movie.overview}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Link
                  href={`/items/${movie.id}`}
                  className="rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  READ MORE
                </Link>
                <div className="flex gap-2">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        i === current ? "w-8 bg-red-600" : "bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
