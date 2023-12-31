import '@/styles/globals.css';
import LocalFont from '@next/font/local';
import type { AppProps } from 'next/app';
import { Great_Vibes, Inter, Lato } from 'next/font/google';

export const inter = Inter({
   subsets: ['latin'] 
  });

// Downloaded Font
export const great_vibes = Great_Vibes({
  subsets: ['latin'], 
  weight: '400', 
  variable: '--font-great_vibes'
})

export const lobster = LocalFont({
  src:'../font/Lobster-Regular.ttf',
  variable: '--lobster'
})

export const lato = Lato({
    weight: ["100", "300", "400", "700", "900" ],
    subsets: ["latin"]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
