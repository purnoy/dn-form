import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Great_Vibes, Lobster  } from 'next/font/google';

export const inter = Inter({
   subsets: ['latin'] 
  });

export const great_vibes = Great_Vibes({
  subsets: ['latin'], 
  weight: '400', 
  variable: '--font-great_vibes'
})

export const lobster = Lobster({
  subsets: ['latin'], 
  weight: '400', 
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className=''>
      <Component {...pageProps} />
    </main>
  )
}
