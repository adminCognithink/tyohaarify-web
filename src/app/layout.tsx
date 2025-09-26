import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://tyohaarify.com' : 'http://localhost:3000'),
  title: 'Tyohaarify - Festival Greeting Cards',
  description: 'Create beautiful, personalized greeting cards for all your favorite festivals with AI-powered messages and stunning templates.',
  keywords: 'festival, greeting cards, tyohaar, celebration, cards, templates, AI, personalized, diwali, christmas, eid, holi',
  authors: [{ name: 'Tyohaarify Team' }],
  creator: 'Tyohaarify',
  publisher: 'Tyohaarify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/images/logos/ios/apple-icon-180.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Tyohaarify - Festival Greeting Cards',
    description: 'Create beautiful, personalized greeting cards for all your favorite festivals with AI-powered messages and stunning templates.',
    url: 'https://tyohaarify.com',
    siteName: 'Tyohaarify',
    images: [
      {
        url: '/images/logos/android/android-launchericon-512-512.png',
        width: 512,
        height: 512,
        alt: 'Tyohaarify Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tyohaarify - Festival Greeting Cards',
    description: 'Create beautiful, personalized greeting cards for all your favorite festivals with AI-powered messages and stunning templates.',
    images: ['/images/logos/android/android-launchericon-512-512.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tyohaarify',
    startupImage: [
      {
        url: '/images/logos/ios/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/images/logos/ios/apple-splash-1668-2224.png',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/images/logos/ios/apple-splash-1536-2048.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  applicationName: 'Tyohaarify',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  category: 'entertainment',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/sw.js" as="script" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tyohaarify" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}