import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-9xl font-extrabold text-zinc-800">404</h1>
      <p className="mt-4 text-xl text-zinc-400">
        Oops! That movie doesn't exist.
      </p>
      <Link href="/" className="mt-8 text-red-600 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}
