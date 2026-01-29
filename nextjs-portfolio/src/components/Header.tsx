'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full h-fit flex justify-center items-center">
      <div className="w-[60%] max-lg:w-[90%] max-md:hidden fixed overflow-hidden top-4 flex justify-between z-[100] items-center gap-8 py-2.5 px-8 max-lg:px-4 backdrop-blur-sm border-2 border-white/60 bg-white/80 rounded-lg">
        <Link href="#home" className="text-sm font-medium text-black no-underline tracking-wider">
          &lt;KEVISH SEWLIYA&gt;
        </Link>

        <nav className="flex gap-8 flex-wrap">
          <Link href="#work" className="relative py-1 px-2 text-black no-underline text-lg transition-colors duration-300 hover:text-blue-500">Projects</Link>
          <Link href="#skills" className="relative py-1 px-2 text-black no-underline text-lg transition-colors duration-300 hover:text-blue-500">Services</Link>
          <a href="https://github.com/kevish-is-building" target="_blank" rel="noopener noreferrer" className="relative py-1 px-2 text-black no-underline text-lg transition-colors duration-300 hover:text-blue-500">GitHub</a>
          <Link href="/Resume-Kevish-Sewliya-2028.pdf" download className="relative py-1 px-2 text-black no-underline text-lg transition-colors duration-300 hover:text-blue-500">My CV</Link>
        </nav>
      </div>
    </header>
  )
}
