export default function MovieSkeleton() {
  return (
    <div className="flex flex-col rounded-md bg-zinc-900/50 p-0 animate-pulse">
      <div className="aspect-[2/3] w-full rounded-t-md bg-zinc-800" />

      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-zinc-800" />
        <div className="flex gap-3">
          <div className="h-3 w-1/4 rounded bg-zinc-800" />
          <div className="h-3 w-1/4 rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
