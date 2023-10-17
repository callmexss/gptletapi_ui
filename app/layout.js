import NavBar from '../components/NavBar';
import { Inter } from 'next/font/google'
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
    <html lang="en">
      <body className='bg-orange-50 flex flex-col px-4 py-2 min-h-screen'>
        <header>
          <NavBar />
        </header>
        {/* <main className="flex min-h-screen flex-col p-24"> */}
        <main className="grow py-3">
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
