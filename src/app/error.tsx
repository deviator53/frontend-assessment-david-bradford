"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-6 text-center">
      <h2 className="text-3xl font-bold text-white">Something went wrong!</h2>
      <p className="text-zinc-400 max-w-md">
        We couldn't load the movies. This might be a network issue.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-md bg-red-600 px-6 py-2 font-semibold text-white hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
