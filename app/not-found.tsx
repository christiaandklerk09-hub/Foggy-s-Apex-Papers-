import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/40 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100 max-w-md text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Page Not Found</h2>
        <p className="text-sm text-neutral-600 mb-6">The requested page or quiz paper could not be found.</p>
        <Link 
          href="/" 
          className="inline-block px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors"
        >
          Return to Portal
        </Link>
      </div>
    </div>
  );
}
