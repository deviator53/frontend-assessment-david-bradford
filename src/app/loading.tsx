
import MovieSkeleton from "@/components/MovieSkeleton";


export default function Loading() {
  const skeletonArray = Array.from({ length: 20 });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 space-y-4">
        <div className="h-10 w-48 rounded-md bg-zinc-800 animate-pulse sm:h-12" />
        <div className="h-4 w-96 rounded-md bg-zinc-800 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skeletonArray.map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
