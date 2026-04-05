export default function Loading() {
  return (
    <div className="min-h-screen bg-black animate-pulse">
      <div className="h-[50vh] w-full bg-zinc-900" />

      <div className="container mx-auto -mt-32 px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="h-96 w-64 rounded-lg bg-zinc-800" />

          <div className="flex flex-1 flex-col justify-end space-y-4">
            <div className="h-12 w-3/4 rounded bg-zinc-800" />
            <div className="h-6 w-1/4 rounded bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-2/3 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
