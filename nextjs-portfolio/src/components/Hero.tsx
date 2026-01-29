'use client'

import Link from 'next/link'
import GitHubContributions from './GitHubContributions'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen w-full flex flex-col items-center justify-center py-20">
      <div className="flex flex-col max-w-[1400px] w-full px-16 gap-8 max-lg:px-8 max-md:px-4">
        {/* Top Section - Title */}
        <div className="w-full">
          
          <h1 className="text-[5rem] font-black leading-[1.05] tracking-[-3px] mb-4 uppercase max-lg:text-[3.5rem] max-md:text-[2.5rem] max-md:tracking-[-1px]">
            FULL STACK ENGINEER
            <span className="block">KEVISH SEWLIYA</span>
          </h1>
          
          <p className="text-sm font-medium tracking-wider">
            &lt;React.js Next.js Redux.js Node.js TypeScript&gt;
          </p>
        </div>
        
        {/* Bottom Section - Description & GitHub */}
        <div className="flex items-start justify-between gap-16 w-full max-lg:flex-col max-lg:gap-8">
          <div className="flex-shrink-0 max-w-[400px] max-lg:max-w-full">
            <p className="text-[0.95rem] text-gray-600 max-w-[380px] leading-relaxed mb-8">
              A full stack engineer with experience in both team projects and individual work. I focus on building scalable, efficient solutions.
            </p>
            
            <Link 
              href="/Resume-Kevish-Sewliya-2028.pdf" 
              download="Resume-Kevish-Sewliya-2028"
              className="inline-block bg-[#c5f467] text-black py-4 px-8 rounded-full font-semibold no-underline transition-all duration-300 hover:bg-[#b5e457] hover:-translate-y-0.5"
            >
              Download CV
            </Link>
          </div>
          
          <div className="flex-1 flex justify-end items-start max-lg:justify-start max-lg:w-full">
            <GitHubContributions />
          </div>
        </div>
      </div>
    </section>
  )
}
