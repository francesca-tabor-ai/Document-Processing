import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="mb-2 text-2xl font-bold text-primary">Page not found</h1>
      <p className="mb-6 text-grey-600">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="btn-primary rounded-md px-4 py-2 text-sm font-medium">
        Go home
      </Link>
    </div>
  );
}
