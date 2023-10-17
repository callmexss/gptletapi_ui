import NavBar from '../components/NavBar';
import { Inter } from 'next/font/google'
import { exo2, orbitron } from './fonts';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'GPTLet',
    template: '%s | GPTLet',
  },
  description: 'GPTlet lets your work/study/life[s] easier!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className='flex flex-col m-2 px-1 py-2 min-h-screen md:px-2 lg:px-4'>
        <header>
          <NavBar />
        </header>
        <main className={`grow py-3 ${inter.className}`}>
          {children}
        </main>
        <footer className="border-t py-3 text-center text-slate-500 text-xs">
          GPTLet from ChatGPT API by{' '}
          <a href="https://openai.com/" target="_blank"
            className="text-orange-800 hover:underline">
              OpenAI
          </a>
        </footer>
      </body>
    </html>
  )
}
