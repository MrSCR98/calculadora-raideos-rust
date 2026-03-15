import { Proveedores } from '@/components/proveedores'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Calculadora de Raideos para Rust',
  description:
    'Calcula los materiales necesarios para fabricar explosivos en Rust o cuántos puedes crear con tus recursos actuales, y obtén los pasos detallados para completar todo el proceso de elaboración.',

  // generator: 'Next.js',
  applicationName: 'Calculadora de Raideos para Rust',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Calculadora',
    'Raideos',
    'Rust',
    'Explosivos',
    'Materiales',
    'Raids',
  ],
  authors: [{ name: 'SCR98', url: 'https://www.youtube.com/@SCR98' }],
  creator: 'SCR98',
  publisher: 'SCR98',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL('https://calculadora-raideos-rust.pages.dev'),

  // alternates: {
  //   canonical: '/',
  //   languages: {
  //     'en-US': '/en-US',
  //     'de-DE': '/de-DE',
  //   },
  // },

  /*   
  alternates: {
    canonical: 'https://nextjs.org',
    languages: {
      'en-US': 'https://nextjs.org/en-US',
      'de-DE': 'https://nextjs.org/de-DE',
    },
    media: {
      'only screen and (max-width: 600px)': 'https://nextjs.org/mobile',
    },
    types: {
      'application/rss+xml': 'https://nextjs.org/rss',
    },
  }, 
  */

  openGraph: {
    title: 'Calculadora de Raideos para Rust',
    description:
      'Calcula los materiales necesarios para fabricar explosivos en Rust o cuántos puedes crear con tus recursos actuales, y obtén los pasos detallados para completar todo el proceso de elaboración.',
    url: 'https://calculadora-raideos-rust.pages.dev',
    siteName: 'Calculadora de Raideos para Rust',
    images: [
      {
        url: 'https://calculadora-raideos-rust.pages.dev/opengraph/og.jpg', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
      // {
      //   url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
      //   width: 1800,
      //   height: 1600,
      //   alt: 'My custom alt',
      // },
    ],
    locale: 'es_ES',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
    // nocache: true,
    googleBot: {
      index: true,
      follow: true,
      // noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // manifest: 'https://nextjs.org/manifest.json',

  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Raideos para Rust',
    description:
      'Calcula los materiales necesarios para fabricar explosivos en Rust o cuántos puedes crear con tus recursos actuales, y obtén los pasos detallados para completar todo el proceso de elaboración.',
    // siteId: '1467726470533754880',
    // creator: '@nextjs',
    // creatorId: '1467726470533754880',
    images: ['https://calculadora-raideos-rust.pages.dev/opengraph/og.jpg'], // Must be an absolute URL
    /* 
    images: {
      url: 'https://nextjs.org/og.png',
      alt: 'Next.js Logo',
    }, 
    */
  },

  // verification: {
  //   google: 'google',
  //   yandex: 'yandex',
  //   yahoo: 'yahoo',
  //   other: {
  //     me: ['my-email', 'my-link'],
  //   },
  // },

  // assets: ['https://nextjs.org/assets'],
  // bookmarks: ['https://nextjs.org/13'],
  category: 'calculadora-raideos-rust',

  icons: {
    icon: [
      // { url: '/favicon_16x16.ico', type: 'image/x-icon', sizes: '16x16' },
      // { url: '/favicon_32x32.ico', type: 'image/x-icon', sizes: '32x32' },
      // { url: '/favicon_48x48.ico', type: 'image/x-icon', sizes: '48x48' },
      // { url: '/favicon_64x64.ico', type: 'image/x-icon', sizes: '64x64' },
      // { url: '/favicon_128x128.ico', type: 'image/x-icon', sizes: '128x128' },
      { url: '/favicon_256x256.ico', type: 'image/x-icon', sizes: '256x256' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#dc7702',
}

// Script que se ejecuta ANTES de React para evitar flash de tema/idioma
// Mismo enfoque que next-themes pero sin libreria externa
const scriptPreHidratacion = `
(function(){
  var d=document.documentElement;
  var cl=d.classList;
  try{
    var tema=localStorage.getItem('rust-calc-tema');
    var idioma=localStorage.getItem('rust-calc-idioma');
    var oscuro=false;
    if(tema==='oscuro'){
      oscuro=true;
    }else if(tema==='claro'){
      oscuro=false;
    }else{
      oscuro=window.matchMedia('(prefers-color-scheme:dark)').matches;
    }
    if(oscuro){
      cl.add('dark');
    }else{
      cl.remove('dark');
    }
    if(idioma&&['es','va','en'].indexOf(idioma)!==-1){
      d.lang=idioma==='va'?'ca':idioma;
    }
  }catch(e){}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptPreHidratacion }} />
      </head>
      <body className="antialiased">
        <Proveedores>{children}</Proveedores>
      </body>
    </html>
  )
}
