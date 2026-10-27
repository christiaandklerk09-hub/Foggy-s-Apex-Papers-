import type {Metadata, Viewport} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { OfflineIndicator } from '@/components/OfflineIndicator';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0709' },
  ],
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Apex Papers',
  description: 'Grade 12 full curriculum and past paper practice engine',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Apex Papers',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Apex Papers',
    description: 'Grade 12 full curriculum and past paper practice engine',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Papers',
    description: 'Grade 12 full curriculum and past paper practice engine',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body suppressHydrationWarning className={`${plusJakartaSans.className} ${plusJakartaSans.variable} bg-[#fff5f5] text-slate-800 dark:bg-[#0f0709] dark:text-rose-50 min-h-screen selection:bg-rose-500/30 dark:selection:bg-rose-500/40 font-sans antialiased w-full max-w-[100vw] overflow-x-hidden relative`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('cpr_app_theme') || localStorage.getItem('sho_app_theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}

              // 1. Purge all browser cache storage keys immediately
              try {
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var i = 0; i < names.length; i++) {
                      caches.delete(names[i]);
                    }
                  });
                }
              } catch (e) {}

              // 2. Unregister all service workers to prevent serving obsolete cached bundles
              try {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (var i = 0; i < registrations.length; i++) {
                      registrations[i].unregister().catch(function() {});
                    }
                  });
                }
              } catch (e) {}

              // 3. Catch ChunkLoadError or failed script downloads and reload with fresh cache
              try {
                window.addEventListener('error', function(event) {
                  var msg = (event && event.message) ? event.message : '';
                  if (msg.indexOf('ChunkLoadError') !== -1 || msg.indexOf('Loading chunk') !== -1 || msg.indexOf('Failed to fetch dynamically imported module') !== -1) {
                    if (!sessionStorage.getItem('apex_chunk_recover_attempted')) {
                      sessionStorage.setItem('apex_chunk_recover_attempted', '1');
                      window.location.reload();
                    }
                  }
                });
              } catch (e) {}
            `,
          }}
        />
        {children}
        {/* <OfflineIndicator /> */}
      </body>
    </html>
  );
}
