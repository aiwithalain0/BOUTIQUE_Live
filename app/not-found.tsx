import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121812] text-white flex flex-col items-center justify-center px-4 text-center">
      <span className="text-[#8ECA3C] text-sm font-bold uppercase tracking-widest mb-2">404 Error</span>
      <h1 className="text-5xl font-serif font-bold mb-4">Page Not Found</h1>
      <p className="text-white/70 max-w-md mb-8">
        The page you are looking for might have been moved or does not exist. Explore our luxury collection instead.
      </p>
      <Link
        href="/collections"
        className="px-8 py-3.5 rounded-full bg-[#8ECA3C] text-[#121812] font-bold text-sm hover:bg-[#76B02B] transition-all shadow-xl"
      >
        Browse Collections
      </Link>
    </div>
  );
}
