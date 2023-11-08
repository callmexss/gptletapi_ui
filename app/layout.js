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
        <main className={`container mx-auto grow py-8 ${inter.className}`}>
          <div className='px-4 py-4 lg:py-6'>
            {children}
          </div>
        </main>
        <footer className="border-t py-3 text-center text-slate-500 text-xs">
          GPTLet from {' '}
          <a href="https://openai.com/" target="_blank"
            className="text-orange-800 hover:underline">
              OpenAI
          </a>
          {' '}ChatGPT API by @ershan
        </footer>
      </body>
    </html>
  )
}
